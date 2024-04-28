
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReqRes } from '../model/req-res.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8282/auth'; // Mettez l'URL de votre API Spring ici

  constructor(private http: HttpClient) { }

  signUp(signUpRequest: any): Observable<ReqRes> {
    return this.http.post<ReqRes>(`${this.baseUrl}/signup`, signUpRequest);
  }

  signIn(signInRequest: any): Observable<ReqRes> {
    return this.http.post<ReqRes>(`${this.baseUrl}/signin`, signInRequest);
  }

  refreshToken(refreshTokenRequest: any): Observable<ReqRes> {
    return this.http.post<ReqRes>(`${this.baseUrl}/refresh`, refreshTokenRequest);
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('refreshToken');
  }
  getUser(id: string){
    return this.http.get(`${this.baseUrl}/${id}`)
  }
  updateUser(id : any, prod : any){
    return this.http.put(`${this.baseUrl}/${id}`,prod);

  }
  deleteProductFromList(id : any , prod : any){
    return this.http.put(`${this.baseUrl}/deleteProd/${id}`,prod);
  }
}
