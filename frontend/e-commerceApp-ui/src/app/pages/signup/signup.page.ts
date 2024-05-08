import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  password: string = '';
  confirmPassword: string = '';
  passwordMismatch: boolean = false;
  newUser: any = {
    name: '',
    email: '',
    pic: '',
    password: '',
    role: ''
  };

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['/login']);
  }

  validatePasswords() {
    this.passwordMismatch = this.password !== this.confirmPassword;
  }

  onSubmit() {
    this.validatePasswords();
    if (!this.passwordMismatch) {
      if (this.newUser.role == "customer") {
        this.addCustomer();
        this.router.navigate(['/login']);
      }
      else {
        this.addSeller();
        this.router.navigate(['/login']);

      }
      this.newUser = {
        name: '',
        email: '',
        pic: '',
        password: '',
        role: ''
      };
      this.confirmPassword = '';
      // Réinitialiser la valeur du champ de fichier après la soumission du formulaire
      const inputElement: HTMLInputElement = document.getElementById('image') as HTMLInputElement;
      if (inputElement) {
        inputElement.value = ''; // Réinitialisation à une chaîne vide
      }
    }
  }

  addCustomer() {

    this.userService.addCustomer(this.newUser).subscribe(
      res => {

        console.log(res);

      },
      err => {
        console.log(err);
      }
    );
  }

  addSeller() {

    this.userService.addSeller(this.newUser).subscribe(

      res => {

        console.log(res);

      },
      err => {
        console.log(err);
      }
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // Vérifier que reader.result est bien de type string avant de l'assigner à newUser.pic
        if (typeof reader.result === 'string') {
          this.newUser.pic = reader.result;
        }
      };
      reader.onerror = (error) => {
        console.error('Erreur de lecture du fichier:', error);
      };
      reader.readAsDataURL(file);
    }
  }




}
