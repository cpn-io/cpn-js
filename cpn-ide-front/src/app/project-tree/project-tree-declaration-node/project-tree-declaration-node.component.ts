import { Component, OnInit, Input, DoCheck, SimpleChanges, OnChanges } from '@angular/core';
import { ModelService } from '../../services/model.service';
import { EventService } from '../../services/event.service';
import { Message } from '../../common/message';
import { cloneObject } from 'src/app/common/utils';
import { clearDeclarationLayout, parseDeclarartion, detectCpnDeclarartionType, parseUiDeclarartionType } from './declaration-parser';
import { getNextId, nodeToArray, arrayToNode } from '../../common/utils';

@Component({
  selector: 'app-project-tree-declaration-node',
  templateUrl: './project-tree-declaration-node.component.html',
  styleUrls: ['./project-tree-declaration-node.component.scss']
})
export class ProjectTreeDeclarationNodeComponent implements OnInit, OnChanges {

  @Input() public parentBlock: any;
  @Input() public declaration: any;
  @Input() public type: any;

  @Input() public selected: any;
  @Input() public errors: any;

  @Input() public mouseover: any = { id: undefined };

  public focused = false;

  public errorIds = [];

  constructor(private eventService: EventService, private modelService: ModelService) { }

  ngOnInit() {
    this.updateErrors();
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      // let chng = changes[propName];
      // let cur  = JSON.stringify(chng.currentValue);
      // let prev = JSON.stringify(chng.previousValue);
      // console.log(this.constructor.name, `ngOnChanges(), ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
      if (propName === 'errors') {
        this.updateErrors();
      }
    }
  }

  updateErrors() {
    this.errorIds = [];
    if (this.errors)
      for (const id in this.errors) {
        this.errorIds.push(id);
      }
    console.log(this.constructor.name, 'updateErrors(), this.errors = ', this.errors);
  }


  getText() {
    let layout = this.modelService.cpnDeclarationToString(this.type, this.declaration);

    let declarationType = parseUiDeclarartionType(layout);

    if (this.focused || declarationType === 'ml' || this.errorIds.includes(this.declaration._id)) {
      return layout;
    }

    let regex = /[^\s]+\s+[^\s^\(^\:]+/;
    let transformed = regex.exec(layout);
    return transformed && transformed.length > 0 ? transformed[0] : layout;
  }

  onUpdate(layout) {
    this.modelService.updateDeclaration(this.declaration, this.type, this.parentBlock, layout);

    // const originalLayout = layout;

    // console.log('onUpdate(), layout = ', layout);
    // console.log('onUpdate(), this.declaration = ', JSON.stringify(this.declaration));

    // const oldCpnDeclarartionType = this.type;

    // // parse declaration layout
    // let result = parseDeclarartion(layout);

    // if (result && result.cpnElement) {
    //   let newDeclaration = result.cpnElement;
    //   const newCpnDeclarartionType = result.cpnDeclarationType;

    //   console.log('onUpdate(), oldCpnDeclarartionType = ', oldCpnDeclarartionType);
    //   console.log('onUpdate(), newCpnDeclarartionType = ', newCpnDeclarartionType);

    //   this.copyDeclaration(newDeclaration, this.declaration)

    //   // move declaration cpn element from old declaration group to new, if needed
    //   if (newCpnDeclarartionType !== oldCpnDeclarartionType) {
    //     this.parentBlock = this.modelService.removeCpnElement(this.parentBlock, this.declaration, oldCpnDeclarartionType);
    //     this.parentBlock = this.modelService.addCpnElement(this.parentBlock, this.declaration, newCpnDeclarartionType);
    //   }
    // }
  }


  onSelected() {
    this.selected.parentCpnElement = this.parentBlock;
    this.selected.id = this.declaration._id;
    this.selected.type = this.type;
    this.selected.cpnElement = this.declaration;

    this.eventService.send(Message.TREE_SELECT_DECLARATION_NODE_NEW, {
      cpnType: this.type,
      cpnElement: this.declaration,
      cpnParentElement: this.parentBlock
    });
  }

  onParse(layout) {
    // layout = this.getText();
    // if (this.declaration.layout) {
    //   layout = this.declaration.layout;
    // }

    // // clear declaration layout
    // layout = clearDeclarationLayout(layout);
    // // parse declaration layout
    // let result = parseDeclarartion(layout);

    // if (result && result.cpnElement) {
    //   let newDeclaration = result.cpnElement;
    //   newDeclaration._id = this.declaration._id;
    //   this.eventService.send(Message.TREE_SELECT_DECLARATION_NODE_NEW, {
    //     cpnType: 'ml',
    //     cpnElement: newDeclaration
    //   });
    // }
  }

}
