import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: String = 'http://45.40.137.37:1337';

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {

    let body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    return this.http.post<any>(`${this.baseUrl}/login`, body.toString(), { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') })
    .pipe(map(data => {
      localStorage.setItem('userToken', JSON.stringify(data.token));
      return data;
    }))
    .pipe( catchError(e => {
      return throwError(e);
    }));

  }

  logout() {
    localStorage.removeItem('userToken');
  }

  isAuthenticated(): Boolean {
    return !!localStorage.getItem('userToken');
  }

}
