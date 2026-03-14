import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>, // Inyección del repositorio de TypeORM para Events
  ) {}

  async create(createEventDto: CreateEventDto) {
    const eventDate = new Date(createEventDto.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establece al inicio del día para comparar fechas

    // REGLA DE NEGOCIO: No se pueden crear eventos en fechas pasadas
    if (eventDate < today) {
      throw new BadRequestException('The event date cannot be in the past');
    }

    const event = this.eventRepository.create(createEventDto); // Crea la instancia de la entidad
    return await this.eventRepository.save(event); // Persiste en la base de datos
  }

  async findAll() {
    // Retorna todos los registros de eventos
    return await this.eventRepository.find();
  }

  async findOne(id: string) {
    // Busca un evento por su ID o lanza error si no existe
    const event = await this.eventRepository.findOneBy({ id });
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
