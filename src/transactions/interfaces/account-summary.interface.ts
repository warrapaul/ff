export interface AccountSummaryInterface{
    id: string;
    currentBalance: number;
    userId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    phoneNumber: string;   
    chamaaId: string;
    chamaaName: string;
    chamaaDescription:string;
    chamaaProfile: ChamaaProfileInterface;
}

export interface ChamaaProfileInterface {
    profilePic?: string; 
  }
