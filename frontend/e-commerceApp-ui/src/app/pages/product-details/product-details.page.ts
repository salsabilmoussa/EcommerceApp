import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from 'src/app/service/produit.service';
import { AuthService } from 'src/app/service/auth.service';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  id : string ='';
  produit : any;
  userId: string | null = null;

  constructor( 
    private activatedRoute: ActivatedRoute,
    private produitService : ProduitService,
    private authService : AuthService,
    private router : Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });
    this.produitService.getProduitById(this.id).subscribe(
      res=>{
        this.produit=res;
      }, err => {
        console.log(err);
      }
    );
  }


  goBack() {
    window.history.back();
  }


  count = 1;

  increment() {
    if(this.produit.quantity>this.count){
      this.count++;
    }
  }
  decrement() {
    if(this.count>1){
      this.count--;
    }
  }

  addProduct(){
    this.userId = localStorage.getItem('userId');
    this.authService.updateUser(this.userId,this.produit).subscribe(
      res=>{
        console.log(res);
      }, err => {
        console.log(err);
      }
    );
  }
}
