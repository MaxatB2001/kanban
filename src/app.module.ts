import { TaskModule } from './core/task/task.module';
import { SectionModule } from './core/section/section.module';
import { ProjectModule } from './core/project/project.module';
import { AtGuard } from './common/guards/at.guard';
import { WorkspaceModule } from './core/workspace/workspace.module';
import { UserModule } from './core/user/user.module';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [DatabaseModule, UserModule, WorkspaceModule, AuthModule, ProjectModule, SectionModule, TaskModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard
    }
  ],
})
export class AppModule {}
