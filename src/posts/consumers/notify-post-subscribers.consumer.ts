import { OnQueueCompleted, OnQueueFailed, Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Logger } from "@nestjs/common";
import { NOTIFY_SUBSCRIBED_CUSTOMERS } from "src/common/constants/posts.constants";
import { log } from "console";


@Processor(NOTIFY_SUBSCRIBED_CUSTOMERS)
export class NotifyPostSubscribersConsumer{ //register in module as a provider
    private readonly logger = new Logger(NotifyPostSubscribersConsumer.name)
    constructor(
        // private readonly smsStoreService:SmsStoreService        
      ){}


    @Process('persist-otp-queue')
    async notifySubscribers(job:Job<unknown>){
        try {
            // await this.smsStoreService.persistOTPtoDb(job.data as SmsCodeDto);
            this.logger.verbose(JSON.stringify(job));
            // throw new Error('Some error occurred during processing');

            //reset subscription history

          } catch (error) {
            this.logger.error(error.message);
            //optionally retry
            // throw error; //re-thrwo the error for test
          }
        }

    @OnQueueCompleted()
    async handleCompletedJob(job: Job, result:any){
      this.logger.verbose({'completed job ': JSON.stringify(job)})
        await job.remove()
    }

    @OnQueueFailed()
    async handleFailedJob(job:Job, err:Error){
        this.logger.error({'failed job ': JSON.stringify(job)})
        // save to db for later retry
    }
    
    
 }
      
      
      
      
      
      
   