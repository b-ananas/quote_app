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
    return this.authorsService.findAll();
  }

  @Post()
  async create(@Body('firstname') firstname, @Body('lastname') lastname) {
    this.authorsService.createAndSave(firstname, lastname);
  }
  
}
