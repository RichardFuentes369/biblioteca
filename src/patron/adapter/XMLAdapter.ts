import * as fs from 'fs';

import { xml2js } from 'xml-js';
import { FileAdapter } from './interfaces/FileAdapter';
import { Book } from './interfaces/Book';

export class XMLAdapter implements FileAdapter {
    readFile(filePath: string): Book[] { 
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const result = xml2js(fileContent, { compact: true }); 

        const records = result['Books']['book'];

        return records.map((record: any) => ({
            title: record['title']?._text || '',
            publisher: record['publisher']?._text || '',
            author: record['author']?._text || '',
            year_of_publication: parseInt(record['year_of_publication']?._text) || 0,
            genre: record['genre']?._text || '',
            language: record['language']?._text || '',
            isbn: record['isbn']?._text || '',
            inStock: parseInt(record['inStock']?._text) || 0,
            inLoan: parseInt(record['inLoan']?._text) || 0,
            damaged: parseInt(record['damaged']?._text) || 0,
            total: parseInt(record['total']?._text) || 0,
            size_pages: parseInt(record['size_pages']?._text) || 0,
        }));
    }
}