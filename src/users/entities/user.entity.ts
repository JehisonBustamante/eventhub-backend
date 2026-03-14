import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

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

  @BeforeInsert() // Hook de TypeORM que se ejecuta antes de insertar un nuevo registro
  async hashPassword() {
    // Hashea la contraseña con bcrypt (coste de 10) para no guardarla en texto plano
    this.password = await bcrypt.hash(this.password, 10);
  }
}
