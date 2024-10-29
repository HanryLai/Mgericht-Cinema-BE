import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Movie } from '../Movie/movie.model';
import { Screen } from '../Screen/screen.model';
import { Event } from '../Event/event.model';

@Entity('ShowTime')
export class ShowTime {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({
      type: 'timestamptz',
      default: () => 'CURRENT_DATE',
   })
   time_Start: Date;

   @Column()
   time_End: Date;
   //asd
   //Foreign_Keys
   @OneToOne(() => Movie)
   @JoinColumn({
      name: 'id_Movie',
   })
   id_Movie: Movie;
   // tesst account git
   @ManyToOne(() => Screen)
   @JoinColumn({
      name: 'id_Screen',
   })
   id_Screen: Screen;

   @ManyToOne(() => Event)
   @JoinColumn({
      name: 'id_Event',
   })
   id_Event: Event;
}
