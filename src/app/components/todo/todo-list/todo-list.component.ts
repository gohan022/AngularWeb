import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../../services/data/todo.service';
import { Todo } from '../../common/models/todo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: Todo[];
  message: string;
  error = false;

  constructor(private todoService: TodoService, private router: Router) {
  }

  ngOnInit(): void {
    this.getAllTodos();
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
        this.getAllTodos();
      }
    );
  }

  private getAllTodos() {
    this.todoService.getAllTodos().subscribe(
      data => this.todos = data
    );
  }
}
