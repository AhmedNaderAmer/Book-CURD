import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(query: Query): Promise<Book[]> {
    console.log(query);
    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};
    const books = await this.bookModel.find({ ...keyword });
    return books;
  }

  async create(book: Book, user: User): Promise<Book> {
    const data = Object.assign(book, { user: user._id });

    const Book = await this.bookModel.create(data);
    return Book;
  }

  async findById(id: string): Promise<Book> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }
    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException('Book not found.');
    }
    return book;
  }

  async updateById(id: string, book: Book, userid): Promise<Book> {
    const userx = await this.bookModel.find({ user: userid, _id: id });
    if (userx.length == 0) {
      throw new BadRequestException('you dont have authorization');
    }
    return this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
  }

  async rmoveBookById(id: string, userid): Promise<Book> {
    const userx = await this.bookModel.find({ user: userid, _id: id });
    if (userx.length == 0) {
      throw new BadRequestException('you dont have authorization');
    }
    return await this.bookModel.findByIdAndDelete(id);
  }
}
