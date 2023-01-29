import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  constructor(
    @InjectModel(
      'Product' /* this name comes from the mongoose module in products module and has to have the same name as there  */,
    )
    private readonly productModel: Model<Product>,
  ) {}

  async addProduct(
    title: string,
    description: string,
    price: number,
  ): Promise<string> {
    const newProduct = new this.productModel({
      title,
      description,
      price,
    });
    const result = await newProduct.save();
    return result.id;
  }

  async getAllProducts(): Promise<Product[]> {
    let product;
    try {
      product = await this.productModel.find();
    } catch (error) {
      if (!product) {
        throw new NotFoundException('product with given id does not exist');
      }
    }
    return product;
  }

  async getSingleProduct(id: string) {
    let product;
    try {
      product = (await this.productModel.findById(id).lean()) as Product;
    } catch (error) {
      if (!product) {
        throw new NotFoundException('product with given id does not exist');
      }
    }
    return product;
  }

  async deleteProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findByIdAndRemove(id);
    } catch (error) {
      if (!product) {
        throw new NotFoundException('product with given id does not exist');
      }
    }
    return product;
  }

  async updateProduct(
    id: string,
    title: string,
    description: string,
    price: number,
  ) {
    let product;
    try {
      product = await this.productModel.findByIdAndUpdate(
        id,
        { title, description, price },
        { new: true },
      );
    } catch (error) {
      if (!product) {
        throw new NotFoundException('product with given id does not exist');
      }
    }

    if (!product) {
      throw new NotFoundException('product with given id does not exist');
    }
    return product;
  }
}
