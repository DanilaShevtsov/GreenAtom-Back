import { randomUUID } from 'crypto';
import { UsersAdminEntity } from 'src/user/entities/user-admin.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'vacancy', schema: 'vacancy' })
export class VacancyEntity {
<<<<<<< Updated upstream
  @PrimaryColumn(
  'uuid',
  )
=======
  @PrimaryGeneratedColumn('uuid')
>>>>>>> Stashed changes
  id: string;

  @Column({
    type: 'varchar',
    comment: 'Название',
  })
  title: string;

  @Column({
    type: 'text',
    comment: 'Краткое описание',    
  })
  preview: string;

  @Column({
    type: 'text',
    comment: 'Описание',
  })
  description: string;

  @Column({
    type: 'varchar',
    comment: 'Город',
  })
  city: string;

  @Column({
    type: 'uuid',
    comment: 'id hr',
    nullable: true,
  })
  hrId: string;

  @ManyToOne(() => UsersAdminEntity)
  @JoinColumn()
  hr: UsersAdminEntity;
}
