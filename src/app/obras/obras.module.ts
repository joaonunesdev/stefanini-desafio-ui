import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObraCadastroComponent } from './obra-cadastro/obra-cadastro.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { TableModule } from 'primeng/components/table/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { MessageModule } from 'primeng/components/message/message';
import { MultiSelectModule } from 'primeng/components/multiselect/multiselect';
import { ToastModule } from 'primeng/toast';
import { ObraPesquisaComponent } from './obra-pesquisa/obra-pesquisa.component';
import { ObraComponent } from './obra/obra.component';



@NgModule({
  declarations: [ ObraCadastroComponent, ObraPesquisaComponent, ObraComponent ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    CalendarModule,
    BrowserAnimationsModule,
    SelectButtonModule,
    DropdownModule,
    MessageModule,
    MultiSelectModule,
    ToastModule
  ],
  exports: [ ObraCadastroComponent, ObraPesquisaComponent ]
})
export class ObrasModule { }
