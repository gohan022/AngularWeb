import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private headers = new HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Credentials', 'true');

  constructor(private httpClient: HttpClient) {
  }

  getToken(user): Observable<any> {
    return this.httpClient.post<any>(`${API_URL}/auth/token/generate`, user);
  }

  refreshToken(): Observable<any> {
    return this.httpClient.post(`${API_URL}/auth/token/refresh`, {});
  }

  logout(): Observable<any> {
    return this.httpClient.post(`${API_URL}/auth/token/clear`, {});
  }
}
