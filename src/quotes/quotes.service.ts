import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Quote } from '../entities/quote.entity';
import { AuthorsService } from '../authors/authors.service'
import { Author } from 'src/entities/author.entity';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private quoteRepository:Repository<Quote>,
    private authorsService:AuthorsService,
    private connection: Connection
  ) {}

  async findAll():Promise<Quote[]> {
    return this.quoteRepository.find();
  }
  async findOne(id: string) {
    const answ = await this.quoteRepository.findOne(id);
    Logger.log("Answ: " + answ.author);
    return {
      content: answ.content,
      author: {
        firstname: answ.author.firstname,
        lastname: answ.author.lastname
      }
    }
  }
  async remove(id:string): Promise<void> {
    await this.quoteRepository.delete(id);
  }
  async create(author:{firstname:string, lastname:string}, content:string): Promise<Quote> {
    const authorRecord:Author = await this.authorsService.findOrCreateByName(author.firstname, author.lastname);

    

    const quote = this.quoteRepository.create({
      author: authorRecord,
      content: content
    })
    Logger.log(quote.author);
    this.quoteRepository.save(quote);
    return quote;
  }
  async createMany(allQuotes: Array<{author:{firstname:string, lastname:string}, content:string}>) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // const authors = allQuotes.map((quote)=> {
      //   return {
      //     firstname: quote.author.firstname,
      //     lastname: quote.author.lastname
      //   }
      // })
      // this.authorsService.createMany(authors);
      
      // const quotes = allQuotes.map((quote) => {
      //   return
      // })
      await allQuotes.forEach(async (inputQuote) => {
        //alternatively: instead of performing checking for duplicates move it somewhere else (pipe? postgres?)

        //check if author is already in DB
        let author:Author = await queryRunner.manager.createQueryBuilder()
        .select("author")
        .from(Author, "author")
        .where("author.firstname = :firstname", {firstname: inputQuote.author.firstname})
        .andWhere("author.lastname = :lastname", {lastname: inputQuote.author.lastname})
        .getOne();
        Logger.log("author: " + author);

        //if not, create a new record
        if (!author) {
          author = await queryRunner.manager.create(Author, inputQuote.author);
          await queryRunner.manager.save(author);
        }
        Logger.log("author: " + author);

        //the same for quote
        // let quote:Quote = await queryRunner.manager.createQueryBuilder()
        // .select("quote")
        // .from(Quote, "quote")
        // .where("quote.content = :content", {content: inputQuote.content})
        // .getOne();
        // Logger.log("quote1: " + quote);
        // if (!quote) {
          const quote = await queryRunner.manager.create(Quote, {
            content: inputQuote.content,
            author: author
          });
          await queryRunner.manager.save(quote);
           Logger.log(quote.content);
        // }
        // Logger.log("quote2: " + quote);
      })
  
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }
}
