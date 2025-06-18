import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { DatabaseModule } from '../database/database.module';
import { documentProviders } from './document.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...documentProviders, DocumentService],
  controllers: [DocumentController],
})
export class DocumentModule {}
