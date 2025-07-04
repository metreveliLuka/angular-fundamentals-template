import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

const TOKEN = 'SESSION_TOKEN';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  private sessionStorage: Storage;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.sessionStorage = this.document.defaultView?.sessionStorage!;
  }
  setToken(token: string){
    if(this.sessionStorage){
      this.sessionStorage.setItem(TOKEN, token);
    }
  }

  getToken(): string{
    const item = this.sessionStorage.getItem(TOKEN)!;
    return item;
  }

  deleteToken(){
    if(this.sessionStorage)
    {
      this.sessionStorage.removeItem(TOKEN);
    }
  }
}
