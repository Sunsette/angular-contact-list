import { Pipe, PipeTransform } from '@angular/core';

import * as libphonenumber from 'google-libphonenumber';

const PhoneNumberFormat = libphonenumber.PhoneNumberFormat;
const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

@Pipe({
  name: 'phoneFormat'
})
export class PhoneFormatPipe implements PipeTransform {

  transform(nr: string): string {
    try {
      return phoneUtil.format(phoneUtil.parse(nr, 'SE'), PhoneNumberFormat.NATIONAL);
    } catch (e) {
      return nr;
    }
  }
}
