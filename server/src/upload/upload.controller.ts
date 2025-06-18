import { Controller, Get, Query } from '@nestjs/common';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Get('upload-url')
  async getUploadUrl(
    @Query('filename') filename: string,
    @Query('type')
    type:
      | 'application/pdf'
      | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ) {
    const url = await this.uploadService.generateUploadUrl(filename, type);
    return { url };
  }

  @Get('download-url')
  async getDownloadUrl(@Query('filename') filename: string) {
    const url = await this.uploadService.generateDownloadUrl(filename);
    return { url };
  }
}
