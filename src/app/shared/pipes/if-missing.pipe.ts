import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ifMissing'
})
export class IfMissingPipe implements PipeTransform {

  transform(value: string, name: string): string {
    if(!value || value.length < 1){
      return name + " saknas";
    }
    return value;
  }

}
