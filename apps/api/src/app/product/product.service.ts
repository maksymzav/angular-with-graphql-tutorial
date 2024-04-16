import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { CreateProductInput, UpdateProductInput } from './product.input';
import { StoreService } from '../store/store.service';
import { SellerService } from '../seller/seller.service';

@Injectable()
export class ProductService {

  constructor(
    private readonly sellerService: SellerService,
    private readonly storeService: StoreService,
  ) {
    this.create({ name: 'Product 1', price: 100, sellerId: 1, storeIds: [1, 2] });
    this.create({ name: 'Product 2', price: 200, sellerId: 2, storeIds: [2, 3] });
    this.create({ name: 'Product 3', price: 300, sellerId: 3, storeIds: [1, 3] });
  }

  private products: Product[] = [];

  create(input: CreateProductInput): Product {
    const product: Product = {
      id: Date.now() + (Math.random() * 1e7 << 3),
      name: input.name,
      price: input.price,
      seller: this.sellerService.findOne(input.sellerId),
      stores: this.storeService.findStoresByProductIds(input.storeIds),
    };
    this.products.push(product);
    return product;
  }
  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    return this.products.find(item => item.id === id);
  }

  update(id: number, input: UpdateProductInput): Product {
    const productIndex = this.products.findIndex(item => item.id === id);
    if (productIndex === -1) {
      throw new Error('Product not found');
    }
    const updatedProduct = { ...this.products[productIndex], ...input };
    this.products[productIndex] = updatedProduct;
    return updatedProduct;
  }

  remove(id: number): boolean {
    const productIndex = this.products.findIndex(item => item.id === id);
    if (productIndex === -1) {
      throw new Error('Product not found');
    }
    this.products.splice(productIndex, 1);
    return true;
  }
}
