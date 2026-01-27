import {
  Column,
  Entity,
  PrimaryColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('examples', { schema: 'public' })
export class Examples {
  // 1. Use PrimaryColumn para o ID.
  // O @Index manual no ID costuma causar conflito com a PK nativa.
  @PrimaryColumn('text', { name: 'id' })
  id: string;

  @Index('examples_email_key', { unique: true })
  @Column('text', { name: 'email' })
  email: string;

  @Column('text', { name: 'name' })
  name: string;

  // 2. Adicione a precisão (3) para bater com o que veio do Prisma/Banco
  // 3. Use 'now()' ou mantenha o default combinando com a precisão
  @CreateDateColumn({
    type: 'timestamp',
    name: 'createdAt',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updatedAt',
    precision: 3,
    onUpdate: 'CURRENT_TIMESTAMP(3)', // Garante o comportamento de update
  })
  updatedAt: Date;
}
