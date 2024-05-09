import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';

  constructor( private authService: AuthService, private router: Router ) { }
  onSubmit() {
    this.authService.signIn({email: this.username, password: this.password})
      .subscribe(response => {
        console.log(response);
        if (response.ourUsers) {
          localStorage.setItem('userId', response.ourUsers.id);
          localStorage.setItem('token', response.token);
          localStorage.setItem('refreshToken', response.refreshToken);
          if (response.ourUsers.role === 'admin') {
            this.router.navigate(['/admin']);
          } else if(response.ourUsers.role === 'customer') {
            this.router.navigate(['/']);
          }
        } else {
          // Gérer le cas où l'utilisateur n'a pas encore de compte
          alert('Your request is under process.');
        }
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

  signup(){
    this.router.navigate(['/signup']);

  }

  ngOnInit() {
    console.log(localStorage);
  }

}
