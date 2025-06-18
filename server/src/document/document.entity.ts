import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  userEmail: string;

  @Column('text')
  filename: string;

  @Column('text')
  s3Url: string;

  @CreateDateColumn()
  uploadedAt: Date;
}
