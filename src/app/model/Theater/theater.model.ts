import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from '../Address/address.model';

@Entity('Theater')
export class Theater {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   name: string;

   @Column()
   email: string;

   @Column()
   hotline: string;

   @Column()
   describle: string;

   @OneToOne(() => Address)
   @JoinColumn()
   address: Address;
   //    admin
}
