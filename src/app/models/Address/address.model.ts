import { Column, Entity, PrimaryColumn } from 'typeorm';
// import { Theater } from '../Theater/theater.model';

@Entity('Address')
export class Address {
   @PrimaryColumn()
   id: Number;

   @Column()
   area: string;

   @Column()
   province: string;

   @Column()
   city: string;
}
