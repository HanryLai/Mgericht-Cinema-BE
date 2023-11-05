import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TypeSeat } from '../TypeSeat/type_Seat.model';
import { Screen } from '../Screen/screen.model';

export enum Status_Seat {
   EMPTY = 'empty',
   WAITING = 'waiting',
   USED = 'used',
}

@Entity('Seat')
export class Seat {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   code_Seat: string;

   @Column({
      type: 'enum',
      enum: Status_Seat,
      default: Status_Seat.EMPTY,
   })
   status: Status_Seat;

   //Foreig_Keys

   @ManyToOne(() => Screen)
   @JoinColumn({
      name: 'id_Screen',
   })
   id_Screen: Screen;

   @ManyToOne(() => TypeSeat)
   @JoinColumn({
      name: 'id_TypeSeat',
   })
   id_TypeSeat: TypeSeat;
}
