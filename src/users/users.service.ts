import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Inyección del repositorio de usuarios
  ) {}

  async create(createUserDto: CreateUserDto) {
    // Crea y guarda un nuevo usuario (el hashing ocurre en el BeforeInsert de la entidad)
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findByEmail(email: string) {
    // Busca un usuario por email (usado principalmente en el proceso de login)
    return await this.userRepository.findOneBy({ email });
  }

  async findOne(id: string) {
    // Busca un usuario por su ID único
    return await this.userRepository.findOneBy({ id });
  }
}
