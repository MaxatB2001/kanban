import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [UserService],
  imports: [],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
