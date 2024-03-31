import { Component, ElementRef, OnInit } from '@angular/core';
import { ProduitService } from 'src/app/service/produit.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.page.html',
  styleUrls: ['./produit.page.scss'],
})
export class ProduitPage implements OnInit {

  produits: any;
  nouveauProduit: any = {
    title: '',
    description: '',
    imageUrl: '',
    price: '',
    quantity: ''
  };
  pagedArticles: any;
  currentPage: number = 1;
  articlesPerPage: number = 4;
  presentingElement: HTMLElement | null = null;

  constructor(
    private produitService: ProduitService,
    private elementRef: ElementRef
  ) {
    this.presentingElement = this.elementRef.nativeElement as HTMLElement;
   }

  ngOnInit() {
    this.chargerProduits();
  }

  updatePage(): void {
    const startIndex = (this.currentPage - 1) * this.articlesPerPage;
    const endIndex = startIndex + this.articlesPerPage;
    this.pagedArticles = this.produits.slice(startIndex, endIndex);
  }


  get totalPages(): number[] {
    return Array.from({ length: Math.ceil(this.produits.length / this.articlesPerPage) }, (_, i) => i + 1);
  }


  nextPage(): void {
    if (this.currentPage < this.totalPages.length) {
      this.currentPage++;
      this.updatePage();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePage();
  }

  showPreviousButton(): boolean {
    return this.currentPage > 1;
  }

  showNextButton(): boolean {
    return this.currentPage < this.totalPages.length;
  }

  chargerProduits() {
    this.produitService.getAllProduits().subscribe(
      res => {
        this.produits = res;
        console.log(res);
        this.updatePage(); // Appeler updatePage() après avoir reçu les produits
      },
      err => {
        console.log(err);
      }
    );
  }

  ajouterProduit() {
    this.produitService.createProduit(this.nouveauProduit).subscribe(
      res => {
        console.log(res);
        // Réinitialiser le modèle pour ajouter un autre produit
        this.nouveauProduit = { title: '', description: '' };
        // Recharger la liste des produits
        this.chargerProduits();
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
        // Convertir l'image en une représentation de chaîne et l'assigner à nouveauProduit.imageUrl
        this.nouveauProduit.imageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  
}
