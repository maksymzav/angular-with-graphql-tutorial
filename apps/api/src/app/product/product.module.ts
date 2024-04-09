import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { SellerModule } from '../seller/seller.module';
import { StoreModule } from '../store/store.module';

@Module({
  imports: [SellerModule, StoreModule],
  providers: [ProductService, ProductResolver]
})
export class ProductModule {}
