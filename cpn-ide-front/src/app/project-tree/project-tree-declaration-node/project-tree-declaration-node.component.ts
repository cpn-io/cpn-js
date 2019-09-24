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

    if (this.focused) {
      return value;
    }

    let regex = new RegExp(/[^\s]+\s+[^\s^\(^\:]+/);
    let transformed = regex.exec(value);
    return transformed.length > 0 ? transformed[0] : value;
  }

  onUpdate(value) {
    let cpnElement = this.declaration;

    const result = this.modelService.stringToCpnDeclarationElement(cpnElement, value);

    if (result) {
      this.type = result.cpnType;

      console.log(this.constructor.name, 'onUpdate(), cpnElement, value, result = ', cpnElement, value, result);
      console.log(this.constructor.name, 'onUpdate(), cpnElement (1) = ', JSON.stringify(cpnElement));
      for (const key in cpnElement) {
        delete cpnElement[key];
      }
      for (const key in result.cpnElement) {
        cpnElement[key] = result.cpnElement[key];
      }
      console.log(this.constructor.name, 'onUpdate(), cpnElement (2) = ', JSON.stringify(cpnElement));
    }
  }

  onSelected() {
    this.selected.parentCpnElement = this.parentBlock;
    this.selected.id = this.declaration._id;
    this.selected.type = this.type;
    this.selected.cpnElement = this.declaration;
  }
}
