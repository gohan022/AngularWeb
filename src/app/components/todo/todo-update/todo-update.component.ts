import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../../services/data/todo.service';
import { Todo } from '../../common/models/todo';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todo-update',
  templateUrl: './todo-update.component.html'
})
export class TodoUpdateComponent implements OnInit {
  id: number;
  todo: Todo;

  constructor(private todoService: TodoService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getTodo();
  }

  saveTodo(form: NgForm) {
    console.log(form);
    this.todoService.updateTodo(this.id, this.todo).subscribe(
      data => {
        console.log(`Update Todo ID: ${this.id}`);
        console.log(data);
      }
    );
  }

  private getTodo() {
    this.todoService.getTodo(this.id).subscribe(
      response => {
        this.todo = response;
        console.log(response);
      }
    );
  }
}
