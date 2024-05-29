import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user = new BehaviorSubject<any>(null);
    constructor(private router: Router) { }

    signUp(creds: any) {
        setTimeout(() => {
            this.user.next(creds);
            localStorage.setItem('userDetails', JSON.stringify(creds));
        }, 3000);
        return this.user;
    }

    signIn(creds: any) {
        setTimeout(() => {
            this.user.next(creds);
            localStorage.setItem('userDetails', JSON.stringify(creds));
        }, 2000);
        return this.user;
    }

    autoLogin() {
        let data = localStorage.getItem('userDetails');
        if (data) {
            const user = JSON.parse(data);
            if (user) {
                this.user.next(user);
                this.router.navigate(['/party'])
            }
        } else {
            this.router.navigate(['/auth']);
        }
    }
}