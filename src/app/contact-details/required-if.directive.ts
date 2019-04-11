import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';
import {Directive, Input} from '@angular/core';

@Directive({
  selector: '[requiredIf]',
  providers: [
    {provide: NG_VALIDATORS, useExisting: RequiredIfDirective, multi: true}
  ]
})
export class RequiredIfDirective implements Validator {
  @Input('requiredIf')
  requiredIf: boolean;

  validate(c: AbstractControl) {

    const value = c.value;
    if ((value == null || value === undefined || value === '') && this.requiredIf) {
      return {
        requiredIf: {condition: this.requiredIf}
      };
    }
    return null;
  }

}
