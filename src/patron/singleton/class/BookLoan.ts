export class BookLoanAllow {
    private static instancia: BookLoanAllow | null = null;
    private cantidadMaxima: number;
  
    private constructor() {
      this.cantidadMaxima = 0
    }
  
    static getInstancia(): BookLoanAllow {
      if (!BookLoanAllow.instancia) {
        BookLoanAllow.instancia = new BookLoanAllow();
      }
      return BookLoanAllow.instancia;
    }
  
    setCantidadMaxima(cantidad: number): void {
      if (cantidad >= 0 && Number.isInteger(cantidad)) {
        this.cantidadMaxima = cantidad;
      } else {
        console.error('La cantidad máxima de libros debe ser un entero no negativo.');
      }
    }
  
    getCantidadMaxima(): number {
      return this.cantidadMaxima;
    }
  }
  