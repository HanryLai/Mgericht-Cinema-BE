import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Type {
   FREE = 'free',
   BUSY = 'busy',
}

@Entity()
export class TypeSeat {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({
      type: 'enum',
      enum: Type,
      default: Type.FREE,
   })
   typeSeat: Type;

   @Column({
      default: 0,
   })
   price: number;

   @Column()
   describle: string;
}
