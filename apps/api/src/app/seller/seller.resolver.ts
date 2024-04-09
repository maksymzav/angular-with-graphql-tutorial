import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SellerService } from './seller.service';
import { CreateSellerInput } from './seller.input';
import { Seller } from './seller.entity';

@Resolver(() => Seller)
export class SellerResolver {
  constructor(private readonly sellerService: SellerService) {}

  @Mutation(() => Seller)
  createSeller(@Args('input') input: CreateSellerInput) {
    return this.sellerService.create(input);
  }

  @Query(() => [Seller], { name: 'getAllSellers' })
  findAll() {
    return this.sellerService.findAll();
  }

  @Query(() => Seller, { name: 'getSeller' })
  findOne(@Args('id', { type: () => Number }) id: number) {
    return this.sellerService.findOne(id);
  }

  @Mutation(() => Seller)
  updateSeller(
    @Args('id', { type: () => Number }) id: number,
    @Args('updateSellerInput') updateSellerInput: CreateSellerInput,
  ) {
    return this.sellerService.update(id, updateSellerInput);
  }

  @Mutation(() => Boolean)
  removeSeller(@Args('id', { type: () => Number }) id: number) {
    return this.sellerService.remove(id);
  }
}
