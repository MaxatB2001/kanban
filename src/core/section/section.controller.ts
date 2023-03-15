import { Body, Controller, Post } from '@nestjs/common';
import { CreateSectionDto } from './dto';
import { SectionService } from './section.service';

@Controller('section')
export class SectionController {
  constructor(private sectionService: SectionService) {}

  @Post()
  create(@Body() dto: CreateSectionDto) {
    return this.sectionService.create(dto);
  }
}
