import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutoresModule } from './autores/autores.module';
import { ObraService } from './obras/obra.service';
import { AutorService } from './autores/autor.service';
import { SharedModule } from './shared/shared.module';
import { MessageService } from 'primeng/components/common/api';
import { NotificationService } from './shared/notification.service';
import { CoreModule } from './core/core.module';
import { ApplicationErrorHandler } from './core/app.error-handler';
import { ObrasModule } from './obras/obras.module';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { FormsModule } from '@angular/forms';
import { Interceptor } from './auth/interceptor.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AutoresModule,
    ObrasModule,
    SharedModule,
    CoreModule,
    SelectButtonModule,
    FormsModule,
    Interceptor
  ],
  providers: [
    ObraService,
    AutorService,
    MessageService,
    NotificationService,
    { provide: ErrorHandler, useClass: ApplicationErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
