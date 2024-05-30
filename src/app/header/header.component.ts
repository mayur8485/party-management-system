import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  logOut() {
    this.authService.logOut();
  }

  login() {
    this.router.navigate(['auth']);
  }

  home() {
    this.router.navigate(['home']);
  }
}
