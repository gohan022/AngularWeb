import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../../app.constants';
import { User } from '../../models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // public currentUser: Observable<User>;

  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {
  }

  register(user): Observable<any> {
    return this.httpClient.post(`${API_URL}/register`, user);
  }

  getToken(user): Observable<any> {
    return this.httpClient.post<any>(`${API_URL}/auth/token/generate`, user);
  }

  refreshToken(): Observable<any> {
    const token = sessionStorage.getItem('refreshToken');
    return this.httpClient.post(`${API_URL}/auth/token/refresh`, {token});
  }

  removeToken(): Observable<any> {
    return this.httpClient.post(`${API_URL}/auth/token/clear`, {});
  }

  // Handle Errors
  /*error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // console.log(errorMessage);
    return throwError(errorMessage);
  }*/
}
