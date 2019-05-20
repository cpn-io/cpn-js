import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'optionName'})
export class OptionsNamePipePipe implements PipeTransform {

  transform(value: string): string {

    let transformed;
    if (value.startsWith('option_'))
      transformed = value.substring(7);

    switch (transformed) {
      case 'realtimestamp':
        transformed = 'realtimestamp';
        break;
      case 'fair_be':
        transformed = 'fair_be';
        break;
      case 'global_fairness':
        transformed = 'global_fairness';
        break;
      case 'outputdirectory':
        transformed = 'outputdirectory';
        break;
      case 'extensions.10006.enable':
        transformed = 'extensions.10006.enable';
        break;
      case 'extensions.10001.enable':
        transformed = 'extensions.10001.enable';
        break;
      case 'extensions.10003.enable':
        transformed = 'extensions.10003.enable';
        break;
      case 'extensions.10005.enable':
        transformed = 'extensions.10005.enable';
        break;
      case 'extensions.10002.enable':
        transformed = 'extensions.10002.enable';
        break;
      case 'repavg':
        transformed = 'repavg';
        break;
      case 'repciavg':
        transformed = 'repciavg';
        break;
      case 'repcount':
        transformed = 'repcount';
        break;
      case 'repfirstval':
        transformed = 'repfirstval';
        break;
      case 'replastval':
        transformed = 'replastval';
        break;
      case 'repmax':
        transformed = 'repmax';
        break;
      case 'repmin':
        transformed = 'repmin';
        break;
      case 'repssquare':
        transformed = 'repssquare';
        break;
      case 'repssqdev':
        transformed = 'repssqdev';
        break;
      case 'repstddev':
        transformed = 'repstddev';
        break;
      case 'repsum':
        transformed = 'repsum';
        break;
      case 'repvariance':
        transformed = 'repvariance';
        break;
      case 'avg':
        transformed = 'Average';
        break;
      case 'ciavg':
        transformed = 'Confidence intervals for average';
        break;
      case 'count':
        transformed = 'Number of observations';
        break;
      case 'firstval':
        transformed = 'First value observed';
        break;
      case 'lastval':
        transformed = 'Last value observed';
        break;
      case 'max':
        transformed = 'Maximum';
        break;
      case 'min':
        transformed = 'Minimum';
        break;
      case 'ssquare':
        transformed = 'Sum of squares';
        break;
      case 'ssqdev':
        transformed = 'ssqdev';
        break;
      case 'stddev':
        transformed = 'stddev';
        break;
      case 'sum':
        transformed = 'sum';
        break;
      case 'variance':
        transformed = 'variance';
        break;
      case 'firstupdate':
        transformed = 'firstupdate';
        break;
      case 'interval':
        transformed = 'interval';
        break;
      case 'lastupdate':
        transformed = 'lastupdate';
        break;
      case 'untimedavg':
        transformed = 'untimedavg';
        break;
      case 'untimedciavg':
        transformed = 'untimedciavg';
        break;
      case 'untimedcount':
        transformed = 'untimedcount';
        break;
      case 'untimedfirstval':
        transformed = 'untimedfirstval';
        break;
      case 'untimedlastval':
        transformed = 'untimedlastval';
        break;
      case 'untimedmax':
        transformed = 'untimedmax';
        break;
      case 'untimedmin':
        transformed = 'untimedmin';
        break;
      case 'untimedssquare':
        transformed = 'untimedssquare';
        break;
      case 'untimedssqdev':
        transformed = 'untimedssqdev';
        break;
      case 'untimedstddev':
        transformed = 'untimedstddev';
        break;
      case 'untimedsum':
        transformed = 'untimedsum';
        break;
      case 'untimedvariance':
        transformed = 'untimedvariance';
        break;
    }

    return transformed;
  }
}
