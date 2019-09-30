import { Component, OnInit, Input } from '@angular/core';
import { ModelService } from '../../services/model.service';

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

  constructor(private modelService: ModelService) { }

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


  onParse(value) {

    if (this.declaration.layout) {
      value = this.declaration.layout;
    }

    console.log('onParse(), value = ', value);

    // remove line break
    value = value.replace(/\n/g, '');

    // remove multiple spaces
    value = value.replace(/\s{2,}/g, ' ');

    // remove comments
    value = value.replace(/(\(\*\s*)[^\*]+(\s*\*\))/g, '');

    console.log('onParse(), value (no comments) = ', value);

    let unitTypeResult = new RegExp(/colset\s+(?<name>\w+)\s*=\s*unit(\s+with\s+(?<new>\w+))*(\s+(?<timed>timed))*/g).exec(value);
    console.log('onParse(), unitTypeResult = ', unitTypeResult);

    let result = new RegExp(/(?<record>record)\s+(?<recordfield>[^;]+)/g).exec(value);

    if (result && result.groups) {
      if (result.groups.record && result.groups.recordfield) {
        console.log('onParse(), result.groups.record = ', result.groups.record);
        console.log('onParse(), result.groups.recordfield = ', result.groups.recordfield);

        let s = result.groups.recordfield;
        let recordfieldList = s.match(/\w+\s*\:\s*\w+/g);
        console.log('onParse(), recordfieldList = ', recordfieldList);
      }
    }
    

    // let parser = value.match(/^\w+/g);
    // console.log('onParse(), parser = ', parser);

    // let declarationType = parser && parser[0] ? parser[0] : undefined;

    // switch (declarationType) {
    //   case 'colset':
    //     try {
    //       parser = value.match(/[^=]+/g);
    //       console.log('onParse(), colset, parser = ', parser);
    //       if (parser.length === 2) {

    //         const leftPart = parser[0].trim();
    //         const rightPart = parser[1].trim();
    //         console.log('onParse(), leftPart = ', leftPart);
    //         console.log('onParse(), rightPart = ', rightPart);

    //         // try to parse list, product, record, etc...
    //         parser = rightPart.match(/(\w+){1}\s+((((\w+\s*\:\s*\w+)|(\w+))((\s*[\*\+]\s*)((\w+\s*\:\s*\w+)|(\w+)))+)|(\w+))/g);
    //         if (parser) {
    //           console.log('onParse(), try to parse list, product, record, etc..., parser = ', parser);

    //           const colsetType = parser[0].match(/^\w+/g);
    //           console.log('onParse(), colsetType = ', colsetType);
    //         }
    //       }
    //     } catch (error) {
    //       console.error('onParse(), error = ', error);
    //     }
    //     break;
    // }
  }

}
