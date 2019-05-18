import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'colorDeclarations' })
export class ColorDeclarationsPipe implements PipeTransform {
  transform(value: string): string {
    let transformed = value;

    if (value.startsWith('globref'))
      transformed = value.replace('globref ', '<span style=\'color:blue\'>globref </span>');
    if (value.startsWith('colset'))
      transformed = value.replace('colset ', '<span style=\'color:green\'>colset </span>');
    if (value.startsWith('var'))
      transformed = value.replace('var ', '<span style=\'color:darkorange\'>var </span>');
    if (value.startsWith('val'))
      transformed = value.replace('val ', '<span style=\'color:magenta\'>val </span>');
    if (value.startsWith('fun'))
      transformed = value.replace('fun ', '<span style=\'color:red\'>fun </span>');

    return transformed;
  }
}