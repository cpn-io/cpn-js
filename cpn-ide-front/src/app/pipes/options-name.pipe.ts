import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'optionName'})
export class OptionsNamePipePipe implements PipeTransform {

  transform(value: string): string {

    let transformed;
    if (value.startsWith('option_')) {
      transformed = value.substring(7);
    }

    switch (transformed) {
      case 'realtimestamp':
        transformed = 'Real Timestamp';
        break;
      case 'fair_be':
        transformed = 'Binding Element Fairness';
        break;
      case 'global_fairness':
        transformed = 'Global BE Fairness';
        break;
      case 'outputdirectory':
        transformed = 'Output directory';
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
        transformed = 'Average';
        break;
      case 'repciavg':
        transformed = 'Confidence intervals for average';
        break;
      case 'repcount':
        transformed = 'Number of observations';
        break;
      case 'repfirstval':
        transformed = 'First value observed';
        break;
      case 'replastval':
        transformed = 'Last value observed';
        break;
      case 'repmax':
        transformed = 'Maximum';
        break;
      case 'repmin':
        transformed = 'Minimum';
        break;
      case 'repssquare':
        transformed = 'Sum of squares';
        break;
      case 'repssqdev':
        transformed = 'Sum of squares of deviation';
        break;
      case 'repstddev':
        transformed = 'Standard deviation';
        break;
      case 'repsum':
        transformed = 'Sum';
        break;
      case 'repvariance':
        transformed = 'Variance';
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
        transformed = 'Sum of squares of deviation';
        break;
      case 'stddev':
        transformed = 'Standard deviation';
        break;
      case 'sum':
        transformed = 'Sum';
        break;
      case 'variance':
        transformed = 'Variance';
        break;
      case 'firstupdate':
        transformed = 'Time of first update';
        break;
      case 'interval':
        transformed = 'Time interval';
        break;
      case 'lastupdate':
        transformed = 'Time of last update';
        break;
      case 'untimedavg':
        transformed = 'Average';
        break;
      case 'untimedciavg':
        transformed = 'Confidence intervals for average';
        break;
      case 'untimedcount':
        transformed = 'Number of observations';
        break;
      case 'untimedfirstval':
        transformed = 'First value observed';
        break;
      case 'untimedlastval':
        transformed = 'Last value observed';
        break;
      case 'untimedmax':
        transformed = 'Maximum';
        break;
      case 'untimedmin':
        transformed = 'Minimum';
        break;
      case 'untimedssquare':
        transformed = 'Sum of squares';
        break;
      case 'untimedssqdev':
        transformed = 'Sum of squares of deviation';
        break;
      case 'untimedstddev':
        transformed = 'Standard deviation';
        break;
      case 'untimedsum':
        transformed = 'Sum';
        break;
      case 'untimedvariance':
        transformed = 'Variance';
        break;
    }

    return transformed;
  }
}
