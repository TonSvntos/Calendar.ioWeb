import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/ILogin';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly API = 'http://localhost:3000/pensamentos'
  constructor(private http: HttpClient) { }

  Logar(): Observable<Login>{
    return this.http.get<Login>(this.API)
  }
}
