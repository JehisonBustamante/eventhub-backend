import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Valida si el usuario existe y si la contraseña coincide
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    // Compara la contraseña ingresada con el hash guardado en la base de datos
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user; // Remueve la contraseña del objeto retornado por seguridad
      return result;
    }
    return null;
  }

  // Genera un token JWT para el usuario autenticado
  async login(user: any) {
    const payload = { email: user.email, sub: user.id }; // Datos que se incluirán en el token
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      }
    };
  }

  // Registra un nuevo usuario en el sistema
  async register(createUserDto: any) {
    const user = await this.usersService.create(createUserDto);
    const { password, ...result } = user;
    return result;
  }
}
