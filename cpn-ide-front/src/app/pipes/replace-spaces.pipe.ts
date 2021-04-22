import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "replaceSpaces" })
export class ReplaceSpacesPipe implements PipeTransform {
  transform(value: string): string {
    let transformed;
    if (value) {
      transformed = value.toString().replace(" ", "-");
      transformed = transformed.toLowerCase();
    }
    // console.log('ReplaceSpacesPipe.transform(), value = ' + value);
    // console.log('ReplaceSpacesPipe.transform(), transformed = ' + transformed);
    return transformed;
  }
}
