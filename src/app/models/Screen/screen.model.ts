import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Theater } from '../Theater/theater.model';
import { TypeScreen } from '../TypeScreen/typeScreen.model';

@Entity('Screen')
export class Screen {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   seat_Quantity: number;

   @Column()
   code_Screen: string;

   // foreign keys

   @ManyToOne(() => Theater)
   @JoinColumn({
      name: 'id_Theater',
   })
   id_Theater: Theater;

   @ManyToOne(() => TypeScreen)
   @JoinColumn({
      name: 'id_TypeScreen',
   })
   id_TypeScreen: TypeScreen;
}
