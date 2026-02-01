import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

/**
 * Resource Entity
 *
 * Represents a resource persisted in the database.
 * Resources are lazily created when first accessed via the external integration.
 */
@Entity('resources')
export class Resource {
  @PrimaryColumn('uuid')
  uuid: string;

  @Column({ type: 'varchar' })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
