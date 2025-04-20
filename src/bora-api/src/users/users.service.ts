import { Injectable } from '@nestjs/common';
import { UsersRepository } from './repository/users.repository';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

// 👇 IMPORTAÇÕES DO PERFIL
import { PerfisService } from '../perfis/perfis.service';
import { CreatePerfilDto } from '../perfis/dto/create-perfil.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly perfisService: PerfisService, // 👈 Injetando PerfisService
  ) {}

  // Criar novo usuário com senha criptografada
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Aplicar hash na senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const userWithHashedPassword = {
      ...createUserDto,
      password: hashedPassword,
    };

    // Criando o usuário
    const novoUsuario: any = await this.usersRepository.create(userWithHashedPassword);

    // 👇 Criação do perfil automaticamente após criação do usuário
    const perfilDto: CreatePerfilDto = {
      _id: novoUsuario._id,     // o ID do perfil será o mesmo do usuário
      nome: novoUsuario.name,
      foto: null,                // Foto é null por enquanto
      tipoDono: 'usuario',       // Tipo de dono é sempre 'usuario' no momento da criação
      userId: novoUsuario._id,  // Associando o userId ao perfil
    };

    // Criando o perfil
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
