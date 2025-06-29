import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";

@Directive({
    selector: '[emailValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: EmailValidatorDirective,
        multi: true,
    }]
})
export class EmailValidatorDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        return validateEmail(new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/))(control);
    }
}
export function validateEmail (regex: RegExp): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
        const email = control?.value;
        const result = regex.test(email);
        return result ? null : { invalidEmail: { value: email } };
    }
}
