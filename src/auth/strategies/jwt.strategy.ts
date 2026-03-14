import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      // Indica que el token JWT vendrá en el header 'Authorization' de tipo 'Bearer'
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')!, // Llave secreta para desencriptar el token
    });
  }

  // Este método valida el contenido del token (el payload)
  async validate(payload: any) {
    // Lo que se retorne aquí se inyectará en req.user de las rutas protegidas
    return { userId: payload.sub, email: payload.email };
  }
}
