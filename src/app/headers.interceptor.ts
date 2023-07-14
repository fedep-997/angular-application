import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServizioService } from './servizi/servizio.service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor(private servizi: ServizioService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request);
  }

  addAuthToken(request: HttpRequest<any>) {
    const token = this.servizi.get_utenti()
  
    return request.clone({
        setHeaders: {
          Authorization: `Basic ${token}`
        }
    })
  }
  
}

