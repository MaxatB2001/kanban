import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [WorkspaceController],
  providers: [WorkspaceService],
  imports: []
})
export class WorkspaceModule {}