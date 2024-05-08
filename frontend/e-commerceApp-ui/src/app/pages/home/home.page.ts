import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ProduitService } from 'src/app/service/produit.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  userId: string | null = null;
  produits: any;

  constructor(
    private authService: AuthService,
    private produitService: ProduitService
  ) { }

  
  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    if(this.userId != null){
      this.authService.getUser(this.userId).subscribe(
        res =>{
          console.log(res);
        }, err =>{
          console.log(err);
        }
      );
    }
    this.chargerProduits();
  }

  chargerProduits() {
    this.produitService.getAllProduits().subscribe(
      res => {
        this.produits = res;
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

}
