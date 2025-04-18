import { SearchBook } from "./SearchBook";

export class SearchBookBuilder {
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
    limit?: number;
    page?: number;
    order?: string;
    field?: string;
  
    conTitulo(title: string): this {
      this.title = title;
      return this;
    }

    conEditorial(publisher: string): this {
      this.publisher = publisher;
      return this;
    }    
    
    conAutor(author: string): this {
      this.author = author;
      return this;
    }

    conAnhoPublicacion(year_of_publication: number): this {
      this.year_of_publication = year_of_publication;
      return this;
    }

    conGenero(genre: string): this {
      this.genre = genre;
      return this;
    }
  
    conISBN(isbn: string): this {
      this.isbn = isbn;
      return this;
    }

    conStock(inStock: number): this {
      this.inStock = inStock;
      return this;
    }

    conPrestamo(inLoan: number): this {
      this.inLoan = inLoan;
      return this;
    }

    conDanho(damaged: number): this {
      this.damaged = damaged;
      return this;
    }

    conCantidadLibros(total: number): this {
      this.total = total;
      return this;
    }

    conCantidadPaginas(size_pages: number): this {
      this.size_pages = size_pages;
      return this;
    }

    conIdioma(language: string): this {
      this.language = language;
      return this;
    }    

    conLimit(limit: number): this {
      this.limit = limit;
      return this;
    }

    conPage(page: number): this {
      this.page = page;
      return this;
    }

    conOrder(order: string): this {
      this.order = order;
      return this;
    }

    conField(field: string): this {
      this.field = field;
      return this;
    }   

    build(): SearchBook {
      return new SearchBook(this);
    }
  }