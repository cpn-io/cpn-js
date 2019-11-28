import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'monitorName' })
export class MonitorNamePipe implements PipeTransform {

  transform(monitor: any): string {
    return monitor._name + ' <span style="color:gray">(' + monitor._typedescription + ')</span>';
  }
}
