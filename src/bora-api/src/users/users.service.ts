import { Injectable } from '@nestjs/common';
import { UsersRepository } from './repository/users.repository';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PerfisService } from '../perfis/perfis.service';
import { CreatePerfilDto } from '../perfis/dto/create-perfil.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly perfisService: PerfisService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const userWithHashedPassword = {
      ...createUserDto,
      password: hashedPassword,
    };

    const novoUsuario: any = await this.usersRepository.create(userWithHashedPassword);

    const perfilDto: CreatePerfilDto = {
      _id: novoUsuario._id,
      nome: novoUsuario.name,
      foto: null,
      tipoDono: 'usuario',
      userId: novoUsuario._id,
    };

    await this.perfisService.create(perfilDto);

    return novoUsuario;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.usersRepository.findByEmail(email);
  }

  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: string): Promise<User> {
    return this.usersRepository.remove(id);
  }
}
