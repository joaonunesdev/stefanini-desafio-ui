import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, Injector, NgModule } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authRequest = request.clone({
      setHeaders: { Authorization: `Basic ZGVzYWZpbzpkZXNhZmlvMTIz` }
    });

    return next.handle(authRequest);
  }
}

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true
    }
  ]
})
export class Interceptor {}
