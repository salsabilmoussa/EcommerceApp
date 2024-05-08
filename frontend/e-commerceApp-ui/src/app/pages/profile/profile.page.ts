import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';



interface Product {
  description : ''
  id : ''
  imageUrl : ''
  ownerId : ''
  price : ''
  quantity : ''
  title : ''
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
 
  userId: string | null = null;
  user: any;
  testList : boolean = true;

  products : Product[] =[];

  isSelected = {
    profile: true,
    bag: false
  };

  activeTab(tab: string,autre: string) {
    this.isSelected = { ...this.isSelected, [tab]: true };
    this.isSelected = { ...this.isSelected, [autre]: false };
  }

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    if(this.userId != null){
      this.authService.getUser(this.userId).subscribe(
        res =>{
          this.user = res;
          this.products = this.user.products;
          if(this.products.length == 0){
            this.testList = false
          }
        }, err =>{
          console.log(err);
        }
      );
    }
  }
  deleteProd(prod : any){
    this.products = this.products.filter(product => product.id !== prod.id);
    this.authService.deleteProductFromList(this.userId,prod).subscribe(
      res =>{
      }, err => {
        console.log(err);
      }
    );
  }

}
