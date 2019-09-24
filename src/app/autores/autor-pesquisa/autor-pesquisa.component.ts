import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { AutorService, AutorFilter } from '../autor.service';
import { Table } from 'primeng/components/table/table';
import { LazyLoadEvent } from 'primeng/components/common/api';
import { BR } from 'src/app/app.api';


@Component({
  selector: 'app-autor-pesquisa',
  templateUrl: './autor-pesquisa.component.html'
})
export class AutorPesquisaComponent implements OnInit {

  totalRecords = 0;
  filter = new AutorFilter();
  autores: [];
  loading = true;
  autorSelecionado: any;
  locale = BR;

  @Output() rowSelectionEvent = new EventEmitter<any>();

  @ViewChild('table', {static: true}) table: Table;

  constructor(private autorService: AutorService) { }

  ngOnInit() {
  }

  search(page = 0) {
    this.loading = true;
    this.filter.page = page;

    this.autorService.search(this.filter).subscribe(response => {
      this.autores = response.autores;
      this.totalRecords = response.totalRecords;
      this.loading = false;
    });
  }

  onPageChange(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.search(page);
  }

  triggerRowSelection() {
    this.rowSelectionEvent.emit(this.autorSelecionado);
  }

  refreshTable() {
    this.search();
    this.table.reset();
  }

}
