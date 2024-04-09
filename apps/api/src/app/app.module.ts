import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ProductModule } from './product/product.module';
import { ApolloDriver } from '@nestjs/apollo';

@Module({
  imports: [
    ProductModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      driver: ApolloDriver,
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
