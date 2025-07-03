import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';
import { BehaviorSubject, map, tap } from 'rxjs';

interface UserLogin{
    email: string;
    password: string;
}

interface UserRegistration{
    name: string;
    email: string;
    password: string;
}

interface UserResponse{
    successful: boolean;
    result: string;
    user: {
        email: string,
        name: string | null,
    };
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly url = 'http://localhost:4000/';
    constructor(private client: HttpClient, private sessionStorage: SessionStorageService){
    }
    
    private isAuthorized$$ = new BehaviorSubject<boolean>(false);
    public isAuthorized$ = this.isAuthorized$$.asObservable();

    login(user: UserLogin) {
        return this.client.post<UserResponse>(this.getLoginUrl(), user).pipe(tap(obj => {
            if(obj.successful){
                this.sessionStorage.setToken(obj.result);
                this.isAuthorised = true;
            }
        }),map(resp => resp.successful));
    }

    logout() {
        return this.client.delete<HttpResponse<any>>(this.url + 'logout', { observe: 'response' })
        .pipe(map(resp => {
            if(resp.status === 200){
                this.sessionStorage.deleteToken();
                this.isAuthorised = false;
                return true;
            }
            return false;
        }));
    }

    register(user: UserRegistration) {
        return this.client.post<{successful:boolean}>(this.url + 'register', user);
    }

    get isAuthorised() {
        return this.isAuthorized$$.getValue();
    }

    set isAuthorised(value: boolean) {
        this.isAuthorized$$.next(value);
    }

    getLoginUrl() {
        return this.url + 'login';
    }
}
