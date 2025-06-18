import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private readonly s3Client: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get('AWS_REGION'),
    });
  }

  async uploadFile(fileName: string, fileBuffer: Buffer) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
        Key: fileName,
        Body: fileBuffer,
      }),
    );

    return {
      url: `https://${this.configService.get('AWS_S3_BUCKET_NAME')}.s3.amazonaws.com/${fileName}`,
    };
  }
}
