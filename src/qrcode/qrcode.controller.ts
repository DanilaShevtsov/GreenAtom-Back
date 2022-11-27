import { Controller, Get, Query, Res } from '@nestjs/common';
import { QRCodeService } from './qrcode.service';
import { Response, response } from 'express';

@Controller('qrcode')
export class QRCodeController {
  constructor(public readonly qrcodeService: QRCodeService) {}

  @Get('generate')
  async find(@Query('id') id: string, @Res() res: Response ) {
    const filename = await this.qrcodeService.generate(id);
    console.log(filename);
    setTimeout(function() {
      res.download(filename);
    }, 500);
    console.log(filename);
  }

}
 