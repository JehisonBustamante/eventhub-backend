import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  // Crea la instancia de la aplicación NestJS
  const app = await NestFactory.create(AppModule);

  // Configura un pipe global para validar automáticamente todas las peticiones (usando class-validator)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve campos que no están en el DTO
      forbidNonWhitelisted: true, // Lanza error si hay campos no permitidos
      transform: true, // Transforma los tipos automáticamente (ej. string a Date o number)
    }),
  );

  // Escucha en el puerto configurado o en el 3000 por defecto
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
