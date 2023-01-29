import Book from './book.model';
import { Injectable } from '@nestjs/common';
import { BookDocument } from '../types';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import bookModel from './book.model';

@Injectable()
export class BookService {
  constructor(@InjectModel('Book') private bookModel: Model<BookDocument>) {}
  async getBooks(): Promise<BookDocument[]> {
    return bookModel.find().sort({ title: 1 }).populate('borrower');
  }
}
