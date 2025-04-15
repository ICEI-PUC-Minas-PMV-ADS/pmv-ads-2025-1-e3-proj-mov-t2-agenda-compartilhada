import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { RecoveryService } from './recuperacao-senha.service';
import { CreateRecoveryDto } from './dto/create-recuperacao-senha.dto';
import { Recovery } from './schema/recuperacao-senha.schema';
import { UpdateRecoveryDto } from './dto/update-recuperacao-senha.dto';

@Controller('recovery')
export class RecoveryController {
  constructor(private readonly recoveryService: RecoveryService) {}

  @Post()
  async create(
    @Body() createRecoveryDto: CreateRecoveryDto,
  ): Promise<Recovery> {
    return this.recoveryService.create(createRecoveryDto);
  }

  @Get()
  async findAll(): Promise<Recovery[]> {
    return this.recoveryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Recovery> {
    return this.recoveryService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRecoveryDto: UpdateRecoveryDto,
  ): Promise<Recovery> {
    return this.recoveryService.update(id, updateRecoveryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Recovery> {
    return this.recoveryService.remove(id);
  }
}
