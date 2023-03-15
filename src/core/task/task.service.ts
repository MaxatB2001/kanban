import { PrismaService } from './../../database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto';

@Injectable()
export class TaskService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateTaskDto) {
    const task = await this.prismaService.task.create({
      data: {
        ...dto
      }
    })
    return task;
  }
}
