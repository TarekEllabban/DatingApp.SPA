import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
constructor(private http: HttpClient) { }

getUsers(): Observable<User[]> {
  return this.http.get<User[]>(environment.apiUrl + 'users');
}

getUser(id: number): Observable<User> {
  return this.http.get<User>(environment.apiUrl + 'users/' + id);
}

}
