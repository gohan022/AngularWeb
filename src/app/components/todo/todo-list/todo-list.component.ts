import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoService } from '../../../services/data/todo.service';
import { Todo } from '../../common/models/todo';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html'
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  page = 1;
  pageSize: number;
  totalElements: number;
  queryParams = {
    page: this.page
  };
  message: string;
  error = false;
  isFetching = false;

  constructor(private todoService: TodoService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    /*if (this.route.snapshot.queryParams) {
      const queryInfo = JSON.parse(JSON.stringify(this.route.snapshot.queryParams));
      if (queryInfo.page) {
        this.page = +queryInfo.page;
      }
    }
    this.getAllTodos();*/

    this.route.queryParams.subscribe(
      (params: Params) => {
        if (params.page) {
          this.page = +params.page;
          this.queryParams = {
            ...this.queryParams,
            page: +params.page - 1
          };
        } else {
          this.page = 1;
          this.queryParams = {
            ...this.queryParams,
            page: 0
          };
        }
        this.listTodos();
      }
    );
  }

  loadPage(page: number) {
    /* this.queryParams = {
       ...this.queryParams,
       page
     };*/

    this.router.navigate(['todos'], {queryParams: {page}, queryParamsHandling: 'merge'});
  }

  updateTodo(id: number) {
    console.log(`update todo: ${id}`);
    this.router.navigate(['todos', id]);
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(
      response => {
        console.log(`delete todo: ${id}`);
        console.log(response);
        this.message = `Todo ID: ${id} deleted successfully!`;
        this.listTodos();
      }
    );
  }

  private listTodos() {
    /*if (this.queryParams.page) {
      this.queryParams = {
        ...this.queryParams,
        page: this.page - 1
      };
    }*/

    this.isFetching = true;

    // setInterval(() => {
    this.todoService.getAllTodos(this.queryParams).subscribe(
      data => {
        // console.log(data.number);
        this.todos = data.content;
        this.page = data.number;
        this.pageSize = data.size;
        this.totalElements = data.totalElements;
        this.isFetching = false;
      },
      error => {
        this.isFetching = false;
      }
    );
    // }, 3000);
  }
}
