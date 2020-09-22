import { Body, Controller, Get, Post, Param, Delete, Logger, HttpException, HttpStatus } from '@nestjs/common';
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
    const {authorFirstname, authorLastname, content} = createQuoteDto;
    if (authorFirstname && authorLastname && content)
      return this.quotesService.create({
        firstname: authorFirstname,
        lastname: authorLastname
      }, content);
    else 
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
  }
  @Get()
  async findAll(): Promise<Quote[]> {
    return this.quotesService.findAll();
  }
}
