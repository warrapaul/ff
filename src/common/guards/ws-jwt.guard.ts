import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';
import { verify } from 'jsonwebtoken'; 
@Injectable()
export class WsJwtGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    return false;

    if(context.getType() !== 'ws'){
      return true;
    }

    const client: Socket =context.switchToWs().getClient();
    const {authorization} = client.handshake.headers;  ///for web sockets use client.handshake.auth
    
    if (!authorization) {
      throw new Error('Missing authorization header');
    }

    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer') {
      throw new Error('Invalid authorization header format');
    }

    try {
      const decoded = verify(token, process.env.JWT_TOKEN_KEY); // Verify the token with your secret key
      client['user'] = decoded; // Attach the user object to the WebSocket client
      return true;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  static validateToken(client){
    const {authorization} = client.handshake.headers;
  
  }
}

