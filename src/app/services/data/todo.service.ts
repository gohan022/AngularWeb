import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Todo } from '../../components/common/models/todo';
import { API_URL } from '../../app.constants';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private baseUrl = `${API_URL}/users/todos`;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {
  }

  getAllTodos(params?): Observable<GetResponseTodoList> {
    return this.httpClient.get<GetResponseTodoList>(this.baseUrl, {headers: this.headers, params}).pipe(
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
    return this.httpClient.put(this.baseUrl + `/${id}`, todo);
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

interface GetResponseTodoList {
  content: Todo[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}
