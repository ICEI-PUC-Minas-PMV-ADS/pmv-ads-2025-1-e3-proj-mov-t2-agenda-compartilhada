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
    console.log('Controller - create group called with:', createGrupoDto);
    try {
      const result = await this.gruposService.create(createGrupoDto);
      console.log('Group created successfully:', result._id);
      return result;
    } catch (error) {
      console.error('Error creating group:', error);
      throw error;
    }
  }

  @Get()
  async findAll(): Promise<Grupo[]> {
    return this.gruposService.findAll();
  }

  @Get(':id/membros')
  async getMembersWithDetails(
    @Param('id') id: string,
  ): Promise<Array<{ user: User; isAdmin: boolean }>> {
    console.log('Controller - getMembersWithDetails called for group:', id);
    try {
      const result = await this.gruposService.getMembersWithDetails(id);
      console.log('Members retrieved successfully, count:', result.length);
      return result;
    } catch (error) {
      console.error('Error getting members:', error);
      throw error;
    }
  }

  @Post(':id/membros')
  async addMembers(
    @Param('id') id: string,
    @Body() addMembersDto: AddMembersDto,
  ): Promise<Grupo> {
    console.log('Controller - addMembers called with:', {
      id,
      members: addMembersDto.members,
    });

    if (!addMembersDto.members || !Array.isArray(addMembersDto.members)) {
      throw new BadRequestException(
        'O campo "members" deve ser um array de emails ou IDs',
      );
    }

    if (addMembersDto.members.length === 0) {
      throw new BadRequestException('Pelo menos um membro deve ser fornecido');
    }

    try {
      const result = await this.gruposService.addMembers(
        id,
        addMembersDto.members,
      );
      console.log('Members added successfully to group:', id);
      return result;
    } catch (error) {
      console.error('Error adding members:', error);
      throw error;
    }
  }

  @Delete(':id/membros/:memberRef')
  async removeMember(
    @Param('id') id: string,
    @Param('memberRef') memberRef: string,
  ): Promise<Grupo> {
    console.log('Controller - removeMember called with:', { id, memberRef });

    const decodedMemberRef = decodeURIComponent(memberRef);
    console.log('Decoded member ref:', decodedMemberRef);

    try {
      const result = await this.gruposService.removeMember(
        id,
        decodedMemberRef,
      );
      console.log('Member removed successfully from group:', id);
      return result;
    } catch (error) {
      console.error('Error removing member:', error);
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Grupo> {
    console.log('Controller - findOne called for group:', id);
    try {
      const result = await this.gruposService.findOne(id);
      console.log('Group found:', result.nome);
      return result;
    } catch (error) {
      console.error('Error finding group:', error);
      throw error;
    }
  }

  @Get('usuario/:email')
  async findByUserEmail(@Param('email') email: string): Promise<Grupo[]> {
    console.log('Controller - findByUserEmail called with:', email);
    try {
      const result = await this.gruposService.findByUserEmail(email);
      console.log('Groups found for user:', result.length);
      return result;
    } catch (error) {
      console.error('Error finding groups by user email:', error);
      throw error;
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGrupoDto: UpdateGrupoDto,
  ): Promise<Grupo> {
    console.log('Controller - update group called with:', {
      id,
      updateGrupoDto,
    });
    try {
      const result = await this.gruposService.update(id, updateGrupoDto);
      console.log('Group updated successfully:', id);
      return result;
    } catch (error) {
      console.error('Error updating group:', error);
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Grupo> {
    console.log('Controller - remove group called for:', id);
    try {
      const result = await this.gruposService.remove(id);
      console.log('Group removed successfully:', id);
      return result;
    } catch (error) {
      console.error('Error removing group:', error);
      throw error;
    }
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
    console.log('Controller - uploadGroupImage called');

    if (!file) {
      throw new BadRequestException('Nenhum arquivo foi enviado.');
    }

    try {
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

      console.log('Group image uploaded successfully:', url);

      return {
        message: 'Imagem do grupo enviada com sucesso!',
        filename: file.filename,
        displayName: body.displayName,
        url,
      };
    } catch (error) {
      console.error('Error uploading group image:', error);
      throw error;
    }
  }
}
