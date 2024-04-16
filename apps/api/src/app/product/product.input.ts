import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field()
  price: number;

  @Field(() => Int)
  sellerId: number;

  @Field(() => [Int])
  storeIds: number[];
}

@InputType()
export class UpdateProductInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  price?: number;

  @Field(() => Int, { nullable: true })
  sellerId?: number;

  @Field(() => [Int], { nullable: true })
  storeIds?: number[];
}
