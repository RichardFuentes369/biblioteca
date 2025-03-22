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
            author: row.author,
            year: parseInt(row.year, 10),
        }));
    }
}