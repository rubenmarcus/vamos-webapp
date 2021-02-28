import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit = 25, ellipsis = '...'): string {
    value = value.trim();
    if ( value.length <= limit ) {
      return value;
    }

    var trimmedString = value.substr(0, limit);
    if ( trimmedString.lastIndexOf(" ") === -1 ) {
      return `${trimmedString}${ellipsis}`;
    }

    limit = value.substr(0, limit).lastIndexOf(' ');
    return `${value.substr(0, limit)}${ellipsis}`;

    // value = value.trim();
    // if (completeWords) {
    //   limit = value.substr(0, limit).lastIndexOf(' ');
    // }
    // return `${value.substr(0, limit)}${ellipsis}`;
  }

}
