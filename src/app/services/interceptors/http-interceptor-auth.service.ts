import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorAuthService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /* const username = 'user';
     const password = 'password';
     const basicAuthHeaderStr = 'Basic ' + window.btoa(username + ':' + password);*/

    // This request cannot be modified directly that's why request object should be clone before modifying
    /* req = req.clone({
       // headers: req.headers.append('Authorization', basicAuthHeaderStr)
       setHeaders: {
         Authorization: basicAuthHeaderStr
       }
     });*/

    if (sessionStorage.getItem('token')) {
      req = req.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem('token')
        }
      });
    }

    return next.handle(req);

    // to change in response
    /*return next.handle(req).pipe(tap(
      event => {
        console.log(event.type);
        if (event.type === HttpEventType.Response) {
          console.log(event.body);
        }
      }
      )
    );*/

  }
}
