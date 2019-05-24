import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'colorDeclarations' })
export class ColorDeclarationsPipe implements PipeTransform {

  colors = {
    'globref': 'blue',
    'colset': 'green',
    'var': 'darkorange',
    'val': 'magenta',
    'fun': 'red',
    'local': 'red',
    'exception': 'red',
    'end': 'red',
    'let': 'brown',
    'in': 'brown',
    'if': 'brown',
    'else': 'brown',
    'then': 'brown',
  };

  transform(value: string): string {
    let transformed = value;

    for (const key of Object.keys(this.colors)) {
      if (value.includes(key))
        transformed = transformed.replace(new RegExp('\\b' + key + '\\b', 'gi'),
          '<span style="color:' + this.colors[key] + '">' + key + '</span>');
    }

    return transformed;
  }
}