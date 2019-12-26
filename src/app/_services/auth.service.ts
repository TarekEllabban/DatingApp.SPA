import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

baseUrl = 'https://localhost:44392/api/auth/';
constructor(private http: HttpClient) { }

login(model: any) {
  return this.http.post(this.baseUrl + 'login', model)
  .pipe(
    map((response: any) => {
      const tokenResponse = response;
      if (tokenResponse.isSucceeded && tokenResponse.isSucceeded === true) {
        localStorage.setItem('token', tokenResponse.data);
      }
      return tokenResponse;
    })
  );
}

register(model: any) {
  return this.http.post(this.baseUrl + 'register', model);
}

}
