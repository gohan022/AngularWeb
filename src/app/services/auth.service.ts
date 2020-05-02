import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './data/user.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  user$ = new BehaviorSubject(null);
  currentUser: User;

  constructor(private userService: UserService, private router: Router) {
  }

  isAuthenticated() {
    return new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.loggedIn);
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

  login() {
    this.loggedIn = true;
  }

  logout(): Observable<any> {
    return this.userService.logout().pipe(
      tap(
        res => {
          this.loggedIn = false;
          this.router.navigate(['/login']);
        }
      )
    );
  }
}
