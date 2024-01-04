import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { TransactionMethodEnum, TransactionTypeEnum } from "../enums/transactions.enums";

export class TransactionDto{
    @IsString()
    @IsUUID()
    user: string;

    @IsNumber()
    amount: number;

    @IsString()
    @IsUUID()
    chamaa: string;

    @IsString()
    transactionReference: string;

    @IsString()
    @IsOptional()
    note: string;

    @IsString()
    @IsEnum(TransactionMethodEnum)
    transactionMethod: TransactionMethodEnum;

    @IsString()
    @IsEnum(TransactionTypeEnum)
    transactionType: TransactionTypeEnum;

}