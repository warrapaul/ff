import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import {Server} from 'socket.io'
import { ServetToClientEvents } from '../types/event.types';
import { BroadcastEventMessage } from '../dto/event-messages.dto';
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from 'src/common/guards/ws-jwt.guard';
import { Socket } from 'dgram';
import { WsAuthMiddleware } from 'src/common/middlewares/ws-auth.middleware';

@WebSocketGateway({namespace: 'events'}) //connect using localhost:port/events
@UseGuards(WsJwtGuard)
@UseGuards(WsAuthMiddleware)

export class EventsGateway {
  @WebSocketServer()
  server: Server<any, ServetToClientEvents>;

  // afterInit(client: Socket){ //secure connection, the gurad will secure sending
  //   client.use()
  // }

  @SubscribeMessage('message') //client sends message with event name 'message'
  handleMessage(client: Socket, payload: any): string {
    // console.log({client})
    // Access the 'user' property set in the WebSocket client
    const user = client['user'];
    
    // Now you can use the 'user' data to save the message or perform other actions
    console.log('Received message from user:', user);

    // Save the message or handle it as needed
    // ...

    return 'Hello world!';
  }

  sendBroadcastMessage(message: BroadcastEventMessage){ //send message to all clients lisetning to 'newBroadcastEvent'
    this.server.emit('newBroadcastMessage',message)
  }

}
