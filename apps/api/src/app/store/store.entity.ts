import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from '../product/product.entity';

@ObjectType()
export class Store {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field(() => [Product])
  products: Product[];
}
