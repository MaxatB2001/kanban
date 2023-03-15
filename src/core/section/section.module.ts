import { SectionGateway } from './section.gateway';
import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';

@Module({
  providers: [SectionService, SectionGateway],
  controllers: [SectionController]
})
export class SectionModule {}
