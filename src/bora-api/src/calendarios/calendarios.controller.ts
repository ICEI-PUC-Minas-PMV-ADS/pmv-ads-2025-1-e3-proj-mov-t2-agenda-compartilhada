import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CalendariosService } from './calendarios.service';
import { CreateCalendarioDto } from './dto/create-calendario.dto';
import { UpdateCalendarioDto } from './dto/update-calendario.dto';
import { Calendario } from './schema/calendarios.schema';

@Controller('calendarios')
export class CalendariosController {
  constructor(private readonly calendariosService: CalendariosService) {}

  @Post()
  async create(@Body() createCalendarioDto: CreateCalendarioDto): Promise<Calendario> {
    return this.calendariosService.create(createCalendarioDto);
  }

  @Get()
  async findAll(): Promise<Calendario[]> {
    return this.calendariosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Calendario> {
    return this.calendariosService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCalendarioDto: UpdateCalendarioDto,
  ): Promise<Calendario> {
    return this.calendariosService.update(id, updateCalendarioDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Calendario> {
    return this.calendariosService.remove(id);
  }
}
