import { Component, Input } from '@angular/core';
import { TreeNode, TREE_ACTIONS, KEYS, IActionMapping } from 'angular-tree-component';

const actionMapping:IActionMapping = {
  mouse: {
    contextMenu: (tree, node, $event) => {
      $event.preventDefault();
      alert(`context menu for ${node.data.name}`);
    },
    dblClick: (tree, node, $event) => {
      if (node.hasChildren) TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
    },
    click: (tree, node, $event) => {
      $event.shiftKey
        ? TREE_ACTIONS.TOGGLE_SELECTED_MULTI(tree, node, $event)
        : TREE_ACTIONS.TOGGLE_SELECTED(tree, node, $event)
    }
  },
  keys: {
    [KEYS.ENTER]: (tree, node, $event) => alert(`This is ${node.data.name}`)
  }
};

@Component({
  selector: 'app-fulltree',
  styles: [
    `button: {
        line - height: 24px;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
        border: none;
        border-radius: 2px;
        background: #A3D9F5;
        cursor: pointer;
        margin: 0 3px;
      }`
  ],
  template: `
  <form>
    <input #filter (keyup)="filterNodes(filter.value, tree)" placeholder="filter nodes"/>
  </form>
  <div style="height: 400px; width: 300px">

    <tree-root
      #tree
      [nodes]="nodes"
      [options]="customTemplateStringOptions"
      [focused]="true"
      (onEvent)="onEvent($event)"
      
    >
      <template #treeNodeTemplate let-node>
        <span title="{{node.data.subTitle}}">{{ node.data.name }}</span>
        <span class="pull-right">{{ childrenCount(node) }}</span>
        <button (click)="go($event)">Custom Action</button>
      </template>
      <template #loadingTemplate>Loading, please hold....</template>
    </tree-root>
  </div>
  <br>
  <p>Keys:</p>
  down | up | left | right | space | enter
  <p>Mouse:</p>
  click to select | shift+click to select multi
  <p>API:</p>
  <button (click)="tree.treeModel.focusNextNode()">next node</button>
  <button (click)="tree.treeModel.focusPreviousNode()">previous node</button>
  <button (click)="tree.treeModel.focusDrillDown()">drill down</button>
  <button (click)="tree.treeModel.focusDrillUp()">drill up</button>
  <button (click)="customTemplateStringOptions.allowDrag = true">allowDrag</button>
  <p></p>
  <button
    [disabled]="!tree.treeModel.getFocusedNode()"
    (click)="tree.treeModel.getFocusedNode().toggleActivated()">
    {{ tree.treeModel.getFocusedNode()?.isActive ? 'deactivate' : 'activate' }}
  </button>
  <button
    [disabled]="!tree.treeModel.getFocusedNode()"
    (click)="tree.treeModel.getFocusedNode().toggleExpanded()">
    {{ tree.treeModel.getFocusedNode()?.isExpanded ? 'collapse' : 'expand' }}
  </button>
  <button
    [disabled]="!tree.treeModel.getFocusedNode()"
    (click)="tree.treeModel.getFocusedNode().blur()">
    blur
  </button>
  <button
    (click)="addNode(tree)">
    Add Node
  </button>
  <button
    (click)="activateSubSub(tree)">
    Activate inner node
  </button>
  <button
    (click)="tree.treeModel.expandAll()">
    Expand All
  </button>
  <button
    (click)="tree.treeModel.collapseAll()">
    Collapse All
  </button>
  <button
    (click)="activeNodes(tree.treeModel)">
    getActiveNodes()
  </button>
  `
})
export class FullTreeComponent {
  nodes: any[];
  nodes2 = [{name: 'root'}, {name: 'root2'}];
  constructor() {
  }
  ngOnInit() {
    setTimeout(() => {
      this.nodes = [
        {
          expanded: true,
          name: 'root expanded',
          subTitle: 'the root',
          children: [
            {
              name: 'child1',
              subTitle: 'a good child',
              hasChildren: false
            }, {
              name: 'child2',
              subTitle: 'a bad child',
              hasChildren: false
            }
          ]
        },
        {
          name: 'root2',
          subTitle: 'the second root',
          children: [
            {
              name: 'child2.1',
              subTitle: 'new and improved',
              hasChildren: false
            }, {
              name: 'child2.2',
              subTitle: 'new and improved2',
              children: [
                {
                  uuid: 1001,
                  name: 'subsub',
                  subTitle: 'subsub',
                  hasChildren: false
                }
              ]
            }
          ]
        },
        {
          name: 'asyncroot',
          hasChildren: true
        }
      ];

      for(let i = 0; i < 100; i++) {
        this.nodes.push({
          name: `rootDynamic${i}`,
          subTitle: `root created dynamically ${i}`,
          children: new Array(4).fill(null).map((item, n) => ({
            name: `childDynamic${i}.${n}`,
            subTitle: `child created dynamically ${i}`,
            hasChildren: false
          }))
        });
      }
    }, 1);
  }

  asyncChildren = [
    {
      name: 'child2.1',
      subTitle: 'new and improved'
    }, {
      name: 'child2.2',
      subTitle: 'new and improved2'
    }
  ];

  getChildren(node:any) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(this.asyncChildren.map((c) => {
        return Object.assign({}, c, {
          hasChildren: node.level < 5
        });
      })), 1000);
    });
  }

  addNode(tree) {
    this.nodes[0].children.push({

      name: 'a new child'
    });
    tree.treeModel.update();
  }

  childrenCount(node: TreeNode): string {
    return node && node.children ? `(${node.children.length})` : '';
  }

  filterNodes(text, tree) {
    tree.treeModel.filterNodes(text);
  }

  activateSubSub(tree) {
    // tree.treeModel.getNodeBy((node) => node.data.name === 'subsub')
    tree.treeModel.getNodeById(1001)
      .setActiveAndVisible();
  }

  customTemplateStringOptions = {
    // displayField: 'subTitle',
    isExpandedField: 'expanded',
    idField: 'uuid',
    getChildren: this.getChildren.bind(this),
    actionMapping,
    nodeHeight: 23,
    allowDrag: true,
    useVirtualScroll: true
  }
  onEvent(event) {
    console.log(event);
  }

  go($event) {
    $event.stopPropagation();
    alert('this method is on the app component');
  }

  activeNodes(treeModel) {
    console.log(treeModel.activeNodes);
  }
}
