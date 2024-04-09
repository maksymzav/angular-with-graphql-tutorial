import { Module } from '@nestjs/common';
import { SellerResolver } from './seller.resolver';
import { SellerService } from './seller.service';

@Module({
  providers: [SellerService, SellerResolver],
  exports: [SellerService],
})
export class SellerModule {}
