import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register') // Registro de un nuevo usuario
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(LocalAuthGuard) // Usa la estrategia Local para validar email y password antes de entrar
  @Post('login') // Inicio de sesión
  async login(@Request() req) {
    // Si llega aquí, es porque LocalAuthGuard ya validó al usuario y lo puso en req.user
    return this.authService.login(req.user);
  }
}
