import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './data/user.service';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject(null);
  currentUser: User;

  constructor(private userService: UserService, private router: Router) {
  }

  isAuthenticated() {
    return new Promise(
      (resolve, reject) => {
        setTimeout(() => {
         // resolve(this.loggedIn);
        }, 800);
      }
    );

    /*return this.authService.user$.pipe(
      map(user => !!user),
      tap(isLogged => {
        if (!isLogged) {
          return false;
        } else {
          return true;
        }
      })
    );*/
  }

  get isLoggedIn(): boolean {
    const authToken = sessionStorage.getItem('accessToken');
    return (authToken !== null);
  }

  doLogin(user): Observable<any> {
    return this.userService.getToken(user).pipe(
      map(response => {
          // sessionStorage.setItem('currentUser', JSON.stringify(response));
          sessionStorage.setItem('accessToken', response.accessToken);
          if (response.refreshToken != null) {
            sessionStorage.setItem('refreshToken', response.refreshToken);
          }
        }
      )
    );
  }

  doLogout(): Observable<any> {
    return this.userService.removeToken().pipe(
      tap(
        res => {
          sessionStorage.removeItem('accessToken');
          sessionStorage.removeItem('refreshToken');
          this.router.navigate(['/login']);
        }
      )
    );
  }
}
