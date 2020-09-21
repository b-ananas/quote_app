import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuotesModule } from './quotes/quotes.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { QuotesController } from './quotes/quotes.controller'
import { QuotesService } from './quotes/quotes.service';

@Module({
  imports: [TypeOrmModule.forRoot(), QuotesModule],
  controllers: [AppController, QuotesController],
  providers: [AppService, QuotesService],
})
export class AppModule {}
