import * as XLSX from 'xlsx';
import { FileAdapter } from './interfaces/FileAdapter';
import { Book } from './interfaces/Book';

export class XLSXAdapter implements FileAdapter {
    readFile(filePath: string): Book[] {
        const workbook = XLSX.readFile(filePath);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const records = XLSX.utils.sheet_to_json(sheet);

        return records.map((record: any) => ({
            title: record['title'] || '',
            publisher: record['publisher'] || '',
            author: record['author'] || '',
            year_of_publication: parseInt(record['year_of_publication']) || 0,
            genre: record['genre'] || '',
            language: record['language'] || '',
            isbn: record['isbn'] || '',
            inStock: parseInt(record['inStock']) || 0,
            inLoan: parseInt(record['inLoan']) || 0,
            damaged: parseInt(record['damaged']) || 0,
            total: parseInt(record['total']) || 0,
            size_pages: parseInt(record['size_pages']) || 0,
        }));
    }
}