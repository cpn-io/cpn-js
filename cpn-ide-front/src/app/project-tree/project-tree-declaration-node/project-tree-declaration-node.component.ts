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

    let parser = value.match(/^\w+/g);
    console.log('onUpdate(), parser = ', parser);

    let declarationType = parser && parser[0] ? parser[0] : undefined;

    switch (declarationType) {
      case 'colset':
        try {
          parser = value.match(/[^=]+/g);
          console.log('onUpdate(), colset, parser = ', parser);
          if (parser.length === 2) {

            const colsetLeft = parser[0].trim().match(/\w+/g);
            const colsetName = colsetLeft[1].trim();
            console.log('onUpdate(), colset, colsetName = ', colsetName);

            // for () {

            // }
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
}
