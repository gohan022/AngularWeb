import { Component, OnInit } from '@angular/core';
import { Todo } from '../../common/models/todo';
import { Router } from '@angular/router';
import { TodoService } from '../../../services/data/todo.service';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css']
})
export class TodoCreateComponent implements OnInit {

  todo: Todo;

  constructor(private todoService: TodoService, private router: Router) {
  }

  ngOnInit(): void {
    this.todo = new Todo();
  }

  createTodo() {
    this.todoService.createTodo(this.todo).subscribe(
      data => {
        console.log(`New Todo created`);
        console.log(data);
        this.router.navigate(['todos']);
      }
    );
  }
}
