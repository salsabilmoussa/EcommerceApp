import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReqRes } from '../model/req-res.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = "http://localhost:8282/";
  constructor(private http: HttpClient) { }


  addCustomer(signUpRequest: any): Observable<ReqRes> {
    return this.http.post<ReqRes>(`${this.url}auth/signup`, signUpRequest);
  }

  addSeller(seller: any) {
    return this.http.post(`${this.url}api/sellers/`, seller);
  }

  getAllSellers() {
    return this.http.get(this.url + 'api/sellers/');
  }

  getSellers() {
    return this.http.get(this.url + 'auth/sellers');
  }

  getSellerById(sellerId: number): Observable<any> {
    return this.http.get<any>(`${this.url}api/sellers/${sellerId}`);
  }

  rejectSeller(sellerId: number): Observable<any> {
    return this.http.delete(`${this.url}api/sellers/${sellerId}`);
  }
  acceptSeller(signUpRequest: any): Observable<ReqRes> {
    return this.http.post<ReqRes>(`${this.url}auth/signup`, signUpRequest);
  }

  deleteSeller(sellerId: number): Observable<any> {
    return this.http.delete(`${this.url}auth/${sellerId}`);
  }
  


}
