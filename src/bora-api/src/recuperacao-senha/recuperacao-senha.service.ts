import { Injectable } from '@nestjs/common';
import { RecuperacaoSenhaRepository } from './repository/recuperacao-senha.repository';
import { Recovery } from './schema/recuperacao-senha.schema';
import { CreateRecoveryDto } from './dto/create-recuperacao-senha.dto';
import { UpdateRecoveryDto } from './dto/update-recuperacao-senha.dto';

@Injectable()
export class RecoveryService {
  constructor(
    private readonly recuperacaoSenhaRepository: RecuperacaoSenhaRepository,
  ) {}

  async create(createRecoveryDto: CreateRecoveryDto): Promise<Recovery> {
    return this.recuperacaoSenhaRepository.create(createRecoveryDto);
  }

  async findAll(): Promise<Recovery[]> {
    return this.recuperacaoSenhaRepository.findAll();
  }

  async findOne(id: string): Promise<Recovery> {
    return this.recuperacaoSenhaRepository.findOne(id);
  }

  async update(
    id: string,
    updateRecoveryDto: UpdateRecoveryDto,
  ): Promise<Recovery> {
    return this.recuperacaoSenhaRepository.update(id, updateRecoveryDto);
  }

  async remove(id: string): Promise<Recovery> {
    return this.recuperacaoSenhaRepository.remove(id);
  }
}
