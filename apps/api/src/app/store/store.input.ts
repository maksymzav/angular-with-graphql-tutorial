import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateStoreInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateStoreInput {
  @Field({ nullable: true })
  name?: string;
}
