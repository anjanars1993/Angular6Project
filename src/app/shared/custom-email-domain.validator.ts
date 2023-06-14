import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomEmailDomainValidator{
    static emailDomain(domainName: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
          const email:string=control.value;
          const domain:string=email.substring(email.lastIndexOf('@')+1);
          if(email==='' || domain.toLocaleLowerCase()===domainName.toLocaleLowerCase())
          { //avoid validation if empty, we are not testing for required here
            return null;
          }
          const errors: ValidationErrors = {};
          if (email && domain.toLocaleLowerCase()!==domainName.toLocaleLowerCase()) {
            errors['emailDomain'] ={};
          }
          return Object.keys(errors).length ? errors : null;
        };
      }
}
