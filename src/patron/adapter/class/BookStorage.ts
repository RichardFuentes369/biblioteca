import { CSVAdapter } from "../CSVAdapter";
import { Book } from "../interfaces/Book";
import { FileAdapter } from "../interfaces/FileAdapter";
import { JSONAdapter } from "../JSONAdapter";
import { XLSXAdapter } from "../XLSAdapter";
import { XMLAdapter } from "../XMLAdapter";

import { StockService } from '@module/book/stock/stock.service'

export class BookStorage {
    
    private adapters: { [key: string]: FileAdapter } = {
        '.csv': new CSVAdapter(),
        '.json': new JSONAdapter(),
        '.xlsx': new XLSXAdapter(),
        '.xml': new XMLAdapter()
    };

    async processFile(filePath: string): Promise<Book[]> {
        const extension = filePath.slice(filePath.lastIndexOf('.')).toLowerCase();
        const adapter = this.adapters[extension];

        if (!adapter) {
            throw new Error(`Formato de archivo no soportado: ${extension}`);
        }

        const books = await Promise.resolve(adapter.readFile(filePath));
        return books;
    }
}