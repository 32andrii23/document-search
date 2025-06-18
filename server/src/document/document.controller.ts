import { Controller, Post, Body } from '@nestjs/common';
import { DocumentService } from './document.service';
import { Document } from './document.entity';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
  async create(@Body() document: Document) {
    return await this.documentService.createDocument(document);
  }
}
