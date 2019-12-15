import { Component, OnInit } from '@angular/core';
import { log } from 'util';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  login() {
    this.authService.login(this.model).subscribe( (next: any) => {
      if (next && next === true) {
      console.log('Suceedded');
      } else {
        console.log('Failed');
      }
    }
    , (error: any) => {
      console.log('Failed');
    });
  }
  logout() {
    localStorage.removeItem('token');
    console.log('User Loggedout');
  }
  isUserLoggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
