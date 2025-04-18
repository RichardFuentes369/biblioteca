import { SearchBook } from "../class/SearchBook";

export interface ISearchBookBuilder {

    conTitulo?(title: string): this;
    conEditorial?(publisher: string): this;
    conAutor?(author: string): this;
    conAnhoPublicacion?(year_of_publication: number): this;
    conGenero?(genre: string): this;
    conISBN?(isbn: string): this;
    conStock?(inStock: number): this;
    conPrestamo?(inLoan: number): this;
    conDanho?(damaged: number): this;
    conCantidadLibros?(total: number): this;
    conCantidadPaginas?(size_pages: number): this;
    conIdioma?(language: string): this;
    conLimit?(limit: number): this;
    conPage?(page: number): this;
    conOrder?(order: string): this;
    conField?(field: string): this;
    build(): SearchBook;
  
}