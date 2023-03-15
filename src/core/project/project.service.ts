import { PrismaService } from './../../database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto';

@Injectable()
export class ProjectService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateProjectDto) {
    const project = await this.prismaService.project.create({
      data: {
        ...dto,
      },
    });
    return project;
  }

  async getById(id: string) {
    const project = await this.prismaService.project.findUnique({
      where: {
        id
      },
      include: {
        sections: {
          include: {
            tasks: true
          }
        },
        Workspace: true
      }
    })
    return project
  }
}
