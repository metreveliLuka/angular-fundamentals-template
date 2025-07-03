import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { filter, take, tap } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  constructor(private authService: AuthService, private router: Router) {}

  @ViewChild("loginForm") public loginForm!: NgForm;
  loginText: string = "Login";
  
  email: string = "";
  password: string = "";

  onSubmit(): void {
    if(this.loginForm.valid){
      this.authService
      .login(this.loginForm.value)
      .pipe(
        filter(responseStatus => responseStatus),
        take(1),
      ).subscribe((result) => {
        if(result){
          this.router.navigate(['courses']);
        }
      });
    }
  }

  register(): void{
    this.router.navigate(['registration']);
  }
}
