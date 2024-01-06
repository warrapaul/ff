import { TransactionDto } from "../dto/transactions-deposit.dto";
import { AccountSummaryInterface } from "./account-summary.interface";

export class CreatedTransactionInterface{
    transaction: TransactionDto;
    currentAccSummary: AccountSummaryInterface;
}