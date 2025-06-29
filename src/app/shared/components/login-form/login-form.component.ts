import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;
  loginText: string = "Login";
  //Use the names `email` and `password` for form controls.
  email: FormControl = new FormControl("");
  password: FormControl = new FormControl("");
  login: boolean = true;

  register(): void{
    this.login = false;
  }
  showLogin(): void{
    this.login = true;
  }

  emailIsEmpty(): boolean{
    return this.email.value ? false : true;
  }
  
  passwordIsEmpty(): boolean{
    return this.password.value ? false : true;
  }

  showEmailError(): boolean{
    return this.email.invalid ? true : false;
  }
}
