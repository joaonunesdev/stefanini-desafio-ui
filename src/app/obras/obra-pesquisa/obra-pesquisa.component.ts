import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { ObraFilter, ObraService } from '../obra.service';
import { BR } from 'src/app/app.api';
import { Table } from 'primeng/components/table/table';
import { LazyLoadEvent } from 'primeng/components/common/api';

@Component({
  selector: 'app-obra-pesquisa',
  templateUrl: './obra-pesquisa.component.html'
})
export class ObraPesquisaComponent implements OnInit {

  totalRecords = 0;
  filter = new ObraFilter();
  obras: [];
  loading = true;
  obraSelecionada: any;
  locale = BR;

  @Output() rowSelectionEvent = new EventEmitter<any>();

  @ViewChild('table', {static: true}) table: Table;

  constructor(private obraService: ObraService) { }

  ngOnInit() {
  }

  search(page = 0) {
    this.loading = true;
    this.filter.page = page;

    this.obraService.search(this.filter).subscribe(response => {
      this.obras = response.obras;
      this.totalRecords = response.totalRecords;
      this.loading = false;
    });
  }

  onPageChange(event: LazyLoadEvent) {
    const page = event.first / event.rows;
    this.search(page);
  }

  triggerRowSelection() {
    this.rowSelectionEvent.emit(this.obraSelecionada);
  }

  refreshTable() {
    this.search();
    this.table.reset();
  }

}
