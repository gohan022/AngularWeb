import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../data/user.service';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorAuthService implements HttpInterceptor {

  constructor(private cookieService: CookieService, private userService: UserService, private auth: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = sessionStorage.getItem('accessToken');
    req = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authToken
      }
    });

    return next.handle(req).pipe(
      catchError((err: any) => {
          if (err.status === 401 || err.status === 400) {
            if (err.headers.get('X-AUTHENTICATION') === 'TOKEN_EXPIRED') {
              // if token is invalid/Expired
              return this.refreshToken(req, next);
            }

            this.auth.doLogout().subscribe();
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

  private addAuthorizationHeader(request: HttpRequest<any>, response): HttpRequest<any> {
    if (response.status.toString() === 'SUCCESS') {
      sessionStorage.setItem('accessToken', response.accessToken);

      // if refresh token is valid
      return request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + response.accessToken
        }
      });
    }

    // if refresh token is invalid
    this.auth.doLogout().subscribe();
  }

}
