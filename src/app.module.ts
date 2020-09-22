import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuotesModule } from './quotes/quotes.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { QuotesController } from './quotes/quotes.controller'
import { QuotesService } from './quotes/quotes.service';
import { AuthorsService } from './authors/authors.service';
import { AuthorsController } from './authors/authors.controller';
import { AuthorsModule } from './authors/authors.module';

@Module({
  imports: [TypeOrmModule.forRoot(), QuotesModule, AuthorsModule],
  controllers: [AppController, QuotesController, AuthorsController],
  providers: [AppService, QuotesService, AuthorsService],
})
export class AppModule {}
