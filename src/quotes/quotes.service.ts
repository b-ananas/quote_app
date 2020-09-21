import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quote } from '../entities/quote.entity';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private quoteRepository:Repository<Quote>,
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
  async create(author:string, content:string): Promise<Quote> {
    const quote = this.quoteRepository.create({
      author: author,
      content: content
    })
    this.quoteRepository.insert(quote);
    return quote;
  }
}
