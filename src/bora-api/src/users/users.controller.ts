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
  InternalServerErrorException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import { promises as fs } from 'fs'; // Import para manipulação de arquivos

@Controller('usuarios')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove(id);
  }

  @Post('upload-image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/uploads',
        filename: (req, file, callback) => {
          const ext = extname(file.originalname);
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          
          // Nome padrão se não houver displayName
          const filename = `image-${uniqueSuffix}${ext}`;
          
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.mimetype)) {
          return callback(new Error('Apenas imagens JPEG, PNG ou GIF são permitidas!'), false);
        }
        callback(null, true);
      },
    }),
  )
  async uploadImageWithName(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { displayName?: string }, // Captura todo o body
  ) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo foi enviado.');
    }

    // Renomeia o arquivo após o upload, se displayName existir
    if (body.displayName) {
      const ext = extname(file.filename);
      const newFilename = `${body.displayName}${ext}`;
      const oldPath = `./public/uploads/${file.filename}`;
      const newPath = `./public/uploads/${newFilename}`;
      
      await fs.rename(oldPath, newPath); // Usar fs.promises ou importar 'fs/promises'
      
      file.filename = newFilename;
    }

    const url = `http://localhost:3000/public/uploads/${file.filename}`;

    return {
      message: 'Imagem enviada com sucesso!',
      filename: file.filename,
      displayName: body.displayName,
      url,
    };
  }



}
