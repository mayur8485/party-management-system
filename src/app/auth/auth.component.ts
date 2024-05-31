import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authForm: any;
  errorMessage: string = "";
  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    })
  }

  signIn() {
    const authData = this.authForm.getRawValue();
    let authFormSubs!: Observable<any>
    authFormSubs = this.authService.login(authData);
    authFormSubs.subscribe((resposeData) => {
      if (resposeData) {
        this.router.navigate(['/party']);
      }
    }, errorMessage => {
      this.errorMessage = errorMessage;
    })

  }

  // signUp() {
  //   if (this.authForm.valid) {
  //     const authData = this.authForm.getRawValue();
  //     let authFormSubs!: Observable<any>
  //     authFormSubs = this.authService.signUp(authData);
  //     authFormSubs.subscribe((resposeData) => {
  //       if (resposeData) {
  //         // console.log('SignUp Success', resposeData);
  //         this.router.navigate(['/party']);
  //       }
  //     }, errorMessage => {
  //       this.errorMessage = errorMessage;
  //     })
  //   }
  // }

}
