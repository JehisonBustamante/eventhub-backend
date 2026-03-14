import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Configura el acceso a variables de entorno (.env) de forma global
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Configura la conexión a PostgreSQL de forma asíncrona usando ConfigService
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', '1234'),
        database: configService.get<string>('DB_DATABASE', 'eventhub'),
        autoLoadEntities: true, // Carga automáticamente las entidades registradas
        synchronize: true, // Crea las tablas en la base de datos automáticamente (solo para desarrollo)
      }),
    }),
    EventsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
