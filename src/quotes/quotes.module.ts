import { Module } from '@nestjs/common';
import { QuotesController } from './quotes.controller';
import { QuotesService } from './quotes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from 'src/entities/quote.entity'
import { AuthorsModule } from 'src/authors/authors.module';

@Module({
  controllers: [QuotesController],
  providers: [QuotesService],
  imports: [TypeOrmModule.forFeature([Quote]), AuthorsModule],
  exports: [TypeOrmModule]
})
export class QuotesModule {}
