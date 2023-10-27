import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { EventsGateway } from './events/events.gateway';

@Injectable()
export class MessagesService {
  constructor(
    private readonly eventsGateway: EventsGateway
  ){

  }
  create(createMessageDto: CreateMessageDto) {
    const message ={
      name: 'pauls',
      message: 'somt txt'
    }
    this.eventsGateway.sendBroadcastMessage(message)
    return 'message sent';
  }

  findAll() {
    return `This action returns all messages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
