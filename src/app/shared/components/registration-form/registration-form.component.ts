import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { EmailValidatorDirective, validateEmail } from '@app/shared/directives/email.directive';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit{  
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.buildForm();    
  }
  ngOnInit(): void {
    this.registrationForm.valueChanges.subscribe(() => {
      this.submitted = false;
    });
  }

  private readonly emailValidationRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  registrationButtonText: string = "Register";
  loginButtonText: string = "Login";
  registrationForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  @Output() login: EventEmitter<any> = new EventEmitter<any>();

  get name(){
    return this.registrationForm.get("name")!;
  }

  get email(){
    return this.registrationForm.get("email")!;
  }

  get password(){
    return this.registrationForm.get("password")!;
  }

  showLogin() {
    this.router.navigate(['login']);
  }

  onSubmit(){
    this.submitted = true;
    this.authService.register(this.registrationForm.value)
    .pipe(
      filter(response => response.successful),
      take(1),
    ).subscribe(() => {
      this.router.navigate(['courses']);
    });
  }

  buildForm(): void {
    this.registrationForm = this.fb.group({
      name: new FormControl("", [Validators.required, Validators.minLength(6)]),
      email: new FormControl("", [Validators.required, validateEmail(this.emailValidationRegex)]),
      password: new FormControl("", [Validators.required]),
    });
  }
}
