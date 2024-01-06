import { Chamaa } from "src/chamaa/entities/chamaa.entity";
import { User } from "src/users/entities/user.entity";

export interface InitializeAccountSummaryInterface{
    user: User;
    chamaa: Chamaa;
    currentBalance: number;
}