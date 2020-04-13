import { Component, OnInit, ViewChild } from '@angular/core';
import { Todo } from '../../common/models/todo';
import { Router } from '@angular/router';
import { TodoService } from '../../../services/data/todo.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html'
})
export class TodoCreateComponent implements OnInit {
  @ViewChild('todoForm') form: NgForm;

  constructor(private todoService: TodoService, private router: Router) {
  }

  ngOnInit(): void {
  }

  createTodo() {
    console.log(this.form);
    console.log(this.form.value);
    this.todoService.createTodo(this.form.value).subscribe(
      data => {
        console.log(`New Todo created`);
        console.log(data);
        // this.form.reset();
        // this.router.navigate(['todos']);
      }
    );
  }
}
