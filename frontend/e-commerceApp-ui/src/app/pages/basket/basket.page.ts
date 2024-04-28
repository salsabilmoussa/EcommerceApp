import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.page.html',
  styleUrls: ['./basket.page.scss'],
})
export class BasketPage implements OnInit {
  userId: string | null = null;
  user: any;

  constructor( private authService : AuthService) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    if(this.userId != null){
      this.authService.getUser(this.userId).subscribe(
        res=>{
          this.user=res;
        }, err =>{
          console.log(err);
        }
      );
    }
  }

}
