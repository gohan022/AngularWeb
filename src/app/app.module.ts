import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TodoListComponent } from './components/todo/todo-list/todo-list.component';
import { TodoUpdateComponent } from './components/todo/todo-update/todo-update.component';
import { TodoCreateComponent } from './components/todo/todo-create/todo-create.component';
import { HttpInterceptorAuthService } from './services/interceptors/http-interceptor-auth.service';
import { LoginComponent } from './components/auth/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { NgbAlertModule, NgbDatepickerModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NotFoundComponent } from './components/common/error/not-found/not-found.component';
import { UnauthorizedComponent } from './components/common/error/unauthorized/unauthorized.component';
import { LoggingInterceptorService } from './services/interceptors/logging-interceptor.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ParamsTranslatePipe } from './params-translate.pipe';
import { MyMissingTranslationHandler } from './missing-transalation';
import { ErrorIntercept } from './services/interceptors/ErrorIntercept.service';

@NgModule({
  declarations: [
    AppComponent,
    ParamsTranslatePipe,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DashboardComponent,
    TodoListComponent,
    TodoUpdateComponent,
    TodoCreateComponent,
    LoginComponent,
    UserListComponent,
    NotFoundComponent,
    UnauthorizedComponent,
    ProductListComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbDatepickerModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      },
      missingTranslationHandler: { provide: MissingTranslationHandler, useClass: MyMissingTranslationHandler}
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptorService,
      multi: true
    },
     {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorIntercept,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorAuthService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
