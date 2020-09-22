import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from 'src/entities/author.entity';
import { AuthorsService } from 'src/authors/authors.service'
import { AuthorsController } from './authors.controller';

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService],
  imports: [TypeOrmModule.forFeature([Author])],
  exports: [TypeOrmModule, AuthorsService]}
  )
export class AuthorsModule {}
