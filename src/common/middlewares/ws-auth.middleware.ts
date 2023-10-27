import { Injectable, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { verify } from 'jsonwebtoken'; 

@Injectable()
export class WsAuthMiddleware {
  async use(socket: Socket, next: Function) {
    const { authorization } = socket.handshake.headers;

    if (!authorization) {
      Logger.error('Unauthorized. Please provide a valid token.');
      socket.disconnect();
    } else {
      try {
        // Implement your token verification logic here (e.g., JWT verification)
        const decodedToken = verify(authorization, process.env.JWT_TOKEN_KEY); // Verify the token with your secret key

        if (decodedToken) {
          socket['user'] = decodedToken; // Set the 'user' property on the socket
          next();
        } else {
          Logger.error('Unauthorized. Invalid token.');
          socket.disconnect();
        }
      } catch (error) {
        Logger.error('Unauthorized. Token verification error.');
        socket.disconnect();
      }
    }
  }
}



// socket.close(4004, "Unauthorized Request");

// import { Socket } from "socket.io"
// import { WsJwtGuard } from "../guards/ws-jwt.guard"

// type SocketIOMiddleware ={
//     (client: Socket, next: (err?: Error)=> void)
// }

// export const WsAuthMiddleware =():  SocketIOMiddleware => {
//     return (client, next)=>{
//         try{
//             WsJwtGuard.validateToken(client);
//             next();
//         }catch (error){
//             next(error)
//         }
//     }
// }