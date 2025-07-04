import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionStorageService } from "./services/session-storage.service";
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
  ]
})
export class AuthModule { }
