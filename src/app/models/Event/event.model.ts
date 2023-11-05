import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Event')
export class Event {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   title: string;

   @Column()
   description: string;

   @Column()
   event_Date: Date;

   @Column()
   poster_Url: string;

   @Column()
   type_Event: string;

   @Column()
   registration_Start: Date;

   @Column()
   registration_End: Date;
}
