import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './components/common/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { TodoListComponent } from './components/todo/todo-list/todo-list.component';
import { TodoCreateComponent } from './components/todo/todo-create/todo-create.component';
import { TodoUpdateComponent } from './components/todo/todo-update/todo-update.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'todos', component: TodoListComponent},
  {path: 'todos/create', component: TodoCreateComponent},
  {path: 'todos/:id', component: TodoUpdateComponent},

  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
