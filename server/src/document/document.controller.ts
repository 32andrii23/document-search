import {
  Controller,
  Post,
  Body,
  Query,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { Document } from './document.entity';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get()
  async get(@Query('userEmail') userEmail: string) {
    return await this.documentService.getDocuments(userEmail);
  }

  @Post()
  async create(@Body() document: Document) {
    return await this.documentService.createDocument(document);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.documentService.deleteDocument(id);
  }
}
