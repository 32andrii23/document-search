import { Inject, Injectable } from '@nestjs/common';
import { Document } from './document.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DocumentService {
  constructor(
    @Inject('DOCUMENT_REPOSITORY')
    private documentRepository: Repository<Document>,
  ) {}

  async getDocuments(userEmail: string) {
    return this.documentRepository.find({ where: { userEmail } });
  }

  async createDocument(document: Document) {
    return this.documentRepository.save(document);
  }
}
