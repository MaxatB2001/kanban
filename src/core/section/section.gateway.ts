import { CreateSectionDto } from './dto/createSection.dto';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { WebSocketServer } from '@nestjs/websockets/decorators';
import { Server, Socket } from 'socket.io';
import { SectionService } from './section.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SectionGateway {
  constructor(private readonly sectionService: SectionService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('update')
  async updateSection(@MessageBody() body) {
    this.sectionService.updateSection(body.sections);
    this.server.to(body.projectId).emit('sectionUpdate', body);
  }

  @SubscribeMessage('createSection')
  async createSection(@MessageBody() body: CreateSectionDto) {
    const section = await this.sectionService.create(body)
    this.server.to(body.projectId).emit('sectionCreated', section)
  }

  @SubscribeMessage('join')
  join(@MessageBody('projectId') projectId, @ConnectedSocket() client: Socket) {
    client.join(projectId)
    return projectId
  }
}
