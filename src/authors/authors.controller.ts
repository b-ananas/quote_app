import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/entities/author.entity';
import { AuthorsService } from './authors.service';

@Controller('authors')
export class AuthorsController {
  constructor(
    private authorsService:AuthorsService
  ) {}
  @Get()
  findAll():Promise<Author[]> {
    Logger.log("AuthorsController");
    return this.authorsService.findAll();
  }

  @Post()
  async create(@Body('firstname') firstname, @Body('lastname') lastname) {
    this.authorsService.create(firstname, lastname);
  }
  
}
