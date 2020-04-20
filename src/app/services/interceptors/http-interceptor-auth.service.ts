import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpXsrfTokenExtractor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../data/user.service';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorAuthService implements HttpInterceptor {

  constructor(private cookieService: CookieService, private userService: UserService, private auth: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /* const username = 'user';
     const password = 'password';
     const basicAuthHeaderStr = 'Basic ' + window.btoa(username + ':' + password);*/

    // This request cannot be modified directly that's why request object should be clone before modifying
    /* req = req.clone({
       // headers: req.headers.append('Authorization', basicAuthHeaderStr)
       setHeaders: {
         Authorization: basicAuthHeaderStr,
         'Access-Control-Allow-Credentials': 'true'
       }
     });*/

    /*if (sessionStorage.getItem('token')) {
      req = req.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem('token')
        }
      });
    }*/

    req = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': this.cookieService.get('XSRF-TOKEN')
      },
      withCredentials: true
    });

    return next.handle(req).pipe(
      catchError((err: any) => {
          if (err.status === 401 || err.status === 403) {
            if (err.headers.get('X-AUTHENTICATION') === 'TOKEN_EXPIRED') {
              // if token is invalid/Expired
              return this.refreshToken(req, next);
            }

            this.auth.logout().subscribe();
          }

          return throwError(err);
        }
      )
    );

  }

  private refreshToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.userService.refreshToken().pipe(
      switchMap(
        response => {
          return next.handle(this.addAuthorizationHeader(request, response));
        }
      )
    );
  }

  private addAuthorizationHeader(request: HttpRequest<any>, res: HttpResponse<any>): HttpRequest<any> {
    if (res.status.toString() === 'SUCCESS') {
      // if refresh token is valid
      return request.clone({withCredentials: true});
    }

    // if refresh token is invalid
    this.auth.logout().subscribe();
  }

}
