import { PrismaService } from './../../database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateSectionDto } from './dto';

@Injectable()
export class SectionService {
  constructor(private prismaService: PrismaService) {}
  clientsInProjects = {};
  async create(dto: CreateSectionDto) {
    const section = await this.prismaService.section.create({
      data: {
        ...dto,
      },
      include: {
        tasks: true
      }
    });
    return section;
  }

  async updateSection(sections) {
    await this.prismaService.$transaction(async (tx) => {
      for (let section of sections) {
        for (let task of section.tasks) {
          await tx.task.update({
            where: {
              id: task.id,
            },
            data: {
              sectionId: section.id,
            },
          });
        }
      }
    });
  }
}
