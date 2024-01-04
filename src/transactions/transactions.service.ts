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

          const userAccountSummary = await this.findAccSummaryByUserNChamaaId(transactionDto.user, transactionDto.chamaa);
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
  
  async findAccSummaryByUserNChamaaId(userId: string, chamaaId: string){
    return await this.userAccountSummaryRepository.findOne({
      where: {
        user: {id: userId},
        chamaa: {id: chamaaId}
      }
    });    
  }

  async findAccountSummaryByAccId(id: string){
    const acc = await this.userAccountSummaryRepository.findOne({
      where: {id},
      relations:{user: true, chamaa:true}
    })
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

  create(createTransactionDto: CreateTransactionDto) {
    return 'This action adds a new transaction';
  }

  findAll() {
    return `This action returns all transactions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
