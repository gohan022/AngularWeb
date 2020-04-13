import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Todo } from '../../components/common/models/todo';
import { API_URL } from '../../app.constants';
import { catchError, map } from 'rxjs/operators';
import { Pageable } from '../../components/common/models/pageable';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private baseUrl = `${API_URL}/user/todos`;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {
  }

  getAllTodos(searchParams?): Observable<Pageable<Todo>> {
     const params = new HttpParams({fromObject: searchParams});
    /*
    let params = new new HttpParams();
    params = searchParams?.page ? params.set('page', searchParams.page) : params;
    params = searchParams?.size ? params.set('size', searchParams.size) : params;
    */

     return this.httpClient.get<Pageable<Todo>>(this.baseUrl, {headers: this.headers, params}).pipe(
      map(responseData => {
        if (responseData.hasOwnProperty('number')) {
          responseData.number++;
        }
        return responseData;
      }),
      catchError(this.error)
    );
  }

  getTodo(id): Observable<Todo> {
    return this.httpClient.get<Todo>(this.baseUrl + `/${id}`, {headers: this.headers});
  }

  createTodo(todo) {
    return this.httpClient.post(this.baseUrl, todo);
  }

  updateTodo(id, todo) {
    return this.httpClient.put(this.baseUrl + `/${id}`, todo, {observe: 'response'});
  }

  deleteTodo(id) {
    return this.httpClient.delete(this.baseUrl + `/${id}`, {headers: this.headers});
  }

  // Handle Errors
  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
