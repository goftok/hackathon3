import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const transactionMadeEarlierThanXMinutes = (timestamp, x) => {
    const timestampMs = timestamp * 1000;
    const currentTimeMs = Date.now();
    const differenceMinutes = (currentTimeMs - timestampMs) / (1000 * 60);
    return differenceMinutes <= x;
}

export const sendHtml = (fileName, res) => {
    const filePath = path.join(__dirname, '../frontend', fileName);
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading HTML file:', err);
        res.status(500).send('Server error');
        return;
      }
      res.status(200).send(data);
    });
  };