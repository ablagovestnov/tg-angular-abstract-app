import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retrieveLaunchParams } from '@tma.js/sdk';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { initDataRaw } = retrieveLaunchParams();
    // Клонируем запрос и добавляем новый заголовок
    const authReq = req.clone({
      setHeaders: {
        Authorization: `tma ${initDataRaw}`
      }
    });
    // Передаем клонированный запрос дальше в цепочке
    return next.handle(authReq);
  }
}
