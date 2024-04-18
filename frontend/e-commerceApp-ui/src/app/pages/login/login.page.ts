import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';

  constructor( private authService: AuthService ) { }
  onSubmit() {
    this.authService.signIn({email: this.username, password: this.password})
      .subscribe(response => {
        console.log(response);
        if (response.ourUsers) {
          localStorage.setItem('userId', response.ourUsers.id);
        }
        localStorage.setItem('token', response.token);
        localStorage.setItem('refreshToken', response.refreshToken);
        console.log(localStorage);
      },
      error => {
        // Gérer les erreurs d'authentification
        console.error('Erreur lors de l\'authentification :', error);
      }
    );
  }
  logout(){
    this.authService.logout()
    console.log(localStorage);
  }

  ngOnInit() {
    console.log(localStorage);
  }

}
