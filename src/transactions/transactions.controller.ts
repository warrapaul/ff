import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import {  TransactionDto } from './dto/transactions-deposit.dto';
import { CheckAccSummaryDto } from './dto/check-acc-summary.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('deposit')
  deposit(@Body() transactionDto: TransactionDto, @Req() req){
    return this.transactionsService.deposit(transactionDto, req.user.id)
  }

  @Post('withdraw')
  withdraw(@Body() transactionDto: TransactionDto, @Req() req){
    return this.transactionsService.withdraw(transactionDto, req.user.id)
  }

  @Post('check-balance')
  checkBalance(@Body() checkAccSummaryDto: CheckAccSummaryDto, @Req() req){
    return this.transactionsService.checkAccountSummary(checkAccSummaryDto, req.user.id)
  }



}
