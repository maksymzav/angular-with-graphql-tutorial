import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ProductModule } from './product/product.module';
import { ApolloDriver } from '@nestjs/apollo';
import { SellerModule } from './seller/seller.module';
import { StoreModule } from './store/store.module';

@Module({
  imports: [
    ProductModule,
    SellerModule,
    StoreModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      driver: ApolloDriver,
      introspection: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
