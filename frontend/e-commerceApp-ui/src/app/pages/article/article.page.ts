import { Component, OnInit, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FileSystemFileEntry } from 'ngx-file-drop';
import { ArticleService } from 'src/app/service/article.service';
import { Article } from './Article';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {
    title: string = '';
    description: string = '';
    price: number = 0;
    quantity: number = 0;
    image: File | undefined;
    articles: Article[] = [];
    pagedArticles: Article[] = []; 
    currentPage: number = 1; 
    articlesPerPage: number = 4; 
    presentingElement: HTMLElement | null; // Define presentingElement property

  constructor(private articleService: ArticleService, private elementRef: ElementRef) {
    this.presentingElement = this.elementRef.nativeElement as HTMLElement;
  }

  ngOnInit() {
    this.getAllArticles();
  }

  getAllArticles(): void {
    this.articleService.getAllArticles()
      .subscribe(articles => {
        this.articles = articles;
        this.updatePage();
      });
  }

  updatePage(): void {
    const startIndex = (this.currentPage - 1) * this.articlesPerPage;
    const endIndex = startIndex + this.articlesPerPage;
    this.pagedArticles = this.articles.slice(startIndex, endIndex);
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

  get totalPages(): number[] {
    return Array.from({ length: Math.ceil(this.articles.length / this.articlesPerPage) }, (_, i) => i + 1);
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    this.image = file;
  }  
  // Détermine si le bouton "Previous" doit être affiché
showPreviousButton(): boolean {
  return this.currentPage > 1;
}

// Détermine si le bouton "Next" doit être affiché
showNextButton(): boolean {
  return this.currentPage < this.totalPages.length;
}


  addArticle(articleForm: NgForm) {
    articleForm.form.markAsPristine(); 
    if (articleForm.valid && this.image) {
      const title = this.title;
      const description = this.description;
      const quantity = this.quantity.toString();
      const price = this.price.toString();    

      console.log(this.image);
    
      this.articleService.addArticle(title, description, this.image, quantity, price).subscribe((data) => {
        console.log("Ajout avec succès");
        this.getAllArticles();
      });
    }
  }  
}
