import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  @Input() pagination: any; // Recibe datos de paginación
  @Output() pageChange = new EventEmitter<number>(); // Emite el cambio de página

  get start(): number {
    return this.pagination ? (this.pagination.current_page - 1) * this.pagination.per_page + 1 : 0;
  }
  
  get end(): number {
    return this.pagination ? Math.min(this.start + this.pagination.per_page - 1, this.pagination.total) : 0;
  }
  
  get pageInfo(): string {
    return this.pagination ? `Mostrando ${this.start} - ${this.end} de ${this.pagination.total} registros` : 'Cargando...';
  }
  

  prevPage(): void {
    if (this.pagination.prev_page_url) {
      this.pageChange.emit(this.pagination.current_page - 1);
    }
  }

  nextPage(): void {
    if (this.pagination.next_page_url) {
      this.pageChange.emit(this.pagination.current_page + 1);
    }
  }
}
