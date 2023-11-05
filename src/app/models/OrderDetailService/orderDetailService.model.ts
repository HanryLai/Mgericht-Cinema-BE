import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '../Order/order.model';
import { Service } from '../Service/service.model';

@Entity('OrderDetailService')
export class OrderDetailService {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   quantity: number;

   // Foreign_Key
   @ManyToOne(() => Order)
   @JoinColumn({
      name: 'id_Order',
   })
   id_Order: Order;

   @ManyToOne(() => Service)
   @JoinColumn({
      name: 'id_Service',
   })
   id_Service: Order;
}
