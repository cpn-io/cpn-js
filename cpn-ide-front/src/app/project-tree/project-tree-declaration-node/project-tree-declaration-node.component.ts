import { Component, OnInit, Input } from '@angular/core';
import { ModelService } from '../../services/model.service';
import { EventService } from '../../services/event.service';
import { Message } from '../../common/message';
import { cloneObject } from 'src/app/common/utils';
import { clearDeclarationLayout, parseColsetDeclaration, parseDeclarartion } from './declaration-parser';

@Component({
  selector: 'app-project-tree-declaration-node',
  templateUrl: './project-tree-declaration-node.component.html',
  styleUrls: ['./project-tree-declaration-node.component.scss']
})
export class ProjectTreeDeclarationNodeComponent implements OnInit {

  @Input() public parentBlock: any;
  @Input() public declaration: any;
  @Input() public type: string;

  @Input() public selected: any;
  @Input() public mouseover: any = { id: undefined };

  public focused = false;

  constructor(private eventService: EventService, private modelService: ModelService) { }

  ngOnInit() {
  }

  getText() {
    let value = '';

    switch (this.type) {
      case 'globref':
        value = this.modelService.cpnGlobrefToString(this.declaration);
        break;
      case 'color':
        value = this.modelService.cpnColorToString(this.declaration);
        break;
      case 'var':
        value = this.modelService.cpnVarToString(this.declaration);
        break;
      case 'ml':
        value = this.modelService.cpnMlToString(this.declaration);
        break;
      default:
        return this.declaration.layout || JSON.stringify(this.declaration);
    }

    let declarationType = this.modelService.parseDeclarationTypeFromString(value);

    if (this.focused || declarationType === 'ml') {
      return value;
    }

    let regex = new RegExp(/[^\s]+\s+[^\s^\(^\:]+/);
    let transformed = regex.exec(value);
    return transformed && transformed.length > 0 ? transformed[0] : value;
  }

  onUpdate(value) {

    console.log('onUpdate(), value = ', value);


    // remove line break
    value = value.replace(/\n/g, '');

    // remove multiple spaces
    value = value.replace(/\s{2,}/g, ' ');

    // remove comments
    value = value.replace(/(\(\*\s*)[^\*]+(\s*\*\))/g, '');

    console.log('onUpdate(), value (no comments) = ', value);

    let parser = value.match(/^\w+/g);
    console.log('onUpdate(), parser = ', parser);

    let declarationType = parser && parser[0] ? parser[0] : undefined;

    switch (declarationType) {
      case 'colset':
        try {
          parser = value.match(/[^=]+/g);
          console.log('onUpdate(), colset, parser = ', parser);
          if (parser.length === 2) {

            const leftPart = parser[0].trim();
            const rightPart = parser[1].trim();
            console.log('onUpdate(), leftPart = ', leftPart);
            console.log('onUpdate(), rightPart = ', rightPart);

            // try to parse list, product, record, etc...
            parser = rightPart.match(/(\w+){1}\s+((((\w+\s*\:\s*\w+)|(\w+))((\s*[\*\+]\s*)((\w+\s*\:\s*\w+)|(\w+)))+)|(\w+))/g);
            if (parser) {
              console.log('onUpdate(), try to parse list, product, record, etc..., parser = ', parser);

              const colsetType = parser[0].match(/^\w+/g);
              console.log('onUpdate(), colsetType = ', colsetType);
            }
          }
        } catch (error) {
          console.error('onUpdate(), error = ', error);
        }
        break;
    }



    // let cpnElement = this.declaration;

    // const result = this.modelService.stringToCpnDeclarationElement(cpnElement, value);

    // if (result) {
    //   this.type = result.cpnType;

    //   console.log(this.constructor.name, 'onUpdate(), cpnElement, value, result = ', cpnElement, value, result);
    //   console.log(this.constructor.name, 'onUpdate(), cpnElement (1) = ', JSON.stringify(cpnElement));
    //   for (const key in cpnElement) {
    //     delete cpnElement[key];
    //   }
    //   for (const key in result.cpnElement) {
    //     cpnElement[key] = result.cpnElement[key];
    //   }
    //   console.log(this.constructor.name, 'onUpdate(), cpnElement (2) = ', JSON.stringify(cpnElement));
    // }
  }

  onSelected() {
    this.selected.parentCpnElement = this.parentBlock;
    this.selected.id = this.declaration._id;
    this.selected.type = this.type;
    this.selected.cpnElement = this.declaration;
  }


  onParse(layout) {

    const parserRegexList = {
      parseType: /colset\s+(?<name>\w+)\s*=\s*(?<type>\w+)/g
      // unitType:   /colset\s+(?<name>\w+)\s*=\s*(?<type>unit)\s*(?<with>with)*\s*(?<newUnit>\w+)*\s*(?<timed>timed)*/g,
      // stringType: /colset\s+(?<name>\w+)\s*=\s*(?<type>string)\s*(?<with>with)*\s*(?<range>\S+\.\.\S+)*\s*(?<and>and)*\s*(?<timed>timed)*/g
    }

    layout = this.getText();
    if (this.declaration.layout) {
      layout = this.declaration.layout;
    }

    console.log('onParse(), value = ', layout);

    // clear declaration layout
    layout = clearDeclarationLayout(layout);

    let result = parseDeclarartion(layout);
    console.log('onParse(), result = ', result);

    // result = parseColsetDeclarartion(layout);
    // console.log('onParse(), result = ', result);

    // for (const parserKey in parserRegexList) {
    //   const regex = parserRegexList[parserKey];

    //   const str = layout;
    //   let m;

    //   console.log('onParse(), --------------------------------------------------------------------');
    //   console.log('onParse(), str, regex = ', str, regex);
    //   while ((m = regex.exec(str)) !== null) {
    //     console.log('onParse(), m.groups = ', m.groups);
    //     if (m.groups) {
    //       for (const key in m.groups) {
    //         if (m.groups[key]) {
    //           console.log(`onParse(), ${key} = ${m.groups[key]}`);
    //         }
    //       }
    //     }

    //     // // This is necessary to avoid infinite loops with zero-width matches
    //     // if (m.index === regex.lastIndex) {
    //     //   regex.lastIndex++;
    //     // }
    //   }
    //   console.log('onParse(), --------------------------------------------------------------------');
    // }

    let newDeclaration = this.declaration;

    if (result && result.cpnElement) {
      newDeclaration = result.cpnElement;
      newDeclaration._id = this.declaration._id;
    }

    this.eventService.send(Message.TREE_SELECT_DECLARATION_NODE_NEW, {
      cpnType: 'ml',
      cpnElement: newDeclaration
    });
  }

}
