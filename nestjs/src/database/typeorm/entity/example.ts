import { Column, Entity, Index } from 'typeorm';

@Index('examples_email_key', ['email'], { unique: true })
@Index('examples_pkey', ['id'], { unique: true })
@Entity('examples', { schema: 'public' })
export class Examples {
  @Column('text', { primary: true, name: 'id' })
  id: string;

  @Column('text', { name: 'email' })
  email: string;

  @Column('text', { name: 'name' })
  name: string;

  @Column('timestamp without time zone', {
    name: 'createdAt',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('timestamp without time zone', { name: 'updatedAt' })
  updatedAt: Date;
}
