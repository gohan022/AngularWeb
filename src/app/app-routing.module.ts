import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TodoListComponent } from './components/todo/todo-list/todo-list.component';
import { TodoCreateComponent } from './components/todo/todo-create/todo-create.component';
import { TodoUpdateComponent } from './components/todo/todo-update/todo-update.component';
import { LoginComponent } from './components/auth/login/login.component';
import { NotFoundComponent } from './components/common/error/not-found/not-found.component';
import { CanDeactivatedGuardService } from './services/guards/can-deactivated-guard.service';


const routes: Routes = [
  // {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'todos', component: TodoListComponent},
  {path: 'todos/create', component: TodoCreateComponent},
  {path: 'todos/:id', component: TodoUpdateComponent, canDeactivate: [CanDeactivatedGuardService]},

  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
