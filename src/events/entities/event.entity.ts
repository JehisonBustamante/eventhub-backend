import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // Define esta clase como una tabla en la base de datos
export class Event {
  @PrimaryGeneratedColumn('uuid') // Genera automáticamente un ID único tipo UUID
  id: string;

  @Column()
  title: string;

  @Column('text') // Columna de tipo texto para descripciones largas
  description: string;

  @Column()
  date: Date;

  @Column()
  location: string;

  @Column() // Por ahora almacenamos el nombre del organizador como string
  organizer: string;
}
