import { Component, ElementRef, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  presentingElement: HTMLElement | null = null;
  sellers: any;
  vendeurs: any;
  seller: any = {
    name: '',
    email: '',
    pic: '',
    password: '',
    role: ''
  };
  pagedSellers: any;
  currentPage: number = 1;
  sellersPerPage: number = 5;

  constructor(private elementRef: ElementRef, private sellerService: UserService
  ) {
    this.presentingElement = this.elementRef.nativeElement as HTMLElement;

  }

  ngOnInit() {
    this.getSellers(); // Appelez la méthode getSellers au lieu de this.sellerService.getSellers()
  }

  getSellers() {
    this.sellerService.getSellers().subscribe((data: any) => {
      this.vendeurs = data; // Affectez les données récupérées à la variable vendeurs
    });
  }


  getSellerRequests() {
    this.sellerService.getAllSellers().subscribe(
      res => {
        this.sellers = res;
        this.sellers.reverse();
        this.updatePage();
      },
      err => {
        console.log(err);
      }
    );
  }

  rejectSeller(sellerId: number) {
    this.sellerService.rejectSeller(sellerId).subscribe(
      () => {
        // Vous pouvez rafraîchir la liste des vendeurs après la suppression si nécessaire
        this.getSellerRequests();
      },
      err => {
        console.log('Erreur lors de la suppression du vendeur :', err);
      }
    );
  }

  getSellerById(sellerId: number): void {
    this.sellerService.getSellerById(sellerId).subscribe(
      (s: any) => {
        this.seller = s;
        console.log(this.seller); // Affiche les informations du nouveau vendeur
      },
      error => {
        console.error(error);
      }
    );
  }

  acceptSeller(sellerId: number) {
    this.getSellerById(sellerId);
    this.sellerService.acceptSeller(this.seller).subscribe(
      res => {
        this.rejectSeller(sellerId);
        this.getSellerRequests();

        console.log(res);
        window.location.reload();
      },
      err => {
        console.log(err);
      }
    );

    this.seller = {  // Initialisation de la variable seller avec des valeurs vides
      name: '',
      email: '',
      pic: '',
      password: '',
      role: ''
    };
  }

  updatePage(): void {
    const startIndex = (this.currentPage - 1) * this.sellersPerPage;
    const endIndex = startIndex + this.sellersPerPage;
    this.pagedSellers = this.sellers.slice(startIndex, endIndex);
  }


  get totalPages(): number[] {
    return Array.from({ length: Math.ceil(this.sellers.length / this.sellersPerPage) }, (_, i) => i + 1);
  }

  deleteSeller(sellerId: number) {
    this.sellerService.deleteSeller(sellerId).subscribe(
      () => {
        // Le vendeur a été supprimé avec succès, effectuez toute action supplémentaire ici si nécessaire
        console.log('Vendeur supprimé avec succès');
        this.getSellers();
      },
      error => {
        // Gérer les erreurs ici
        console.error('Erreur lors de la suppression du vendeur : ', error);
      }
    );
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



}
