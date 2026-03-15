import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany, ManyToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Event } from '../../events/entities/event.entity';

@Entity() // Tabla de usuarios en la base de datos
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true }) // Asegura que no existan dos usuarios con el mismo email
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @OneToMany(() => Event, (event) => event.user) // Un usuario puede tener muchos eventos
  events: Event[];

  @ManyToMany(() => Event, (event) => event.attendees) // Un usuario puede unirse a muchos eventos
  joinedEvents: Event[];

  @BeforeInsert() // Hook de TypeORM que se ejecuta antes de insertar un nuevo registro
  async hashPassword() {
    // Hashea la contraseña con bcrypt (coste de 10) para no guardarla en texto plano
    this.password = await bcrypt.hash(this.password, 10);
  }
}
