import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recovery, RecoveryDocument } from '../schema/recuperacao-senha.schema';
import { CreateRecoveryDto } from '../dto/create-recuperacao-senha.dto';
import { UpdateRecoveryDto } from '../dto/update-recuperacao-senha.dto';

@Injectable()
export class RecuperacaoSenhaRepository {
  constructor(
    @InjectModel(Recovery.name)
    private readonly recoveryModel: Model<RecoveryDocument>,
  ) {}

  async create(createRecoveryDto: CreateRecoveryDto): Promise<Recovery> {
    const createdRecovery = new this.recoveryModel(createRecoveryDto);
    return createdRecovery.save();
  }

  async findAll(): Promise<Recovery[]> {
    return this.recoveryModel.find().exec();
  }

  async findOne(id: string): Promise<Recovery> {
    const recovery = await this.recoveryModel.findById(id).exec();
    if (!recovery) {
      throw new NotFoundException(
        `Token de recuperação com ID ${id} não encontrado`,
      );
    }
    return recovery;
  }

  async update(
    id: string,
    updateRecoveryDto: UpdateRecoveryDto,
  ): Promise<Recovery> {
    const updatedRecovery = await this.recoveryModel
      .findByIdAndUpdate(id, updateRecoveryDto, { new: true })
      .exec();
    if (!updatedRecovery) {
      throw new NotFoundException(
        `Token de recuperação com ID ${id} não encontrado`,
      );
    }
    return updatedRecovery;
  }

  async remove(id: string): Promise<Recovery> {
    const deletedRecovery = await this.recoveryModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedRecovery) {
      throw new NotFoundException(
        `Token de recuperação com ID ${id} não encontrado`,
      );
    }
    return deletedRecovery;
  }
}
