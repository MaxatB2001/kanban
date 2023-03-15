import { RtGuard } from './../common/guards';
import { Tokens } from './types';
import { CreateUserDto } from './../core/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthDto } from './dto';
import { GetCurrentUser, GetCurrentUserId, Public } from 'src/common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: CreateUserDto): Promise<Tokens> {
    console.log(dto);
    return this.authService.signupLocal(dto);
  }

  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: AuthDto, @Res({ passthrough: true }) response: Response): Promise<Tokens> {
    console.log(dto);
    
    return this.authService.signinLocal(dto, response);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: string) {
    this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') rt: string,
    @Res({ passthrough: true }) response: Response
  ): Promise<Tokens> {    
    return this.authService.refreshTokens(userId, rt, response);
  }
}
