// src/grupos/grupos.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { promises as fs } from 'fs';
import { GruposService } from './grupos.service';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { AddMembersDto } from './dto/add-members.dto';
import { Grupo } from './schema/grupos.schema';
import { User } from '../users/schema/user.schema';
import { config } from 'dotenv';

config();

@Controller('grupos')
export class GruposController {
  constructor(private readonly gruposService: GruposService) {}

  @Post()
  async create(@Body() createGrupoDto: CreateGrupoDto): Promise<Grupo> {
    return this.gruposService.create(createGrupoDto);
  }

  @Get()
  async findAll(): Promise<Grupo[]> {
    return this.gruposService.findAll();
  }

  @Get(':id/membros')
  async getMembersWithDetails(
    @Param('id') id: string,
  ): Promise<Array<{ user: User; isAdmin: boolean }>> {
    return this.gruposService.getMembersWithDetails(id);
  }

  @Post(':id/membros')
  async addMembers(
    @Param('id') id: string,
    @Body() addMembersDto: AddMembersDto,
  ): Promise<Grupo> {
    return this.gruposService.addMembers(id, addMembersDto.members);
  }

  @Delete(':id/membros/:memberRef')
  async removeMember(
    @Param('id') id: string,
    @Param('memberRef') memberRef: string,
  ): Promise<Grupo> {
    return this.gruposService.removeMember(id, decodeURIComponent(memberRef));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Grupo> {
    return this.gruposService.findOne(id);
  }

  @Get('usuario/:email')
  async findByUserEmail(@Param('email') email: string): Promise<Grupo[]> {
    return this.gruposService.findByUserEmail(email);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGrupoDto: UpdateGrupoDto,
  ): Promise<Grupo> {
    return this.gruposService.update(id, updateGrupoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Grupo> {
    return this.gruposService.remove(id);
  }

  // Endpoint específico para upload de imagem de grupo
  @Post('upload-image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/uploads',
        filename: (req, file, callback) => {
          const ext = extname(file.originalname);
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const filename = `group-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.mimetype)) {
          return callback(
            new Error('Apenas imagens JPEG, PNG ou GIF são permitidas!'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async uploadGroupImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { displayName?: string },
  ) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo foi enviado.');
    }

    if (body.displayName) {
      const ext = extname(file.filename);
      const newFilename = `${body.displayName}${ext}`;
      const oldPath = `./public/uploads/${file.filename}`;
      const newPath = `./public/uploads/${newFilename}`;

      await fs.rename(oldPath, newPath);
      file.filename = newFilename;
    }

    const baseUrl = process.env.API_IP ?? 'http://localhost:3000';
    const url = `${baseUrl}/uploads/${file.filename}`;

    return {
      message: 'Imagem do grupo enviada com sucesso!',
      filename: file.filename,
      displayName: body.displayName,
      url,
    };
  }
}
