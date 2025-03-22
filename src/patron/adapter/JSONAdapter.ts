import * as fs from 'fs';

class JSONAdapter implements BookStorage {
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    getBooks(): Book[] {
        const fileContent = fs.readFileSync(this.filePath, 'utf-8');
        const data = JSON.parse(fileContent);
        return data.map((book: any) => ({
            title: book.title,
            author: book.author,
            year: parseInt(book.year, 10),
        }));
    }
}