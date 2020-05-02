import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../services/data/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') form: NgForm;

  username = 'gohan022';
  password = 'password';
  rememberMe = false;

  constructor(private auth: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  login() {
    this.auth.doLogin(this.form.value).subscribe(
      data => {
        // sessionStorage.setItem('token', data.token);
        this.router.navigate(['todos']);
      }
    );
  }
}
