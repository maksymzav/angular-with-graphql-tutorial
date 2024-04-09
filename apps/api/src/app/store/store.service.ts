import { Injectable } from '@nestjs/common';
import { CreateStoreInput, UpdateStoreInput } from './store.input';
import { Store } from './store.entity';

@Injectable()
export class StoreService {
  private stores: Store[] = [
    { id: 1, name: 'Store 1', products: [] },
    { id: 2, name: 'Store 2', products: [] },
    { id: 3, name: 'Store 3', products: [] }
  ];

  create(input: CreateStoreInput) {
    const store: Store = {
      id: Date.now(),
      name: input.name,
      products: []
    };
    this.stores.push(store);
    return store;
  }

  findAll() {
    return this.stores;
  }

  findOne(id: number) {
    return this.stores.find(store => store.id === id);
  }

  update(id: number, input: UpdateStoreInput) {
    const storeIndex = this.stores.findIndex(store => store.id === id);
    if (storeIndex === -1) {
      throw new Error('Store not found');
    }
    const updatedStore = { ...this.stores[storeIndex], ...input };
    this.stores[storeIndex] = updatedStore;
    return updatedStore;
  }

  remove(id: number) {
    const storeIndex = this.stores.findIndex(store => store.id === id);
    if (storeIndex === -1) {
      throw new Error('Store not found');
    }
    this.stores.splice(storeIndex, 1);
    return true;
  }

  findStoresByProductIds(productIds: number[]): Store[] {
    return this.stores.filter(store => productIds.includes(store.id));
  }


}
