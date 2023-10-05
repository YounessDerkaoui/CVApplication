import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyStringToDash'
})
export class EmptyStringToDashPipe implements PipeTransform {

  transform(value: string): string {
    if (!value || value.trim().length == 0) {
      return '-';
    }
    return value;
  }
}
