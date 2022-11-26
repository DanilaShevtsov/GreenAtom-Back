import { Module } from '@nestjs/common';
import { QRCodeController } from './qrcode.controller';
import { QRCodeService } from './qrcode.service';

@Module({
  imports: [],
  providers: [QRCodeService],
  controllers: [QRCodeController],
})
export class QRCodeModule {}
