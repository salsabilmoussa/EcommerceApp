import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private url = "http://localhost:8282/";
  constructor(private http : HttpClient) { }

  getAllProduits() {
    return this.http.get(this.url + 'api/produits/');
  }

  createProduit(produit : any){
    return this.http.post(`${this.url}api/produits/`, produit);
  }
  
}
