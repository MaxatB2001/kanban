import { UserModule } from './../core/user/user.module';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AtStrategy, RtStrategy } from './strategies';

@Module({
  imports: [UserModule, JwtModule.register({})],
  providers: [AuthService, RtStrategy, AtStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
