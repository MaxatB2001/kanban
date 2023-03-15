import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { TaskService } from "./task.service";
import {Server} from "socket.io"

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class TaskGateway {
  constructor(private readonly taskService: TaskService) {}
  @WebSocketServer()
  server: Server

  @SubscribeMessage("createTask")
  async createTask(@MessageBody() body) {
    const task = await this.taskService.create({name: body.taskName, sectionId: body.sectionId})
    this.server.to(body.projectId).emit("createdTask", task)
  }
}