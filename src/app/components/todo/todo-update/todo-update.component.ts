import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../../services/data/todo.service';
import { Todo } from '../../common/models/todo';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-update',
  templateUrl: './todo-update.component.html',
  styleUrls: ['./todo-update.component.css']
})
export class TodoUpdateComponent implements OnInit {

  id: number;
  todo: Todo;

  constructor(private todoService: TodoService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.todo = new Todo();
    this.id = this.route.snapshot.params.id;
    this.getTodo();
  }

  saveTodo() {
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
