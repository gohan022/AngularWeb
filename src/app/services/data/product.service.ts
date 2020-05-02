import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { API_URL } from '../../app.constants';
import { catchError, map } from 'rxjs/operators';
import { Pageable } from '../../models/pageable';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = `${API_URL}/api/products`;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {
  }

  getProductList(searchParams?): Observable<Pageable<Product>> {
     const params = new HttpParams({fromObject: searchParams});

     return this.httpClient.get<Pageable<Product>>(this.baseUrl, {headers: this.headers, params}).pipe(
      map(responseData => {
        if (responseData.hasOwnProperty('number')) {
          responseData.number++;
        }
        return responseData;
      }),
      catchError(this.error)
    );
  }

  // Handle Errors
  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
   // console.log(errorMessage);
    return throwError(errorMessage);
  }
}
