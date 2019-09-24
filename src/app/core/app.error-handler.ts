import { Injectable, ErrorHandler, NgZone } from '@angular/core';
import { NotificationService } from '../shared/notification.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {
  constructor(private ns: NotificationService, private zone: NgZone) {
    super();
  }

  handleError(errorResponse: HttpErrorResponse | any) {
    if (errorResponse instanceof HttpErrorResponse) {
      this.zone.run(() => {
        this.ns.notify(
          {
            severity: 'error',
            summary: 'Erro',
            detail: errorResponse.error[0].mensagemUsuario
          } || 'Ops! Estou com dificuldades para fazer o que você pediu'
        );
      });
    }
    super.handleError(errorResponse);
  }
}
