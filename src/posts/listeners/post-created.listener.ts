import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { Post } from "../entities/post.entity";

@Injectable()
export class PostCreatedListener{
    @OnEvent('post.created')
    handlePostCreatedEvent(event:Post){
        console.log('new post')
        console.log({event})
    }
}