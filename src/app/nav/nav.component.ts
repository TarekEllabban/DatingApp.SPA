import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  constructor(public authService: AuthService, private alertifyService: AlertifyService, private router: Router) { }

  ngOnInit() {
  }
  login() {
    this.authService.login(this.model).subscribe( (next: any) => {
      if (next.isSucceeded && next.isSucceeded === true) { 
        this.alertifyService.success('Logged in successfully');
      } else {
        this.alertifyService.error(next.message);
      }
    }
    , (error: any) => {
      this.alertifyService.error(error);
    }, () => {
      this.router.navigate(['/members']);
    });
  }
  logout() {
    localStorage.removeItem('token');
    this.alertifyService.message('Logged out');
    this.router.navigate(['/home']);
  }
  isUserLoggedIn() {
    return this.authService.loggedIn();
  }
}
