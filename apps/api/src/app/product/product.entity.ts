import { Field, ObjectType } from '@nestjs/graphql';
import { Store } from '../store/store.entity';
import { Seller } from '../seller/seller.entity';

@ObjectType()
export class Product {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  price: number;

  @Field(() => [Store])
  stores: Store[] = [];

  @Field(() => Seller)
  seller?: Seller;
}
