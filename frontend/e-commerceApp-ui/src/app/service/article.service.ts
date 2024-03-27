import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../pages/article/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private httpClient: HttpClient) { }

  addArticle(title:string,description:string, fileEntry: File, quantity: string, price: string): Observable<any>{
    const formData = new FormData()
    formData.append('title', title);
    formData.append('description', description);
    formData.append('quantity', quantity);
    formData.append('price', price);
    formData.append('file', fileEntry, fileEntry.name);
    return this.httpClient.post("http://localhost:8080/api/articles", formData);
  }

  getAllArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>("http://localhost:8080/api/articles");
  }
}
