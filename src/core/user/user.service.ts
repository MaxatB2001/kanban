import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from './../../database/prisma.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const hash = await bcrypt.hash(dto.password, 10);
    const newUser = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        hash,
      },
    });
    return newUser;
  }
}
