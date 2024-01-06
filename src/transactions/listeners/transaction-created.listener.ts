import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { CreatedTransactionInterface } from "../interfaces/created-transaction.interface";

@Injectable()
export class TranactionCreatedListener{
    @OnEvent('transaction.created.deposit')
    handleDepositTransactionEvent(event:CreatedTransactionInterface){
        console.log(`deposit transaction ${event}`)
        console.log({event})
    }

    @OnEvent('transaction.created.withdraw')
    handleWithdrawTransactionEvent(event:CreatedTransactionInterface){
        console.log(`withdraw transaction ${event}`);
        console.log({event})

    }
}