import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(JwtAuthGuard)
  @Post() // Crear un nuevo evento
  create(@Body() createEventDto: CreateEventDto, @Req() req) {
    // req.user contiene los datos del usuario autenticado (inyectado por Passport)
    return this.eventsService.create(createEventDto, req.user);
  }

  @Get() // Obtener lista de todos los eventos
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id') // Obtener un evento específico por ID
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id') // Actualizar parcialmente un evento
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id') // Eliminar un evento
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/join') // Unirse a un evento
  join(@Param('id') id: string, @Req() req) {
    return this.eventsService.join(id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/leave') // Salirse de un evento
  leave(@Param('id') id: string, @Req() req) {
    return this.eventsService.leave(id, req.user);
  }
}
