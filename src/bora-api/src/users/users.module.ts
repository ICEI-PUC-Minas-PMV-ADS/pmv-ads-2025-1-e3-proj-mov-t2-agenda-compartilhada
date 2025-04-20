import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from './schema/user.schema';
import { UsersRepository } from './repository/users.repository';
import { PerfisModule } from '../perfis/perfis.module';  // Aqui você importa o PerfisModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PerfisModule, // Aqui você importa o PerfisModule
  ],
  controllers: [UsersController],
  providers: [UsersRepository, UsersService],
  exports: [UsersService, MongooseModule],
})
export class UsersModule {}
