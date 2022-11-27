import { Injectable } from '@nestjs/common';
import  * as QRCode from 'qrcode';
import * as path from 'path';
require('dotenv').config();

@Injectable()
export class QRCodeService{
    constructor(){}

    async generate(id:string) {
        const host = process.env.FRONTEND_HOST;
        const url = host + "/" + id;
        console.log(url);
        const filename = path.resolve('./qrcodes/'+id+'.png');
        await QRCode.toFile(filename, url, function (err) {
            if (err) throw err
            console.log('QR Code created')
          })
        return filename;
    }
}

