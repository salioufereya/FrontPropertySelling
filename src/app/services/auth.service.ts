import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserForLogin, UserForRegister } from '../models/user';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  baseUrl = 'http://localhost:5205/api';
  authUser(user: UserForLogin): Observable<any> {
    return this.http.post(this.baseUrl + '/Account/login', user);
  }

  registerUser(user: UserForRegister): Observable<any> {
    return this.http.post(this.baseUrl + '/Account/register', user);
  }
}
