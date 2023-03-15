import { PrismaService } from './../../database/prisma.service';
import { Injectable } from "@nestjs/common";
import { CreateWorkspaceDto } from "./dto";
import { Workspace } from '@prisma/client';

@Injectable()
export class WorkspaceService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateWorkspaceDto, userId: string): Promise<Workspace> {
    const workspace = await this.prismaService.workspace.create({
      data: {
        name: dto.name,
        members: {
          create: [
            {
              user: {
                connect: {
                  id: userId
                }
              }
            }
          ]
        }
      }
    })
    return workspace;
  }

  async getUserWorkspaces(userId: string): Promise<Workspace[]> {
    const workspaces = await this.prismaService.workspace.findMany({
      where: {
        members: {
          some: {
            user: {
              id: userId
            }
          }
        }
      }
    })
    return workspaces;
  }

  async getById(id: string): Promise<Workspace> {
    const workspace = await this.prismaService.workspace.findUnique({
      where: {
        id 
      },
      include: {
        projects: true,
        members: true,
      }
    })
    return workspace;
  }
}