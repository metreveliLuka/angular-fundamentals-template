import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { catchError, Observable, pipe, tap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SessionStorageService } from '../services/session-storage.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private sessionStorage: SessionStorageService, private authService: AuthService, private router: Router) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.sessionStorage.getToken();
        if(token){
            return next.handle(req.clone({setHeaders: {
                Authorization: token,
            }})).pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 401) {
                        this.authService.logout();
                        this.router.navigate(['login']);
                    }
                    return throwError(() => error);
                })
            );
        } else {
            return next.handle(req);
        }
    }
}
