import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from 'src/shared/database/repositories/users.repository';

import { hash } from 'bcryptjs';
import initialCategories from 'src/shared/database/initial.categories';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    const emailTaken = await this.usersRepo.findUnique({
      where: { email },
      select: { id: true },
    });

    if (emailTaken) {
      throw new ConflictException('This email is already in use.');
    }

    const hashedPassword = await hash(password, 12);

    const user = await this.usersRepo.create({
      data: {
        name,
        email,
        password: hashedPassword,
        categories: {
          createMany: {
            data: initialCategories,
          },
        },
      },
    });
    return {
      name: user.name,
      email: user.email,
    };
  }

  getUserById(userId: string) {
    return this.usersRepo.findUnique({
      where: { id: userId },
      select: { name: true, email: true },
    });
  }
}
