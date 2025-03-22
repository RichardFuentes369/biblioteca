import * as fs from 'fs';
import { parse } from 'csv-parse/sync'; // npm install csv-parse

class CSVAdapter implements BookStorage {
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    getBooks(): Book[] {
        const fileContent = fs.readFileSync(this.filePath, 'utf-8');
        const records = parse(fileContent, {
            columns: true,
            skip_empty_lines: true,
        });
        return records.map((row: any) => ({
            title: row.title,
            author: row.author,
            year: parseInt(row.year, 10),
        }));
    }
}