import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 5000000, // 5MB
            message: 'File size cannot exceed 5MB',
          }),
          new FileTypeValidator({
            fileType: /(pdf|doc|docx)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return file;
  }
}
