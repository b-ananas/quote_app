import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quote } from '../entities/quote.entity';
import { AuthorsService } from '../authors/authors.service'
import { Author } from 'src/entities/author.entity';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private quoteRepository:Repository<Quote>,
    private authorsService:AuthorsService
  ) {}

  findAll():Promise<Quote[]> {
    return this.quoteRepository.find();
  }
  findOne(id: string):Promise<Quote> {
    return this.quoteRepository.findOne(id);
  }
  async remove(id:string): Promise<void> {
    await this.quoteRepository.delete(id);
  }
  async create(author:{firstname:string, lastname:string}, content:string): Promise<Quote> {
    Logger.log(author);
    const authorRecord:Author = await this.authorsService.findOrCreateByName(author.firstname, author.lastname);
    Logger.log(authorRecord);

    

    const quote = this.quoteRepository.create({
      author: authorRecord,
      content: content
    })
    this.quoteRepository.insert(quote);
    return quote;
  }
}
