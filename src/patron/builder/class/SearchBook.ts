import { SearchBookBuilder } from "./SearchBookBuilder";

  export class SearchBook {
    title?: string;
    publisher?: string;
    author?: string;
    year_of_publication?: number;
    genre?: string;
    isbn?: string;
    inStock?: number;
    inLoan?: number;
    damaged?: number;
    total?: number;
    size_pages?: number;
    language?: string;
    limit?: number
    page?: number
    order?: string
    field?: string
  
    constructor(builder: SearchBookBuilder) {
      this.title = builder.title;
      this.publisher = builder.publisher;
      this.author = builder.author;
      this.year_of_publication = builder.year_of_publication;
      this.genre = builder.genre;
      this.isbn = builder.isbn;
      this.inStock = builder.inStock;
      this.inLoan = builder.inLoan;
      this.damaged = builder.damaged;
      this.total = builder.total;
      this.size_pages = builder.size_pages;
      this.language = builder.language;

      this.limit = builder.limit;
      this.page = builder.page;
      this.order = builder.order;
      this.field = builder.field;
    }
  }