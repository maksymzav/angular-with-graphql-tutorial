import { Product } from '../product/product.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Seller {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field(() => [Product])
  products: Product[];
}
