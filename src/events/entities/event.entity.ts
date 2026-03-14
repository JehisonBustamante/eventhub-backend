import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

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

  @Column() // Almacena el nombre del organizador como string (redundante con el usuario, pero mantenido según esquema previo)
  organizer: string;

  @ManyToOne(() => User, (user) => user.events) // Muchos eventos pertenecen a un solo usuario
  user: User;
}
