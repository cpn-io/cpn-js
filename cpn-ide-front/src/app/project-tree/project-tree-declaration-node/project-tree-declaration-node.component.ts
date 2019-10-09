import { Component, OnInit, Input } from '@angular/core';
import { ModelService } from '../../services/model.service';
import { EventService } from '../../services/event.service';
import { Message } from '../../common/message';
import { cloneObject } from 'src/app/common/utils';
import { clearDeclarationLayout, parseDeclarartion, detectCpnDeclarartionType, parseUiDeclarartionType } from './declaration-parser';

@Component({
  selector: 'app-project-tree-declaration-node',
  templateUrl: './project-tree-declaration-node.component.html',
  styleUrls: ['./project-tree-declaration-node.component.scss']
})
export class ProjectTreeDeclarationNodeComponent implements OnInit {

  @Input() public parentBlock: any;
  @Input() public declaration: any;
  @Input() public type: any;

  @Input() public selected: any;
  @Input() public mouseover: any = { id: undefined };

  public focused = false;

  constructor(private eventService: EventService, private modelService: ModelService) { }

  ngOnInit() {
  }

  getText() {
    let layout = '';

    switch (this.type) {
      case 'globref':
        layout = this.modelService.cpnGlobrefToString(this.declaration);
        break;
      case 'color':
        layout = this.modelService.cpnColorToString(this.declaration);
        break;
      case 'var':
        layout = this.modelService.cpnVarToString(this.declaration);
        break;
      case 'ml':
        layout = this.modelService.cpnMlToString(this.declaration);
        break;
      default:
        return this.declaration.layout || JSON.stringify(this.declaration);
    }

    let declarationType = parseUiDeclarartionType(layout);

    if (this.focused || declarationType === 'ml') {
      return layout;
    }

    let regex = new RegExp(/[^\s]+\s+[^\s^\(^\:]+/);
    let transformed = regex.exec(layout);
    return transformed && transformed.length > 0 ? transformed[0] : layout;
  }

  onUpdate(layout) {
    console.log('onUpdate(), layout = ', layout);
    console.log('onUpdate(), this.declaration = ', JSON.stringify(this.declaration));

    const oldCpnDeclarartionType = this.type;

    // parse declaration layout
    let result = this.onParseDeclaration(layout);

    if (result && result.cpnElement) {
      let newDeclaration = result.cpnElement;
      const newCpnDeclarartionType = result.cpnDeclarationType;

      console.log('onUpdate(), oldCpnDeclarartionType = ', oldCpnDeclarartionType);
      console.log('onUpdate(), newCpnDeclarartionType = ', newCpnDeclarartionType);

      this.copyDeclaration(newDeclaration, this.declaration)

      // move declaration cpn element from old declaration group to new, if needed
      if (newCpnDeclarartionType !== oldCpnDeclarartionType) {
        this.parentBlock = this.modelService.removeCpnElement(this.parentBlock, this.declaration, oldCpnDeclarartionType);
        this.parentBlock = this.modelService.addCpnElement(this.parentBlock, this.declaration, newCpnDeclarartionType);
      }

      this.eventService.send(Message.TREE_SELECT_DECLARATION_NODE_NEW, {
        cpnType: 'ml',
        cpnElement: this.declaration
      });
    }
  }

  copyDeclaration(fromDeclaration, toDeclaration) {
    for (const key in toDeclaration) {
      if (key !== '_id') {
        delete toDeclaration[key];
      }
    }
    for (const key in fromDeclaration) {
      if (key !== '_id') {
        toDeclaration[key] = fromDeclaration[key];
      }
    }
  }

  onSelected() {
    this.selected.parentCpnElement = this.parentBlock;
    this.selected.id = this.declaration._id;
    this.selected.type = 'declaration';
    this.selected.cpnElement = this.declaration;
  }

  onParse(layout) {
    // layout = this.getText();
    // if (this.declaration.layout) {
    //   layout = this.declaration.layout;
    // }

    // // parse declaration layout
    // let result = this.onParseDeclaration(layout);

    // if (result && result.cpnElement) {
    //   let newDeclaration = result.cpnElement;
    //   newDeclaration._id = this.declaration._id;
    //   this.eventService.send(Message.TREE_SELECT_DECLARATION_NODE_NEW, {
    //     cpnType: 'ml',
    //     cpnElement: newDeclaration
    //   });
    // }
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
