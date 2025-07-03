import {Inject, Injectable, InjectionToken} from '@angular/core';

export const TOKEN = 'SESSION_TOKEN'; // Use this constant for the session storage entry key
// Add your code here

export const WINDOW = new InjectionToken<Window>('Window');

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
constructor(@Inject(WINDOW) private window:Window) {}

  setToken(token: string){
    if(this.window){
      this.window.sessionStorage.setItem(TOKEN, token);
    }
  }

  getToken(): string{
    const item = this.window?.sessionStorage.getItem(TOKEN)!;
    return item;
  }

  deleteToken(){
    if(this.window)
    {
      this.window.sessionStorage.removeItem(TOKEN);
    }
  }
}
