import {
  SubscribeMessage,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server } from 'net';
const faker = require('faker');
let interval: NodeJS.Timeout;

@WebSocketGateway({ cors: true })
export class SocketGateway implements  OnGatewayInit{
  @WebSocketServer()
  server;

  private logger: Logger = new Logger('App2Gateway');

  afterInit(server: Server): void {
    this.logger.log('initialize!');
    clearInterval(interval);

    interval = setInterval(() => {
      server.emit('message', { username: faker.name.findName() });
    }, 1000);
  }

  @SubscribeMessage('end')
  afterClose(server: Server): void {
    server.on('end', function () {
      clearInterval(interval);
    });
  }
}
