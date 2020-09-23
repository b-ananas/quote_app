import { Body, Controller, Get, Post, Param, Delete, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { Quote } from '../entities/quote.entity';
import { CreateQuoteDto } from '../dto/create-quote.dto'
import { Author } from 'src/entities/author.entity';
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
  @Post('many')
  async batchCreate(@Body() quotesArray: CreateQuoteDto[]):Promise<void> {
    this.quotesService.createMany(quotesArray.map((quote) => { 
      return {
        author: {
          firstname: quote.authorFirstname,
          lastname: quote.authorLastname
        },
        content: quote.content
      }
    }));
  }
  @Get()
  async findAll() {
    return this.quotesService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id) {
    return this.quotesService.findOne(id);
  }
}
