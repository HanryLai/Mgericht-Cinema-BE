import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Role_Screen {
   COUPLE = 'couple',
   VIP = 'vip',
   NORMAL = 'normal',
}

@Entity('TypeScreen')
export class TypeScreen {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({
      type: 'enum',
      enum: Role_Screen,
      default: Role_Screen.NORMAL,
   })
   type_Screen: Role_Screen;

   @Column()
   describle: string;
}
