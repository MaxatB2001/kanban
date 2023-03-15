import { TaskService } from './task.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.taskService.create(dto);
  }
}
