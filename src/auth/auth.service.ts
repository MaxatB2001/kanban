import { PrismaService } from './../database/prisma.service';
import { UserService } from './../core/user/user.service';
import { CreateUserDto } from './../core/user/dto/create-user.dto';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Tokens } from './types';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private prisma: PrismaService,
  ) {}

  async signupLocal(dto: CreateUserDto): Promise<Tokens> {
    const newUser = await this.userService.createUser(dto);
    const tokens = await this.createTokens(newUser.id, newUser.email);
    await this.updateRtHash(newUser.id, tokens.refreshToken);
    return tokens;
  }

  async signinLocal(dto: AuthDto, response: Response): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user)
      throw new ForbiddenException('пользователя с таким email не существует');
    const isPasswordMatches = await bcrypt.compare(dto.password, user.hash);
    if (!isPasswordMatches) throw new ForbiddenException('неверный пароль');
    const tokens = await this.createTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refreshToken);
    response.cookie('refreshToken', tokens.refreshToken, {sameSite: "none", secure: true})
    return tokens;
  }

  async logout(userId: string) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
  }

  async refreshTokens(userId: string, rt: string, response: Response) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) throw new ForbiddenException('доступ запрещен');
    const rtMatches = await bcrypt.compare(rt, user.hashedRt);
    
    if (!rtMatches) throw new ForbiddenException('доступ запрещен')
    const tokens = await this.createTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refreshToken);
    response.cookie('refreshToken', tokens.refreshToken, {sameSite: "none", secure: true})
    return tokens;
  }

  async createTokens(userId: string, email: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          expiresIn: 60 * 15,
          secret: 'at-secret',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          expiresIn: 60 * 60 * 24 * 7,
          secret: 'rt-secret',
        },
      ),
    ]);
    return {
      accessToken: at,
      refreshToken: rt,
    };
  }

  async updateRtHash(userId: string, rt: string) {
    const hash = await bcrypt.hash(rt, 10);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }
}
