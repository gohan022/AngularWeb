import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../../services/data/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') form: NgForm;

  username = 'gohan022';
  password = 'password';
  rememberMe = false;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
  }

  doLogin() {
    this.userService.getToken(this.form.value).subscribe(
      data => {
        // sessionStorage.setItem('token', data.token);
        this.router.navigate(['todos']);
      }
    );
  }
}
