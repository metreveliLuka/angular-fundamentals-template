import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionStorageService, WINDOW } from "./services/session-storage.service";
import { AuthService } from "./services/auth.service";
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    SessionStorageService,
    AuthService,
    { provide: WINDOW, useValue: window }
  ]
})
export class AuthModule { }
