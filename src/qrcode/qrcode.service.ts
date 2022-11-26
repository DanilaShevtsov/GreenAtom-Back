import { Injectable } from '@nestjs/common';
import  * as QRCode from 'qrcode';

@Injectable()
export class QRCodeService{
    constructor(){}

    async generate(url:string) {
        QRCode.toFile('./qr.png', url, function (err) {
            if (err) throw err
            console.log('QR Code created')
          })
    }
}

