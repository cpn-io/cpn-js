import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'regex' })
export class RegexPipe implements PipeTransform {

  transform(value: string): string {

    let reg = new RegExp(/[^\s]+\s+[^\s^\(]+/);

    let transformed = reg.exec(value);

    // console.log('RegexPipe, value, transformed = ', value, transformed);

    return transformed.length > 0 ? transformed[0] : value;
  }
}
