import {
  Controller,
  Body,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dtos/create-book.dto';
import { Book } from './schemas/book.schema';
import { UpdateBookDto } from './dtos/update-book.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  @UseGuards(AuthGuard())
  async createBook(@Body() book: CreateBookDto, @Req() req): Promise<Book> {
    return this.bookService.create(book, req.user);
  }

  @Get()
  async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
    return this.bookService.findAll(query);
  }

  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<Book> {
    return this.bookService.findById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async updateBookById(
    @Param('id') id: string,
    @Body() book: UpdateBookDto,
    @Req() req,
  ): Promise<Book> {
    const userid = await req.user._id.toString();
    return this.bookService.updateById(id, book, userid);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteBookById(@Param('id') id: string, @Req() req): Promise<Book> {
    const userid = await req.user._id.toString();

    return this.bookService.rmoveBookById(id, userid);
  }
}
