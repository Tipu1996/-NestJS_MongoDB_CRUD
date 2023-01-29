import { Controller, Get } from '@nestjs/common';
import { BookDocument } from '../types';
import { BookService } from './book.service';

@Controller('/api/v1/book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getBooks(): Promise<BookDocument[]> {
    return this.bookService.getBooks();
  }
}
