import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'simulationReport' })
export class SimulationReportPipe implements PipeTransform {

    transform(value: string): string {
        let transformed = value.replace(/^\n\n/g, '');
        transformed = transformed.replace(/^\nFilename/gm, 'Filename');

        if (value) {
            const regex = /Filename:.*/gm;
            let m;

            while ((m = regex.exec(value)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === regex.lastIndex) {
                    regex.lastIndex++;
                }
                
                // The result can be accessed through the `m`-variable.
                m.forEach((match, groupIndex) => {
                    // console.log(this.constructor.name, `Found match, group ${groupIndex}: ${match}`);
                    transformed = transformed.replace(match, 
                        '<span style="color:green; font-size:1.2em; font-weight:bold; text-decoration: underline;">' 
                        + match 
                        + '</span>');
                });
            }            
        }

        return transformed;
    }
}
