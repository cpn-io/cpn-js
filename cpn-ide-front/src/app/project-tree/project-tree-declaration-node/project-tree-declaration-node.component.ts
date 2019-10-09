import { Component, OnInit, Input } from '@angular/core';
import { ModelService } from '../../services/model.service';
import { EventService } from '../../services/event.service';
import { Message } from '../../common/message';
import { cloneObject } from 'src/app/common/utils';
import { clearDeclarationLayout, parseDeclarartion } from './declaration-parser';

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

  onUpdate(layout) {
    console.log('onUpdate(), layout = ', layout);

    // parse declaration layout
    let result = this.onParseDeclaration(layout);

    if (result && result.cpnElement) {
      let newDeclaration = result.cpnElement;

      for (const key in this.declaration) {
        if (key !== '_id') {
          delete this.declaration[key];
        }
      }
      for (const key in newDeclaration) {
        if (key !== '_id') {
          this.declaration[key] = newDeclaration[key];
        }
      }

      this.eventService.send(Message.TREE_SELECT_DECLARATION_NODE_NEW, {
        cpnType: 'ml',
        cpnElement: this.declaration
      });
    }
  }

  onSelected() {
    this.selected.parentCpnElement = this.parentBlock;
    this.selected.id = this.declaration._id;
    this.selected.type = this.type;
    this.selected.cpnElement = this.declaration;
  }

  onParse(layout) {
    layout = this.getText();
    if (this.declaration.layout) {
      layout = this.declaration.layout;
    }

    // parse declaration layout
    let result = this.onParseDeclaration(layout);

    if (result && result.cpnElement) {
      let newDeclaration = result.cpnElement;
      newDeclaration._id = this.declaration._id;
      this.eventService.send(Message.TREE_SELECT_DECLARATION_NODE_NEW, {
        cpnType: 'ml',
        cpnElement: newDeclaration
      });
    }
  }

  onParseDeclaration(layout) {
    console.log('parseDeclaration(), layout = ', layout);

    // clear declaration layout
    layout = clearDeclarationLayout(layout);

    // parse declaration layout
    let result = parseDeclarartion(layout);
    console.log('parseDeclaration(), result = ', result);

    return result;
  }

}
