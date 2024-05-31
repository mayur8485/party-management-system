import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user = new BehaviorSubject<any>(null);
    tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router) { }

    saveCreds(creds: any) {
        this.user.next(creds);
        localStorage.setItem('user', JSON.stringify(creds));
    }

    login(creds: any) {
        const formData = new FormData();
        formData.append("username", creds.username);
        formData.append("password", creds.password);

        return this.http.post('https://ap.greatfuturetechno.com/login/', formData).pipe(catchError(this.handleError), tap(
            respData => { this.saveCreds(respData) }
        ))
    }

    autoLogin() {
        let data = localStorage.getItem('user');
        if (data) {
            const user = JSON.parse(data);
            if (user) {
                this.user.next(user);
                this.router.navigate(['/party'])
            }
        } else {
            this.router.navigate(['/home']);
        }
    }

    clearLocalStorage() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('user');
    }

    logOut() {
        this.http.request('post', 'https://ap.greatfuturetechno.com/logout/').subscribe((res) => { console.log(res) });
        this.clearLocalStorage();
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occur';
        switch (errorRes.error.msg) {
            case "Invalid Password":
                errorMessage = "Invalid Password";
                break;
            case "Invalid Username":
                errorMessage = "Invalid Username";
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'Oops!.. Wrong password';
                break;
            case 'INVALID_LOGIN_CREDENTIALS':
                errorMessage = 'Invalid login credentials'
                break;
            case 'ADMIN_ONLY_OPERATION':
                errorMessage = 'Please use provided creds'
                break;
            case 'EMAIL_EXISTS':
                errorMessage = 'Email already exists'
                break;
        }

        return throwError(errorMessage);
    }
}