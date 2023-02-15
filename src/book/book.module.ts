import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { BookSchema } from './schemas/book.schema';
import { AuthModule } from './../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
  ],

  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}
