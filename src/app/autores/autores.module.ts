import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutorCadastroComponent } from './autor-cadastro/autor-cadastro.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

import { RadioButtonModule } from 'primeng/components/radiobutton/radiobutton';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { TableModule } from 'primeng/components/table/table';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { MessageModule } from 'primeng/components/message/message';
import { MultiSelectModule } from 'primeng/components/multiselect/multiselect';
import { AutorPesquisaComponent } from './autor-pesquisa/autor-pesquisa.component';

import {ToastModule} from 'primeng/toast';
import { AutorComponent } from './autor/autor.component';

@NgModule({
  declarations: [AutorCadastroComponent, AutorPesquisaComponent, AutorComponent],
  imports: [
    CommonModule,
    SharedModule,
    RadioButtonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    CalendarModule,
    BrowserAnimationsModule,
    SelectButtonModule,
    DropdownModule,
    InputMaskModule,
    MessageModule,
    MultiSelectModule,
    ToastModule
  ],
  exports: [
    AutorCadastroComponent, AutorPesquisaComponent
  ]
})
export class AutoresModule { }
