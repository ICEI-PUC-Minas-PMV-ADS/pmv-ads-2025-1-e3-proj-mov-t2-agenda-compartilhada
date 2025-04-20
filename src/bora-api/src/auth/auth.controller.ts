// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Rota de login, que recebe e-mail e senha
  @Post('login')
  async login(@Body() loginDto: { email: string, password: string }) {
    return this.authService.login(loginDto.email, loginDto.password);
  }
}
