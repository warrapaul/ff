import { OnQueueCompleted, Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { NOTIFY_SUBSCRIBED_CUSTOMERS } from "src/common/constants/posts.constants";
import { UsersService } from "src/users/users.service";

@Processor(NOTIFY_SUBSCRIBED_CUSTOMERS)
export class NotifyPostSubscribers{
    constructor(
        //inject services e.g usersService
        private readonly usersService:UsersService
    ){}

    @Process('notify-posts-subscribers')
    async notifySubscribers(job:Job<unknown>){
        console.log('in the queued')
        console.log({job})
    }

    @OnQueueCompleted()
    async handleCompletedJob(job: Job, result:any){
        await job.remove()
    }
}