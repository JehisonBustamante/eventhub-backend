import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>, // Inyección del repositorio de TypeORM para Events
  ) {}

  async create(createEventDto: CreateEventDto, user: User) {
    console.log('Incoming createEventDto:', createEventDto);
    const eventDate = new Date(createEventDto.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establece al inicio del día para comparar fechas

    // REGLA DE NEGOCIO: No se pueden crear eventos en fechas pasadas
    if (eventDate < today) {
      throw new BadRequestException('The event date cannot be in the past');
    }

    // Crea la instancia usando el repositorio para asegurar que sea una entidad válida
    const event = this.eventRepository.create(createEventDto);
    
    // Asigna el usuario autenticado. 
    // Ahora 'user' viene con la propiedad 'id' (gracias al cambio en JwtStrategy)
    event.user = user;

    console.log('Final event instance before save:', event);

    return await this.eventRepository.save(event); // Persiste en la base de datos
  }

  async findAll() {
    // Retorna todos los registros de eventos incluyendo la relación con el usuario
    return await this.eventRepository.find({
      relations: ['user'],
    });
  }

  async findOne(id: string) {
    // Busca un evento por su ID incluyendo la relación con el usuario
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!event) {
      throw new NotFoundException(`Event with ID "${id}" not found`);
    }
    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    const event = await this.findOne(id); // Reutiliza findOne para asegurar que existe
    const updatedEvent = this.eventRepository.merge(event, updateEventDto); // Mezcla cambios

    // Valida nuevamente la fecha si está siendo actualizada
    if (updateEventDto.date) {
      const eventDate = new Date(updateEventDto.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (eventDate < today) {
        throw new BadRequestException('The event date cannot be in the past');
      }
    }

    return await this.eventRepository.save(updatedEvent);
  }

  async remove(id: string) {
    const event = await this.findOne(id);
    return await this.eventRepository.remove(event); // Elimina de la base de datos
  }
}
