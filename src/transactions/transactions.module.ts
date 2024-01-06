import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { UsersModule } from 'src/users/users.module';
import { ChamaaModule } from 'src/chamaa/chamaa.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionTbl } from './entities/transaction.entity';
import { UserAccountSummary } from './entities/user-account-summary.entity';
import { TranactionCreatedListener } from './listeners/transaction-created.listener';

@Module({
  imports:[
    TypeOrmModule.forFeature([TransactionTbl,UserAccountSummary]),
    UsersModule,
    ChamaaModule
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService,TranactionCreatedListener],
})
export class TransactionsModule {}
