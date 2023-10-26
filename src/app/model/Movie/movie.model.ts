import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
