import { Param } from '@nestjs/common/decorators';
import { ProjectService } from './project.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProjectDto } from './dto';

@Controller('project')
export class ProjectController {
  
  constructor(private projectService: ProjectService) {}

  @Post()
  create(@Body() dto: CreateProjectDto) {
    return this.projectService.create(dto);
  }

  @Get(":id")
  getById(@Param("id") id: string) {
    return this.projectService.getById(id);
  }
}
