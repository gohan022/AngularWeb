import { Component, OnInit, ViewChild } from '@angular/core';
import { Todo } from '../../common/models/todo';
import { Router } from '@angular/router';
import { TodoService } from '../../../services/data/todo.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css']
})
export class TodoCreateComponent implements OnInit {
  todo: Todo;
  @ViewChild('todoForm') form: NgForm;

  constructor(private todoService: TodoService, private router: Router) {
  }

  ngOnInit(): void {
    this.todo = new Todo();
  }

  createTodo() {
    console.log(this.form);
    console.log(this.form.value);
    this.todoService.createTodo(this.todo).subscribe(
      data => {
        console.log(`New Todo created`);
        console.log(data);
        this.router.navigate(['todos']);
      }
    );
  }
}
