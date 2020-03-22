import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../../components/common/models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private baseUrl = 'http://localhost:8080/users/todos';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {
  }

  getAllTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.baseUrl, {headers: this.headers});
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
}
