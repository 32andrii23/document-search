import { Inject, Injectable } from '@nestjs/common';
import { Document } from './document.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DocumentService {
  constructor(
    @Inject('DOCUMENT_REPOSITORY')
    private documentRepository: Repository<Document>,
  ) {}

  async createDocument(document: Document) {
    return this.documentRepository.save(document);
  }
}
