import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { CreateProductInput, UpdateProductInput } from './product.input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  createProduct(@Args('input') input: CreateProductInput) {
    return this.productService.create(input);
  }

  @Query(() => [Product], { name: 'getAllProducts' })
  findAll() {
    return this.productService.findAll();
  }

  @Query(() => Product, { name: 'getProduct' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.productService.findOne(id);
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productService.update(id, updateProductInput);
  }

  @Mutation(() => Boolean)
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productService.remove(id);
  }
}
