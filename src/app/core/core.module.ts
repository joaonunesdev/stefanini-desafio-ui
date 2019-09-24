import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast/toast.component';
import { ToastModule } from 'primeng/components/toast/toast';

@NgModule({
  declarations: [ToastComponent],
  imports: [
    CommonModule, ToastModule
  ],
  exports: [ ToastComponent ]
})
export class CoreModule { }
