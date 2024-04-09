import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSellerInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateSellerInput {
  @Field({ nullable: true })
  name?: string;
}
