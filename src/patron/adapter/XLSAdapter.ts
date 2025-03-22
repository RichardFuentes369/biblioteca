import * as XLSX from 'xlsx'; // npm install xlsx

class XLSAdapter implements BookStorage {
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    getBooks(): Book[] {
        const workbook = XLSX.readFile(this.filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);
        return data.map((row: any) => ({
            title: row.title,
            publisher: row.publisher,
            author: row.author,
            year_of_publication: parseInt(row.year_of_publication),
            genre: row.genre,
            language: row.language,
            isbn: row.isbn,
            inStock: parseInt(row.inStock),
            inLoan: parseInt(row.inLoan),
            damaged: parseInt(row.damaged),
            total: parseInt(row.total),
            size_pages: parseInt(row.size_pages)
        }));
    }
}