import mongoose, { Document } from 'mongoose';

export interface BookDocument extends Document {
  title: string;
  isbn: string;
  description: string;
  publisher: string;
  authors: string[];
  categories: string[];
  status: statusType;
  borrower: mongoose.Schema.Types.ObjectId | null;
  publishDate: Date;
  borrowDate: Date | null;
  returnDate: Date | null;
}

export enum statusType {
  available = 'available',
  borrowed = 'borrowed',
}
