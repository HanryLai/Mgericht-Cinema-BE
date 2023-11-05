import {
   Column,
   CreateDateColumn,
   Entity,
   PrimaryGeneratedColumn,
   UpdateDateColumn,
} from 'typeorm';

export enum Status_Enum {
   NOW = 'now',
   COMING = 'coming',
   OFF = 'off',
}

@Entity('Movie')
export class Movie {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   title: string;

   @Column()
   genres: string;

   @Column()
   actors: string;

   @Column()
   directors: string;

   @Column()
   duration: number;

   @Column()
   release_Date: Date;

   @Column()
   description: string;

   @Column()
   trailer_Url: string;

   @Column()
   poster_Url: string;

   @Column({
      type: 'enum',
      enum: Status_Enum,
   })
   status: Status_Enum;

   @CreateDateColumn()
   create_At: Date;

   @UpdateDateColumn()
   update_At: Date;
}
