import { parse } from 'csv-parse/sync';
import * as fs from 'fs';
import { FileAdapter } from './interfaces/FileAdapter';
import { Book } from './interfaces/Book';

export class CSVAdapter implements FileAdapter {
    readFile(filePath: string): Book[] {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const records = parse(fileContent, { columns: true, skip_empty_lines: true });

        return records.map((record: any) => ({
            title: record['title'] || '',
            publisher: record['publisher'] || '',
            author: record['author'] || '',
            year_of_publication: parseInt(record['year_of_publication']) || 0,
            genre: record['genre'] || '',
            language: record['language'] || '',
            isbn: record['isbn'] || '',
            inStock: parseInt(record['in_stock']) || 0,
            inLoan: parseInt(record['in_loan']) || 0,
            damaged: parseInt(record['damaged']) || 0,
            total: parseInt(record['total']) || 0,
            size_pages: parseInt(record['size_pages']) || 0,
        }));
    }
}