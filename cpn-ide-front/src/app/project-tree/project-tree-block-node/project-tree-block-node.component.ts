import { Component, OnInit, Input } from '@angular/core';
import { nodeToArray, getNextId } from '../../common/utils';
import { AccessCpnService } from '../../services/access-cpn.service';
import { EventService } from '../../services/event.service';
import { ModelService } from '../../services/model.service';
import { Message } from '../../common/message';

@Component({
  selector: 'app-project-tree-block-node',
  templateUrl: './project-tree-block-node.component.html',
  styleUrls: ['./project-tree-block-node.component.scss']
})
export class ProjectTreeBlockNodeComponent implements OnInit {

  public nodeToArray = nodeToArray;

  @Input() public parentBlock: any;
  @Input() public block: any;
  @Input() public tree: any;
  @Input() showBullet = true;

  type = 'block';

  constructor(private eventService: EventService,
    private modelService: ModelService,
    public accessCpnService: AccessCpnService) { }

  ngOnInit() {
    if (this.tree && this.block && this.parentBlock) {
      this.tree.parents[this.block._id] = this.parentBlock._id;
      this.tree.cpnElements[this.block._id] = this.block;
    }
  }

  onSelected() {
    this.setSelected(this.parentBlock, this.block, this.type);
  }

  setSelected(cpnParentElement, cpnElement, type) {
    this.tree.selected.parentCpnElement = cpnParentElement;
    this.tree.selected.id = cpnElement._id;
    this.tree.selected.type = type;
    this.tree.selected.cpnElement = cpnElement;

    this.eventService.send(Message.TREE_SELECT_DECLARATION_NODE_NEW, {
      cpnType: type,
      cpnElement: cpnElement,
      cpnParentElement: cpnParentElement
    });
  }

  expand() {
    if (this.tree && this.tree.expanded) {
      this.tree.expanded[this.block._id] = true;
    }
  }

  onNewDeclaration() {
    console.log(this.constructor.name, 'onNewDeclaration(), block = ', this.block);

    const newDeclaration = this.modelService.newDeclaration(this.block, 'ml');
    if (newDeclaration) {

      // set selected to new declaration
      this.expand();
      this.setSelected(this.block, newDeclaration, 'ml');
      this.focus(newDeclaration._id);
    }
  }

  onNewBlock() {
    console.log(this.constructor.name, 'onNewBlock(), block = ', this.block);

    let parentElement = this.block;
    if (parentElement) {
      const newBlock = { id: 'New block', _id: getNextId() };
      this.modelService.addCpnElement(parentElement, newBlock, 'block');

      // set selected to new block
      this.expand();
      this.setSelected(parentElement, newBlock, 'block');
      this.focus(newBlock._id);
    }
  }

  onDeleteBlock() {
    this.modelService.removeCpnElement(this.parentBlock, this.block, this.type);
  }

  onBlockUp() {
    this.modelService.moveCpnElement(this.parentBlock, this.block, this.type, 'up');
    this.focus(this.block._id);
  }

  onBlockDown() {
    this.modelService.moveCpnElement(this.parentBlock, this.block, this.type, 'down');
    this.focus(this.block._id);
  }

  onContextMenu(event) {
    if (this.tree && this.tree.contextMenu) {
      event.preventDefault();

      const entries = [
        { title: 'New declaration', action: () => this.onNewDeclaration(), iconClass: 'fas fa-code' },
        { title: 'New block', action: () => this.onNewBlock(), iconClass: 'fas fa-cube' },
        { title: 'separator' },
        { title: 'Delete', action: () => this.onDeleteBlock(), iconClass: 'fas fa-minus' },
      ];

      this.tree.contextMenu.setEntries(entries);
      this.tree.contextMenu.show({ x: event.clientX, y: event.clientY });
    }
  }

  onKeyDown(event: KeyboardEvent) {
    console.log(this.constructor.name, 'onKeyDown(), event = ', event);

    if (event.shiftKey) {
      switch (event.code) {
        case 'Insert':
          event.preventDefault();
          this.onNewBlock();
          break;
        case 'Delete':
          event.preventDefault();
          this.onDeleteBlock();
          break;
        case 'ArrowUp':
          event.preventDefault();
          this.onBlockUp();
          break;
        case 'ArrowDown':
          event.preventDefault();
          this.onBlockDown();
          break;
      }
    }
  }

  onUpdate(event) {
    this.block.id = event.target.textContent;
  }

  focus(id) {
    setTimeout(() => {
      if (this.tree && this.tree.containerId) {

        const container = document.getElementById(this.tree.containerId);

        if (container) {
          const inputElem: any = container.querySelector('#' + id);
          if (inputElem) {
            inputElem.focus();
          }
        }
      }
    }, 100);
  }

}
