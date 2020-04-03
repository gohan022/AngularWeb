import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../../services/data/todo.service';
import { Todo } from '../../common/models/todo';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CanComponentDeactivate } from '../../../services/guards/can-deactivated-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-update',
  templateUrl: './todo-update.component.html'
})
export class TodoUpdateComponent implements OnInit, CanComponentDeactivate {
  id: number;
  todo: Todo;
  changesSaved = false;

  constructor(private todoService: TodoService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.todo = new Todo();
    this.getTodo();
  }

  saveTodo(form: NgForm) {
    console.log(form);
    this.todoService.updateTodo(this.id, this.todo).subscribe(
      data => {
        console.log(`Update Todo ID: ${this.id}`);
        console.log(data);
        this.changesSaved = true;
      }
    );
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.changesSaved) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
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
