import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PerfisService } from './perfis.service';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
import { Perfil } from './schema/perfis.schema';

@Controller('perfis')
export class PerfisController {
  constructor(private readonly perfisService: PerfisService) {}

  @Post()
  async create(@Body() createPerfilDto: CreatePerfilDto): Promise<Perfil> {
    return this.perfisService.create(createPerfilDto);
  }

  @Get()
  async findAll(): Promise<Perfil[]> {
    return this.perfisService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Perfil> {
    return this.perfisService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePerfilDto: UpdatePerfilDto,
  ): Promise<Perfil> {
    return this.perfisService.update(id, updatePerfilDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Perfil> {
    return this.perfisService.remove(id);
  }
}
