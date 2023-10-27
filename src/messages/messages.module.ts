import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { EventsGateway } from './events/events.gateway';
import { WsAuthMiddleware } from 'src/common/middlewares/ws-auth.middleware';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService,WsAuthMiddleware, EventsGateway],
})
export class MessagesModule {}
