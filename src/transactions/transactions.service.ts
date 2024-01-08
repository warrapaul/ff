import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import {  TransactionDto } from './dto/transactions-deposit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { TransactionTbl } from './entities/transaction.entity';
import { UsersService } from 'src/users/users.service';
import { ChamaaService } from 'src/chamaa/chamaa.service';
import { TransactionTypeEnum } from './enums/transactions.enums';
import { UserAccountSummary } from './entities/user-account-summary.entity';
import { CheckAccSummaryDto } from './dto/check-acc-summary.dto';
import { InitializeAccountSummaryInterface } from './interfaces/initialize-account-summary.interface';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AccountSummaryInterface } from './interfaces/account-summary.interface';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionTbl)
    private readonly transactionRepository: Repository<TransactionTbl>,
    @InjectRepository(UserAccountSummary)
    private readonly userAccountSummaryRepository: Repository<UserAccountSummary>,
    private readonly usersService:UsersService,
    private readonly chamaaService:ChamaaService,
    private dataSource: DataSource,
    private eventEmitter: EventEmitter2
  ){}
  
  async deposit(transactionDto: TransactionDto, userId: string){
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
          const chamaa = await this.chamaaService.findChamaaById(transactionDto.chamaa);
          const user = await this.usersService.findUserById(transactionDto.user)
          
          await queryRunner.manager.save(TransactionTbl,{
            ...transactionDto,
            user,
            chamaa,
            transactionType: TransactionTypeEnum.DEPOSIT,
          })


          const userAccountSummary = await this.findAccSummaryByUserNChamaaId({user:transactionDto.user, chamaa:transactionDto.chamaa});
          let updatedAccountSummary: UserAccountSummary;
          if (userAccountSummary) {
            const amnt = userAccountSummary.currentBalance + transactionDto.amount;
            userAccountSummary.currentBalance = amnt;

            updatedAccountSummary= await queryRunner.manager.save(UserAccountSummary,userAccountSummary )
          }else {
            updatedAccountSummary = await queryRunner.manager.save(UserAccountSummary,{
              user,
              chamaa,
              currentBalance: transactionDto.amount
            })            
          }


          await queryRunner.commitTransaction();
          const currentAccSummary = await this.findAccountSummaryByAccId(updatedAccountSummary.id)
         
          //emit deposit transaction event
          this.eventEmitter.emit('transaction.created.deposit', {transaction: transactionDto, currentAccSummary});
        
          return currentAccSummary
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(`Error occurred during deposit: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR)
    } finally{
      await queryRunner.release();
    }
    
  } 

  // async deposit(transactionDto: TransactionDto, userId: string){
  //   try{
  //         const chamaa = await this.chamaaService.findChamaaById(transactionDto.chamaa);
  //         const user = await this.usersService.findUserById(transactionDto.user)

  //         const depositTrans =  this.transactionRepository.create({
  //           ...transactionDto,
  //           user,
  //           chamaa,
  //           transactionType: TransactionTypeEnum.DEPOSIT,
  //         });
  //         const deposit = await this.transactionRepository.save(depositTrans);


          
  //         const userAccountSummary = await this.findAccSummaryByUserNChamaaId({user:transactionDto.user, chamaa:transactionDto.chamaa});
         
  //         let updatedAccountSummary: UserAccountSummary;
  //         if (userAccountSummary) {
  //           const amnt = userAccountSummary.currentBalance + transactionDto.amount;
  //           updatedAccountSummary= await this.updateAccountSummary(userAccountSummary.id, amnt);
  //         }else {
  //           updatedAccountSummary = await this.initializeAccountSummary({
  //             user,
  //             chamaa,
  //             currentBalance: transactionDto.amount
  //           });
  //         }


  //         const currentAccSummary = await this.findAccountSummaryByAccId(updatedAccountSummary.id)


  //         //emit deposit transaction event
  //         this.eventEmitter.emit('transaction.created.deposit', {transaction: transactionDto, currentAccSummary});



  //         return currentAccSummary

  //   }catch(error){
  //     throw new HttpException(`Error occurred during deposit: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR)
  //   }
  // }

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
      const currentAccSummary = await this.findAccountSummaryByAccId(updatedAcc.id)
      
      //emit deposit transaction event
      this.eventEmitter.emit('transaction.created.deposit', {transaction: transactionDto, currentAccSummary});

      return currentAccSummary
    }catch(error){
      throw new HttpException(`Error occurred during withdrawal: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR)
    }
    
  }


  // async checkAccountSummary(checkAccSummaryDto: CheckAccSummaryDto, id: string){  
   
  //   const acc =  await this.findAccSummaryByUserNChamaaId(checkAccSummaryDto)    
  //   if(!acc){
  //     throw new HttpException('Account Not found', HttpStatus.BAD_REQUEST)
  //   }
  //   return acc;
  // }


  async checkAccountSummary(checkAccSummaryDto: CheckAccSummaryDto, id: string){  
    const userId = checkAccSummaryDto.user;
    const chamaaId = checkAccSummaryDto.chamaa;

    const acc =  await this. userAccountSummaryRepository
      .createQueryBuilder('accSummary')
      .leftJoinAndSelect('accSummary.user','user')
      .leftJoinAndSelect('accSummary.chamaa','chamaa')
      .leftJoinAndSelect('chamaa.chamaaProfile','chamaaProfile')
      .select([
        'accSummary.id','accSummary.currentBalance',
        'user.id', 'user.firstName','user.middleName','user.lastName','user.phoneNumber',
        'chamaa.id', 'chamaa.name', 'chamaa.description',
        'chamaaProfile.profilePic'
      ])
      .where('user.id = :userId',{userId})
      .andWhere('chamaa.id = :chamaaId',{chamaaId})
      .getOne();   

      if(!acc){
        return {
          // id:null,
          // currentBalance: acc.currentBalance,
          // userId: userId.id,
          // firstName: acc.user.firstName,
          // middleName: acc.user.middleName,
          // lastName: acc.user.lastName,
          // phoneNumber: acc.user.phoneNumber,
          // chamaaId: acc.chamaa.id, 
          // chamaaName: acc.chamaa.name,
          // chamaaDescription: acc.chamaa.description,
          // chamaaProfile: acc.chamaa.chamaaProfile 
          currentBalance: 0
        }
      }

      return {
        id:acc.id,
        currentBalance: acc.currentBalance,
        userId: acc.user.id,
        firstName: acc.user.firstName,
        middleName: acc.user.middleName,
        lastName: acc.user.lastName,
        phoneNumber: acc.user.phoneNumber,
        chamaaId: acc.chamaa.id, 
        chamaaName: acc.chamaa.name,
        chamaaDescription: acc.chamaa.description,
        chamaaProfile: acc.chamaa.chamaaProfile 
      };
  }


  
  async findAccSummaryByUserNChamaaId(checkAccSummaryDto: CheckAccSummaryDto): Promise<AccountSummaryInterface | undefined>{
    const userId = checkAccSummaryDto.user;
    const chamaaId = checkAccSummaryDto.chamaa;

    const acc =  await this. userAccountSummaryRepository
      .createQueryBuilder('accSummary')
      .leftJoinAndSelect('accSummary.user','user')
      .leftJoinAndSelect('accSummary.chamaa','chamaa')
      .leftJoinAndSelect('chamaa.chamaaProfile','chamaaProfile')
      .select([
        'accSummary.id','accSummary.currentBalance',
        'user.id', 'user.firstName','user.middleName','user.lastName','user.phoneNumber',
        'chamaa.id', 'chamaa.name', 'chamaa.description',
        'chamaaProfile.profilePic'
      ])
      .where('user.id = :userId',{userId})
      .andWhere('chamaa.id = :chamaaId',{chamaaId})
      .getOne();   

      if(!acc){
        //throw new HttpException('Account Not found', HttpStatus.BAD_REQUEST)
        return null
      }

      return {
        id:acc.id,
        currentBalance: acc.currentBalance,
        userId: acc.user.id,
        firstName: acc.user.firstName,
        middleName: acc.user.middleName,
        lastName: acc.user.lastName,
        phoneNumber: acc.user.phoneNumber,
        chamaaId: acc.chamaa.id, 
        chamaaName: acc.chamaa.name,
        chamaaDescription: acc.chamaa.description,
        chamaaProfile: acc.chamaa.chamaaProfile 
      };
  }

  async findAccountSummaryByAccId(id: string): Promise<AccountSummaryInterface | undefined>{
    const acc= await this. userAccountSummaryRepository
    .createQueryBuilder('accSummary')
    .leftJoinAndSelect('accSummary.user','user')
    .leftJoinAndSelect('accSummary.chamaa','chamaa')
    .leftJoinAndSelect('chamaa.chamaaProfile','chamaaProfile')
    .where('accSummary.id = :id',{id})
    .select([
      'accSummary.id','accSummary.currentBalance',
      'user.id', 'user.firstName','user.middleName','user.lastName','user.phoneNumber',
      'chamaa.id', 'chamaa.name', 'chamaa.description',
      'chamaaProfile.profilePic'
    ])
    .getOne();
    
    if(!acc){
      throw new HttpException('Account Not found', HttpStatus.BAD_REQUEST)
    }
    return {
      id:acc.id,
      currentBalance: acc.currentBalance,
      userId: acc.user.id,
      firstName: acc.user.firstName,
      middleName: acc.user.middleName,
      lastName: acc.user.lastName,
      phoneNumber: acc.user.phoneNumber,
      chamaaId: acc.chamaa.id, 
      chamaaName: acc.chamaa.name,
      chamaaDescription: acc.chamaa.description,
      chamaaProfile: acc.chamaa.chamaaProfile 
    };
  }
  
 

  async initializeAccountSummary(accountSummary: InitializeAccountSummaryInterface){

    const newAccountSummary = this.userAccountSummaryRepository.create(accountSummary);
    return await this.userAccountSummaryRepository.save(newAccountSummary);
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
