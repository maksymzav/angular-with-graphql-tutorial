import { Injectable } from '@nestjs/common';
import { CreateSellerInput } from './seller.input';
import { Seller } from './seller.entity';

@Injectable()
export class SellerService {
  private sellers: Seller[] = [
    { id: 1, name: 'Seller 1', products: [] },
    { id: 2, name: 'Seller 2', products: [] },
    { id: 3, name: 'Seller 3', products: [] }
  ];

  create(input: CreateSellerInput) {
    const seller: Seller = { id: Date.now(),
      name: input.name,
      products: []
    };
    this.sellers.push(seller);
    return seller;
  }

  findAll() {
    return this.sellers;
  }

  findOne(id: number) {
    return this.sellers.find(seller => seller.id === id);
  }

  update(id: number, input: CreateSellerInput) {
    const sellerIndex = this.sellers.findIndex(seller => seller.id === id);
    if (sellerIndex === -1) {
      throw new Error('Seller not found');
    }
    const updatedSeller = { ...this.sellers[sellerIndex], ...input };
    this.sellers[sellerIndex] = updatedSeller;
    return updatedSeller;
  }

  remove(id: number) {
    const sellerIndex = this.sellers.findIndex(seller => seller.id === id);
    if (sellerIndex === -1) {
      throw new Error('Seller not found');
    }
    this.sellers.splice(sellerIndex, 1);
    return true;
  }
}
