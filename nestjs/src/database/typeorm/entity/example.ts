import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('examples')
export class Example {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamptz' })
  updatedAt: Date;
}
