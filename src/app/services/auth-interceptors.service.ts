import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = JSON.parse(localStorage.getItem('user')!);
        if (user) {
            const authReq = req.clone({
                setHeaders: {
                    Authorization: `Token ${user.token}`
                }
            });
            return next.handle(authReq);
        }else {
            return next.handle(req);
        }
    }
}