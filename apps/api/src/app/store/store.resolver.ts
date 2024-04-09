import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Store } from './store.entity';
import { CreateStoreInput, UpdateStoreInput } from './store.input';
import { StoreService } from './store.service';

@Resolver(() => Store)
export class StoreResolver {
  constructor(private readonly storeService: StoreService) {
  }

  @Mutation(() => Store)
  createStore(@Args('input') input: CreateStoreInput) {
    return this.storeService.create(input);
  }

  @Query(() => [Store], { name: 'getAllStores' })
  findAll() {
    return this.storeService.findAll();
  }

  @Query(() => Store, { name: 'getStore' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.storeService.findOne(id);
  }

  @Mutation(() => Store)
  updateStore(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateStoreInput') updateStoreInput: UpdateStoreInput,
  ) {
    return this.storeService.update(id, updateStoreInput);
  }

  @Mutation(() => Boolean)
  removeStore(@Args('id', { type: () => Int }) id: number) {
    return this.storeService.remove(id);
  }
}
