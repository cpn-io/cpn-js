import { Component, OnInit, Input, DoCheck, SimpleChanges, OnChanges, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ModelService } from '../../services/model.service';
import { EventService } from '../../services/event.service';
import { Message } from '../../common/message';
import { parseUiDeclarartionType } from './declaration-parser';
import { AccessCpnService } from '../../services/access-cpn.service';
import { ContextMenuComponent } from '../../context-menu/context-menu.component';

@Component({
  selector: 'app-project-tree-declaration-node',
  templateUrl: './project-tree-declaration-node.component.html',
  styleUrls: ['./project-tree-declaration-node.component.scss']
})
export class ProjectTreeDeclarationNodeComponent implements OnInit, OnChanges, AfterViewInit {

  @ViewChild('contextMenu') contextMenu: ContextMenuComponent;
  @ViewChild('editField') editField: ElementRef;

  @Input() public parentBlock: any;
  @Input() public declaration: any;
  @Input() public type: any;
  @Input() public selected: any;
  @Input() public mouseover: any = { id: undefined };

  public focused = false;

  constructor(private eventService: EventService,
    private modelService: ModelService,
    public accessCpnService: AccessCpnService) { }

  ngOnInit() {
    this.updateErrors();
  }

  ngAfterViewInit() {
    console.log(this.constructor.name, 'ngAfterViewInit(), declaration = ' + JSON.stringify(this.declaration));
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      // let chng = changes[propName];
      // let cur  = JSON.stringify(chng.currentValue);
      // let prev = JSON.stringify(chng.previousValue);
      // console.log(this.constructor.name, `ngOnChanges(), ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
      if (propName === 'errorData') {
        this.updateErrors();
      }
    }
  }

  updateErrors() {
    console.log(this.constructor.name, 'updateErrors()');
  }

  getText() {
    let layout = this.modelService.cpnDeclarationToString(this.type, this.declaration);

    let declarationType = parseUiDeclarartionType(layout);

    if (this.focused
      || declarationType === 'ml'
      || this.accessCpnService.errorIds.includes(this.declaration._id)
      || layout.startsWith('(*')) {
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
    //     this.modelService.removeCpnElement(this.parentBlock, this.declaration, oldCpnDeclarartionType);
    //     this.modelService.addCpnElement(this.parentBlock, this.declaration, newCpnDeclarartionType);
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

  onNewDeclaration() {
    console.log(this.constructor.name, 'onNewDeclaration(), declaration = ', this.declaration);

    const newDeclaration = this.modelService.newDeclaration(this.parentBlock, this.declaration, this.type);
    if (newDeclaration) {
      this.focus(newDeclaration._id);
    }
  }

  onNewBlock() {
  }

  onDeleteDeclaration() {
    this.modelService.removeCpnElement(this.parentBlock, this.declaration, this.type);
  }

  onDeclarationUp() {
    this.modelService.moveCpnElement(this.parentBlock, this.declaration, this.type, 'up');
    this.focus(this.declaration._id);
  }

  onDeclarationDown() {
    this.modelService.moveCpnElement(this.parentBlock, this.declaration, this.type, 'down');
    this.focus(this.declaration._id);
  }

  onContextMenu(event) {
    this.contextMenu.show({ x: event.clientX, y: event.clientY });
  }

  onKeyDown(event: KeyboardEvent) {
    console.log(this.constructor.name, 'onKeyDown(), event = ', event);

    if (event.shiftKey) {
      switch (event.code) {
        case 'Insert':
          event.preventDefault();
          this.onNewDeclaration();
          break;
        case 'Delete':
          event.preventDefault();
          this.onDeleteDeclaration();
          break;
        case 'ArrowUp':
          event.preventDefault();
          this.onDeclarationUp();
          break;
        case 'ArrowDown':
          event.preventDefault();
          this.onDeclarationDown();
          break;
      }
    }
  }

  focus(id) {
    setTimeout(() => {
      // const inputElem = document.getElementById(id);
      // if (inputElem) {
      //   inputElem.focus();
      // }
      this.editField.nativeElement.focus();
    }, 100);
  }
}
