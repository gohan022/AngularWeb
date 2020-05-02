import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/data/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

class RegisterUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: RegisterUser;
  userForm: FormGroup;
  saving = false;
  langSelect: string;

  constructor(private userService: UserService, private  router: Router, private translate: TranslateService) {
    this.user = new RegisterUser();
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => this.langSelect = event.lang);
    this.initForm();
  }

  register(): void {
    if (this.userForm.valid) {
      this.saving = true;
      this.userService.register(this.userForm.value).pipe(
        finalize(() => {
          this.saving = false;
        })
      ).subscribe(
        data => {
          this.userForm.reset();
          console.log(data);
          this.router.navigate(['/login']);
        },
        error => {
          console.log(error.error.errors);
          if (error instanceof HttpErrorResponse) {
            if (error.status === 422) {
              const validationErrors = error.error.errors;

              Object.keys(validationErrors).forEach(prop => {
                const formControl = this.userForm.get(prop);
                if (formControl) {
                  formControl.setErrors({
                    serverError: validationErrors[prop].message,
                    params: {...validationErrors[prop].arguments}
                  });
                  formControl.markAsTouched();
                }
              });
            }
          }
        }
      );
    }
  }

  private initForm() {
    this.userForm = new FormGroup({
      firstName: new FormControl(this.user.firstName, Validators.required),
      lastName: new FormControl(this.user.lastName),
      username: new FormControl(this.user.username),
      email: new FormControl(this.user.email),
      /*password: new FormControl(this.user.password),
      confirmPassword: new FormControl(this.user.confirmPassword)*/
    });
  }

}
