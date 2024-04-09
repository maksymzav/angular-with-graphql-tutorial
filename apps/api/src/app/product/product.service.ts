import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { CreateProductInput, UpdateProductInput } from './product.input';

@Injectable()
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
    { id: 3, name: 'Product 3', price: 300 },
  ];

  create(input: CreateProductInput): Product {
    const product = { id: Date.now(), ...input };
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
