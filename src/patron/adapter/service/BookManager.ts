class BookManager {
    private storage: BookStorage;

    constructor(storage: BookStorage) {
        this.storage = storage;
    }

    saveToTable(): void {
        const books = this.storage.getBooks();
        books.forEach(book => {
            console.log(`Guardando: ${book.title} por ${book.author} (${book.year})`);
        });
    }
}