import { Component, ContentChild, EventEmitter, HostListener, Input, OnChanges, Output, TemplateRef, ViewChild } from '@angular/core';
import { TreeModel } from '../models/tree.model';
import { TreeDraggedElement } from '../models/tree-dragged-element.model';
import { TreeOptions } from '../models/tree-options.model';
import { TreeViewportComponent } from './tree-viewport.component';

import includes from 'lodash/includes';
import pick from 'lodash/pick';

@Component({
  selector: 'Tree, tree-root',
  providers: [TreeModel],
  styles: [],
  template: `
      <tree-viewport #viewport>
          <div
                  class="angular-tree-component"
                  [class.node-dragging]="treeDraggedElement.isDragging()"
                  [class.angular-tree-component-rtl]="treeModel.options.rtl">
              <tree-node-collection
                      *ngIf="treeModel.roots"
                      [nodes]="treeModel.roots"
                      [treeModel]="treeModel"
                      [templates]="{
            loadingTemplate: loadingTemplate,
            treeNodeTemplate: treeNodeTemplate,
            treeNodeWrapperTemplate: treeNodeWrapperTemplate,
            treeNodeFullTemplate: treeNodeFullTemplate
          }">
              </tree-node-collection>
              <tree-node-drop-slot
                      class="empty-tree-drop-slot"
                      *ngIf="treeModel.isEmptyTree()"
                      [dropIndex]="0"
                      [node]="treeModel.virtualRoot">
              </tree-node-drop-slot>
          </div>
      </tree-viewport>
  `
})
export class TreeComponent implements OnChanges {
  _nodes: any[];
  _options: TreeOptions;

  @ContentChild('loadingTemplate') loadingTemplate: TemplateRef<any>;
  @ContentChild('treeNodeTemplate') treeNodeTemplate: TemplateRef<any>;
  @ContentChild('treeNodeWrapperTemplate') treeNodeWrapperTemplate: TemplateRef<any>;
  @ContentChild('treeNodeFullTemplate') treeNodeFullTemplate: TemplateRef<any>;
  @ViewChild('viewport') viewportComponent: TreeViewportComponent;

  // Will be handled in ngOnChanges
  @Input() set nodes(nodes: any[]) {
  };

  @Input() set options(options: TreeOptions) {
  };

  @Input() set focused(value: boolean) {
    this.treeModel.setFocus(value);
  }

  @Input() set state(state) {
    this.treeModel.setState(state);
  }

  @Output() toggleExpanded;
  @Output() activate;
  @Output() deactivate;
  @Output() nodeActivate;
  @Output() nodeDeactivate;
  @Output() select;
  @Output() deselect;
  @Output() focus;
  @Output() blur;
  @Output() updateData;
  @Output() initialized;
  @Output() moveNode;
  @Output() copyNode;
  @Output() loadNodeChildren;
  @Output() changeFilter;
  @Output() event;
  @Output() stateChange;

  constructor(
    public treeModel: TreeModel,
    public treeDraggedElement: TreeDraggedElement) {

    treeModel.eventNames.forEach((name) => this[name] = new EventEmitter());
    treeModel.subscribeToState((state) => this.stateChange.emit(state));
  }

  @HostListener('body: keydown', ['$event'])
  onKeydown($event) {
    if (!this.treeModel.isFocused) return;
    if (includes(['input', 'textarea'],
      document.activeElement.tagName.toLowerCase())) return;

    const focusedNode = this.treeModel.getFocusedNode();

    this.treeModel.performKeyAction(focusedNode, $event);
  }

  @HostListener('body: mousedown', ['$event'])
  onMousedown($event) {
    function isOutsideClick(startElement: Element, nodeName: string) {
      return !startElement ? true : startElement.localName === nodeName ? false : isOutsideClick(startElement.parentElement, nodeName);
    }

    if (isOutsideClick($event.target, 'tree-root')) {
      this.treeModel.setFocus(false);
    }
  }

  ngOnChanges(changes) {
    if (changes.options || changes.nodes) {
      this.treeModel.setData({
        options: changes.options && changes.options.currentValue,
        nodes: changes.nodes && changes.nodes.currentValue,
        events: pick(this, this.treeModel.eventNames)
      });
    }
  }

  sizeChanged() {
    this.viewportComponent.setViewport();
  }
}
