import { Component, EventEmitter, Output } from '@angular/core';
import { EmailValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorDirective, validateEmail } from '@app/shared/directives/email.directive';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent{
  private readonly emailValidationRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  registrationButtonText: string = "Register";
  loginButtonText: string = "Login";
  registrationForm!: FormGroup;
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
  constructor(private fb: FormBuilder) {
    this.buildForm();    
  }
  showLogin() {
    this.login.emit();
  }

  onSubmit(){
    this.submitted = true;
  }

  buildForm(): void {
    this.registrationForm = this.fb.group({
      name: new FormControl("", [Validators.required, Validators.minLength(6)]),
      email: new FormControl("", [Validators.required, validateEmail(this.emailValidationRegex)]),
      password: new FormControl("", [Validators.required]),
    });
  }
  // Use the names `name`, `email`, `password` for the form controls.
}
