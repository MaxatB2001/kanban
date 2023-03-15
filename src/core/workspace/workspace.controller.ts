import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { Workspace } from '@prisma/client';
import { GetCurrentUserId, Public } from 'src/common/decorators';
import { CreateWorkspaceDto } from './dto';
import { WorkspaceService } from './workspace.service';

@Controller('workspace')
export class WorkspaceController {
  constructor(private workspaceService: WorkspaceService) {}

  @Get('/userWorkspaces')
  getUserWorkspaces(@GetCurrentUserId() userId: string) {
    console.log(userId);
    return this.workspaceService.getUserWorkspaces(userId);
  }

  @Public()
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.workspaceService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateWorkspaceDto, @GetCurrentUserId() userId: string,): Promise<Workspace> {
    return this.workspaceService.create(dto, userId);
  }
}
