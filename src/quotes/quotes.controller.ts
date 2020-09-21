import { Body, Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { Quote } from '../entities/quote.entity';
import { CreateQuoteDto } from '../dto/create-quote.dto'
@Controller('quotes')
export class QuotesController {
  constructor (
    private quotesService:QuotesService
  ) {}
  @Post()
  async create(@Body() createQuoteDto: CreateQuoteDto):Promise<Quote> {
    const {author, content} = createQuoteDto;
    if (author && content)
      return this.quotesService.create(author, content);
  }
  @Get()
  async findAll(): Promise<Quote[]> {
    return this.quotesService.findAll();
  }
}
