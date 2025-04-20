import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule, // Importa o UsersModule para o serviço de autenticação acessar os dados do usuário
    JwtModule.register({
      secret: 'your_secret_key', // Substitua por uma chave segura
      signOptions: { expiresIn: '1h' }, // Defina o tempo de expiração do token
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
