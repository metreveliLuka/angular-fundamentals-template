import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@app/auth/services/auth.service';
import { map } from 'rxjs';


export interface GetUserResponse{
    successful: boolean;
    result: {
        name: string;
        email: string;
        password: string;
        role: string;
        id: string;
    }
}


@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly url: string = "http://localhost:4000/users/"
    
    constructor(private client: HttpClient){}

    getUser() {
        return this.client.get<GetUserResponse>(this.url + 'me').pipe(map(resp => resp.result));
    }
}
