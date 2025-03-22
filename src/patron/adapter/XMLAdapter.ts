import * as fs from 'fs';
import * as xml2js from 'xml2js'; // npm install xml2js

class XMLAdapter implements BookStorage {
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    getBooks(): Book[] {
        const fileContent = fs.readFileSync(this.filePath, 'utf-8');
        let books: Book[] = [];
        xml2js.parseString(fileContent, (err, result) => {
            if (err) throw err;
            const bookList = result.books.book; // Asumimos estructura <books><book>...</book></books>
            books = bookList.map((book: any) => ({
                title: book.title[0],
                author: book.author[0],
                year: parseInt(book.year[0], 10),
            }));
        });
        return books;
    }
}