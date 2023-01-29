import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

const mongodbUrl = process.env['MONGODB_URL'];

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot(mongodbUrl, {
      useUnifiedTopology: true,
    }),
  ],
  controllers: [AppController], // how u handle incoming requests
  providers: [AppService], // extra services/classes which can be injected into controllers or other providers to provide certain functionalities
})
export class AppModule {}
