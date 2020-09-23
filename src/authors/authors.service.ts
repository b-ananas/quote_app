import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '../entities/author.entity';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorRepository:Repository<Author>,
  ) {}

  findAll():Promise<Author[]> {
    return this.authorRepository.find();
  }
  findOne(id: string):Promise<Author> {
    return this.authorRepository.findOne(id);
  }
  findByName(firstname:string, lastname:string):Promise<Author> {
    const answ = this.authorRepository
      .createQueryBuilder("author")
      .where("author.firstname = :firstname", {firstname: firstname})
      .andWhere("author.lastname = :lastname", {lastname: lastname})
      .getOne();
      return answ;
  }
  async findOrCreateByName(firstname:string, lastname:string):Promise<Author> {
    if (await this.findByName(firstname, lastname)) {
      return this.findByName(firstname, lastname);
    }
    else {
      return this.createAndSave(firstname, lastname);
    }
  }
  async remove(id:string): Promise<void> {
    await this.authorRepository.delete(id);
  }
  async create(firstname:string, lastname:string): Promise<Author> {
    const author = this.authorRepository.create({
      firstname: firstname,
      lastname: lastname
    })
    return author;
  }
  async createAndSave(firstname:string, lastname:string): Promise<Author> {
    const author = await this.create(firstname, lastname);
    await this.authorRepository.save(author);
    return author

  }
}
