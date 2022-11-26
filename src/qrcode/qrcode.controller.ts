import { Controller, Get, Query } from '@nestjs/common';
import { QRCodeService } from './qrcode.service';

@Controller('qrcode')
export class QRCodeController {
  constructor(public readonly qrcodeService: QRCodeService) {}

  @Get('generate')
  async find(@Query('url') url: string) {
    return await this.qrcodeService.generate(url)
  }

}
 