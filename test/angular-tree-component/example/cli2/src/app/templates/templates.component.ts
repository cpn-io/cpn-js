import { Component } from '@angular/core';
import { ITreeOptions } from 'angular-tree-component';

@Component({
  selector: 'app-templates',
  template: `
    <h3>Display Field</h3>
    <tree-root id="tree0" [focused]="true" [nodes]="nodes1" [options]="options0"></tree-root>

    <h3>treeNodeTemplate and loadingTemplate</h3>
    <tree-root id="tree1" [focused]="true" [nodes]="nodes1" [options]="options1">
      <template #treeNodeTemplate let-node let-index="index">
        <span [class]="node.data.className + 'Index'">{{ index }}</span>
        <span [class]="node.data.className" [class.title]="true">{{ node.data.title }}</span>
      </template>
      <template #loadingTemplate let-node>
        <div [class]="node.data.className + 'Loading'">Loading {{ node.data.title }}...</div>
      </template>
    </tree-root>

    <h3>treeNodeFullTemplate</h3>
    <tree-root id="tree2" [focused]="true" [nodes]="nodes2">
      <template #treeNodeFullTemplate let-node let-index="index" let-templates="templates">
        <div
          [class.tree-node]="true"
          [class.tree-node-expanded]="node.isExpanded && node.hasChildren"
          [class.tree-node-collapsed]="node.isCollapsed && node.hasChildren"
          [class.tree-node-leaf]="node.isLeaf"
          [class.tree-node-active]="node.isActive"
          [class.tree-node-focused]="node.isFocused">

          <input type="checkbox" [checked]="node.isActive" (change)="node.toggleActivated(true)" />
          <tree-node-expander [node]="node"></tree-node-expander>
          <div class="node-content-wrapper" (click)="node.toggleActivated(true)">
            <span [class]="node.data.className + 'Index'">{{ index }}</span>
            <span [class]="node.data.className" [class.title]="true">{{ node.data.title }}</span>
          </div>
          <tree-node-children [node]="node" [templates]="templates"></tree-node-children>
        </div>
      </template>
    </tree-root>
  `,
  styles: []
})
export class TemplatesComponent {
  nodes1 = [
    {
      title: 'root1',
      className: 'root1Class'
    },
    {
      title: 'root2',
      className: 'root2Class',
      hasChildren: true
    }
  ];

  nodes2 = [
    {
      title: 'root1',
      className: 'root1Class'
    },
    {
      title: 'root2',
      className: 'root2Class',
      children: [
        {title: 'child1', className: 'child1Class'}
      ]
    }
  ];

  options1: ITreeOptions = {
    getChildren: () => new Promise((resolve, reject) => {})
  };

  options0: ITreeOptions = {
    displayField: 'title',
    nodeClass: (node) => `${node.data.title}Class`
  };
}
