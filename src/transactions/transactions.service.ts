import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import {  TransactionDto } from './dto/transactions-deposit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionTbl } from './entities/transaction.entity';
import { UsersService } from 'src/users/users.service';
import { ChamaaService } from 'src/chamaa/chamaa.service';
import { TransactionTypeEnum } from './enums/transactions.enums';
import { UserAccountSummary } from './entities/user-account-summary.entity';
import { CheckAccSummaryDto } from './dto/check-acc-summary.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionTbl)
    private readonly transactionRepository: Repository<TransactionTbl>,
    @InjectRepository(UserAccountSummary)
    private readonly userAccountSummaryRepository: Repository<UserAccountSummary>,
    private readonly usersService:UsersService,
    private readonly chamaaService:ChamaaService

  ){}
  
  async deposit(transactionDto: TransactionDto, userId: string){
    try{
          const chamaa = await this.chamaaService.findChamaaById(transactionDto.chamaa);
          const user = await this.usersService.findUserById(transactionDto.user)
          const depositTrans =  this.transactionRepository.create({
            ...transactionDto,
            user,
            chamaa,
            transactionType: TransactionTypeEnum.DEPOSIT,
          });
          const deposit = await this.transactionRepository.save(depositTrans);

          const userAccountSummary = await this.findAccSummaryByUserNChamaaId({user:transactionDto.user, chamaa:transactionDto.chamaa});
          if (userAccountSummary) {
            const amnt = userAccountSummary.currentBalance + transactionDto.amount;
            const updatedAcc = await this.updateAccountSummary(userAccountSummary.id, amnt);
            return await this.findAccountSummaryByAccId(updatedAcc.id)
          }else {
            const newAccountSummary = this.userAccountSummaryRepository.create({
              user,
              chamaa,
              currentBalance: transactionDto.amount,
            });
            return await this.userAccountSummaryRepository.save(newAccountSummary);
          }
    }catch(error){
      throw new HttpException(`Error occurred during deposit: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async withdraw(transactionDto: TransactionDto, userId: string){
   try{
      const chamaa = await this.chamaaService.findChamaaById(transactionDto.chamaa);
      const user = await this.usersService.findUserById(transactionDto.user);
      const userAccountSummary = await this.findAccSummaryByUserNChamaaId({user:transactionDto.user, chamaa:transactionDto.chamaa});
      if(!userAccountSummary){
        throw new HttpException('Account Balance not found', HttpStatus.BAD_REQUEST)
      }

      if(userAccountSummary.currentBalance < transactionDto.amount){
        throw new HttpException('Insufficient Balance ', HttpStatus.BAD_REQUEST)
      }

      const withdrawTrans =  this.transactionRepository.create({
        ...transactionDto,
        user,
        chamaa,
        transactionType: TransactionTypeEnum.WITHDRAWAL,
      });
      const withdraw = await this.transactionRepository.save(withdrawTrans);
      
      const amnt = userAccountSummary.currentBalance - transactionDto.amount;
      const updatedAcc = await this.updateAccountSummary(userAccountSummary.id, amnt);
      return await this.findAccountSummaryByAccId(updatedAcc.id)
    }catch(error){
      throw new HttpException(`Error occurred during withdrawal: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
    
  }


  async checkAccountSummary(checkAccSummaryDto: CheckAccSummaryDto, id: string){  
   
    const acc =  await this.findAccSummaryByUserNChamaaId(checkAccSummaryDto)    
    if(!acc){
      throw new HttpException('Account Not found', HttpStatus.BAD_REQUEST)
    }
    return acc;
  }



  
  async findAccSummaryByUserNChamaaId(checkAccSummaryDto: CheckAccSummaryDto){
    const userId = checkAccSummaryDto.user;
    const chamaaId = checkAccSummaryDto.chamaa;

    return await this. userAccountSummaryRepository
      .createQueryBuilder('accSummary')
      .leftJoinAndSelect('accSummary.user','user')
      .leftJoinAndSelect('accSummary.chamaa','chamaa')
      .select([
        'accSummary.currentBalance',
        'user.id', 'user.firstName','user.middleName','user.lastName','user.phoneNumber',
        'chamaa.id', 'chamaa.name', 'chamaa.description'
      ])
      .where('user.id = :userId',{userId})
      .andWhere('chamaa.id = :chamaaId',{chamaaId})
      .getOne();    
  }

  async findAccountSummaryByAccId(id: string){
    const acc= await this. userAccountSummaryRepository
    .createQueryBuilder('accSummary')
    .leftJoinAndSelect('accSummary.user','user')
    .leftJoinAndSelect('accSummary.chamaa','chamaa')
    .where('accSummary.id = :id',{id})
    .select([
      'accSummary.currentBalance',
      'user.id', 'user.firstName','user.middleName','user.lastName','user.phoneNumber',
      'chamaa.id', 'chamaa.name', 'chamaa.description'
    ])
    .getOne();
    
    if(!acc){
      throw new HttpException('Account Not found', HttpStatus.BAD_REQUEST)
    }
    return acc;
  }
  
  async updateAccountSummary(id: string, amount: number){
    const acc = await this.userAccountSummaryRepository.findOneBy({id});
    if(!acc){
      throw new HttpException('Account Not found', HttpStatus.BAD_REQUEST)
    }
    acc.currentBalance = amount;
    return await this.userAccountSummaryRepository.save(acc)
  }

 
}
