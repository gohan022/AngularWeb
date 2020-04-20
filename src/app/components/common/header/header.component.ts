import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../services/auth.service';

// sweetalert2

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(public translate: TranslateService, public auth: AuthService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  ngOnInit(): void {
  }

  logout(): void {
    /*let username = this.authService.getUser.username;
    swal.fire('Logout', `Hola ${username}, has cerrado sessión con éxito!`, 'success');*/
    this.auth.logout().subscribe();
  }

}
