import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AssociacoesGrupoService } from './associacoes-grupo.service';
import { CreateAssociacaoGrupoDto } from './dto/create-associacoes-grupo.dto';
import { AssociacaoGrupo } from './schema/associacoes-grupo.schema';
import { UpdateAssociacaoGrupoDto } from './dto/update-associacoes-grupo.dto';

@Controller('associacoes-grupo')
export class AssociacoesGrupoController {
  constructor(private readonly service: AssociacoesGrupoService) {}

  @Post()
  async create(
    @Body() createDto: CreateAssociacaoGrupoDto,
  ): Promise<AssociacaoGrupo> {
    return this.service.create(createDto);
  }

  @Get()
  async findAll(): Promise<AssociacaoGrupo[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AssociacaoGrupo> {
    return this.service.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateAssociacaoGrupoDto,
  ): Promise<AssociacaoGrupo> {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<AssociacaoGrupo> {
    return this.service.remove(id);
  }
}
