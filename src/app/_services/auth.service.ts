import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

baseUrl = environment.apiUrl + 'auth/';
jwtHelper = new JwtHelperService();
decodedToken: any;
constructor(private http: HttpClient) { }

login(model: any) {
  return this.http.post(this.baseUrl + 'login', model)
  .pipe(
    map((response: any) => {
      const tokenResponse = response;
      if (tokenResponse.isSucceeded && tokenResponse.isSucceeded === true) {
        localStorage.setItem('token', tokenResponse.data);
        this.decodedToken = this.jwtHelper.decodeToken(tokenResponse.data);
      }
      return tokenResponse;
    })
  );
}

register(model: any) {
  return this.http.post(this.baseUrl + 'register', model);
}

loggedIn() {
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

}
