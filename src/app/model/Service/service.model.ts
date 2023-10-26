import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum Type_Service {
   FOOD = 'food',
   DRINK = 'drink',
   ITEM = 'item',
}

export enum Type_Role {
   BONUS = 'bonus',
   BUSINESS = 'business',
}

export enum Type_Unit {
   GLASS = 'glass',
   BAG = 'bag',
   ITEM = 'item',
}

@Entity('Service')
export class Service {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   name: string;

   @Column({
      type: 'enum',
      enum: Type_Service,
   })
   type: Type_Service;

   @Column({
      type: 'enum',
      enum: Type_Role,
      default: Type_Role.BUSINESS,
   })
   role: Type_Role;

   @Column()
   price: number;

   @Column({
      type: 'enum',
      enum: Type_Unit,
   })
   unit: Type_Unit;

   @Column()
   description: string;

   @Column()
   image_Url: string;
}
