import { useState } from 'react';
import QRCode from 'qrcode';
import { generateURL } from '../generateURL';

// QRコード生成フック
export function useQRCode() {
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

    const generateQRCode = (data: any) => {
        const timetrUrl = generateURL(
            data.startDate,
            data.startTime,
            data.endDate,
            data.endTime,
            data.title,
            data.memo,
            data.allDay,
            data.location,
            data.url
        );

        QRCode.toDataURL(timetrUrl, (err, url) => {
            if (err) {
                console.error('QRコード生成エラー:', err);
            } else {
                setQrCodeUrl(url);
            }
        });
    };

    return {
        qrCodeUrl,
        generateQRCode
    };
}