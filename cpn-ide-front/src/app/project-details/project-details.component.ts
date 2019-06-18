import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Message } from '../common/message';
import { EventService } from '../services/event.service';
import { TabsContainer } from '../../lib/tabs/tabs-container/tabs.container';
import { ProjectService } from '../services/project.service';
import { ModelService } from '../services/model.service';
import { SettingsService } from '../services/settings.service';
import { AccessCpnService } from '../services/access-cpn.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {

  declarations = [];
  declarationNodes = [];
  selectedNode: any = {};
  editableNode;

  currentPojectModel;
  selectedBlock = undefined;
  countNewItems = 0;
  showTable = 'not';
  paramsTypes = ['ml', 'color', 'var', 'globref'];

  // error identificators
  errorIds = [];

  @ViewChild('tabsComponent') tabsComponent: TabsContainer;


  // globref, colset, var, val, fun, monitors

  tabList = [
    { id: 'all', name: 'BatchOrdering' },
    { id: 'globref', name: 'Globref' },
    { id: 'colset', name: 'Color' },
    { id: 'var', name: 'Var' },
    { id: 'val', name: 'Val' },
    { id: 'fun', name: 'Fun' },
  ];


  constructor(
    private eventService: EventService,
    private settings: SettingsService,
    private projectService: ProjectService,
    private modelService: ModelService,
    private accessCpnService: AccessCpnService
  ) {
  }

  ngOnInit() {

    const self = this;

    // Subscribe on project load event
    // this.eventService.on(Message.PROJECT_LOAD, (event) => {
    //   console.log('ProjectDetailsComponent. Message.PROJECT_LOAD, event -> ', event);

    //   if (event.project) {
    //     this.loadProjectData(event.project);
    //     this.currentPojectModel = event.project;
    //   }
    // });

    this.eventService.on(Message.PROJECT_LOAD, (event) => {
      if (event.project) {
        this.loadProject(event.project);
      }
    });

    this.eventService.on(Message.OPEN_DECLARATION_BLOCK, (data) => {
      const tab = this.tabsComponent.tabs.find(e => e.id === data.id);
      if (tab) {
        const oldSelectedTab = this.tabsComponent.getSelectedTab();
        if (oldSelectedTab && !this.paramsTypes.includes(oldSelectedTab.id)) {
          oldSelectedTab.isHidden = true;
        }
        this.tabsComponent.selectTab(tab);
        tab.isHidden = false;
        // let newSelectedTab = document.getElementById(tab.id);
        // if(newSelectedTab) newSelectedTab.hidden = false;
      }
    });

    this.eventService.on(Message.SELECT_DECLARATION_NODE, (event) => {
      if (event && event.sender !== self) {
        this.selectDeclarationNode(event);
      }
    });

    this.eventService.on(Message.DECLARATION_CHANGED, (event) => {
      if (event.cpnElement && event.newTextValue) {
        this.updateNodeByCpnElement(event.cpnElement, event.newTextValue);
      }
    });

    // Get error identificators
    this.eventService.on(Message.SERVER_INIT_NET_DONE, (event) => {
      this.errorIds = [];
      for (const id of Object.keys(this.accessCpnService.getErrorData())) {
        this.errorIds.push(id);
      }

      // expand error nodes
      // for (const id of this.errorIds) {
      //   this.expandParentNode(id);
      // }
    });

  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  isError(id: any) {
    // console.log('isError(), errorIds, id = ', this.errorIds, id);
    return this.errorIds.includes(id);
  }

  selectDeclarationNode(event) {
    if (event.cpnElement && event.declarationType) {
      // event.cpnElement;
      // event.declarationType;
    }
  }


  /**
   * Clear tree component
   */
  clear() {
  }

  createDeclarationsNodes(cpnElement) {
    console.log('createDeclarationsNodes(), cpnElement = ', cpnElement);

    const declarationsNodes = [];

    const blockElement = cpnElement.block ? cpnElement.block : cpnElement;
    const blockArray = blockElement instanceof Array ? blockElement : [blockElement];
    for (const block of blockArray) {
      for (const decl of this.createBlockDeclarationNodes(cpnElement, block)) {
        declarationsNodes.push(decl);
      }
    }

    return declarationsNodes;
  }

  createBlockDeclarationNodes(cpnParentElement, cpnElement) {
    // console.log(this.constructor.name, 'createBlockDeclarationNodes(), cpnElement = ', cpnElement);

    let blockDeclarationsNodes = [];

    const blockNode: any = {};
    if (cpnElement) {
      blockNode.cpnParentElement = cpnParentElement;
      blockNode.cpnElement = cpnElement;
      blockNode.id = cpnElement._id;
      blockNode.text = blockNode.name = cpnElement.id;
      blockNode.type = 'block';
    }
    blockDeclarationsNodes.push(blockNode);

    for (const key of ['block', 'globref', 'color', 'var', 'ml']) {
      if (cpnElement[key]) {
        const childCpnElementArray = cpnElement[key] instanceof Array ? cpnElement[key] : [cpnElement[key]];
        for (const item of childCpnElementArray) {
          blockDeclarationsNodes.push(this.createDeclarationNode(cpnElement, item, key));
        }
      }
    }

    // console.log('createBlockDeclarationNodes(), blockDeclarationsNodes = ', blockDeclarationsNodes);
    // if (blockDeclarationsNodes.length < 2) {
    //   blockDeclarationsNodes = [];
    // }

    return blockDeclarationsNodes;
  }

  /**
   * Get declaration node creator
   * @param key - key of declaration block
   * @param cpnElement - cpn JSON object
   * @returns - tree node for corresponding key
   */
  createDeclarationNode(cpnParentElement, cpnElement, key) {
    let declarationNode: any = {};
    declarationNode.cpnParentElement = cpnParentElement;
    declarationNode.cpnElement = cpnElement;
    declarationNode.id = cpnElement._id;
    declarationNode.text = declarationNode.name = this.settings.getAppSettings()['declaration'];

    if (cpnElement && key) {
      switch (key) {
        case 'block':
          declarationNode = this.createBlockDeclarationNodes(cpnParentElement, cpnElement);
          declarationNode.type = 'block';
          break;

        case 'globref':
        case 'color':
        case 'var':
        case 'ml':
          const text = this.modelService.cpnDeclarationElementToString(cpnElement, key);
          declarationNode.text = text;
          declarationNode.name = cpnElement.layout;
          declarationNode.type = 'declaration';
          declarationNode.cpnType = key;
          declarationNode.declarationType = this.modelService.parseDeclarationTypeFromString(text);
          break;
      }
    }
    declarationNode.editable = true;
    declarationNode.actions = ['block', 'declaration', 'delete'];
    return declarationNode;
  }


  /**
   * Loading project JSON to tree component object
   * @param project - cpn net JSON object
   */
  loadProject(project) {
    const projectData = project;
    const projectName = project.name;

    this.clear();

    const cpnet = this.modelService.getCpn(); // this.getCpnetElement(projectData);
    if (!cpnet) {
      return;
    }

    console.log('loadProject(), cpnet = ', cpnet);

    // Create project Declarations nodes
    if (cpnet.globbox) {
      this.declarationNodes = this.createDeclarationsNodes(cpnet.globbox);

      console.log(this.constructor.name, 'loadProject(), this.declarationNodes = ', this.declarationNodes);
    }
  }


  getNodes(tabId) {
    let nodes = [];

    switch (tabId) {
      case 'all':
        nodes = this.declarationNodes;
        break;
      default:
        nodes = this.declarationNodes.filter(node => node.type === 'block' || node.declarationType === tabId);
        break;
    }

    return nodes;
  }


  /**
   * Adding new node to the tree
   *
   * @param node - tree node object (in terms of tree model)
   * @param type - type of adding element
   */
  onAddNode(node, type) {
    console.log('onAddNode(), node = ', node, ', addingElement = ', type);

    let cpnElement, newNode;

    let cpnParentElement = node.cpnElement;
    if (['declaration', 'page'].includes(node.type)) {
      if (!node.cpnParentElement) {
        console.error('onAddNode(), ERROR: Fail to get parent node for treeNode = ', node);
        return;
      }
      cpnParentElement = node.cpnParentElement;
    }

    const defValue = this.settings.getAppSettings()[type];

    let cpnType;

    switch (type) {
      case 'declaration':
        cpnElement = this.modelService.createCpnDeclaration(defValue);
        newNode = this.createDeclarationNode(cpnParentElement, cpnElement, undefined);
        cpnType = newNode.declarationType;
        break;
    }

    this.addCreatedNode(node, newNode, cpnElement, cpnType, cpnParentElement, true);
  }


  addCreatedNode(node, newNode, cpnElement, cpnType, cpnParentElement, gotoEdit = false) {
    console.log('onAddNode(), cpnType = ', cpnType);
    console.log('onAddNode(), cpnParentElement = ', cpnParentElement);
    console.log('onAddNode(), cpnElement = ', cpnElement);

    this.modelService.addCpnElement(cpnParentElement, cpnElement, cpnType);

    if (newNode) {
      this.declarationNodes.push(newNode);

      if (gotoEdit) {
        setTimeout(() => {
          // this.treeComponent.treeModel.getNodeById(newNode.id).setActiveAndVisible();
          // this.goToEditNode(newNode.id);
        }, 100);
      }
    }
  }

  cloneObject(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  onUpNode(treeNode) {
  }

  onDownNode(treeNode) {
  }

  /**
   * Deleting node
   *
   * @param node - tree node object
   */
  onDeleteNode(node) {
    console.log('onDeleteNode(), node = ', node);

    if (node.type === 'declaration') {
      const cpnElement = node.cpnElement;
      if (cpnElement) {
        this.modelService.deleteFromModel(cpnElement);
      }
    }
  }


  sendSelectDeclarationNode(node, openEditor) {
    this.eventService.send(Message.SELECT_DECLARATION_NODE, {
      sender: this,
      openEditorTab: openEditor,
      cpnType: node.cpnType,
      cpnElement: node.cpnElement
    });
  }


  onNodeClick(event, node) {
    if (this.selectedNode !== node) {
      this.selectedNode = node;

      this.goToEditNode(node.id);

      if (node.type === 'declaration') {
        this.sendSelectDeclarationNode(node, false);
      }
    }
  }

  onNodeDblClick(event, node) {
    this.onNodeClick(event, node);

    if (node.type === 'declaration') {
      this.sendSelectDeclarationNode(node, true);
    }
  }

  /*
   * Edit node text by click on node handler or by context menu
   * @param node
   */
  goToEditNode(nodeId) {
    const node = this.getNodeById(nodeId);

    if (node && this.canEdit(node)) {
      setTimeout(() => {

        const inputElem = document.getElementById('textinpfield_' + node.id);
        console.log('onEditNode(), inputElemId=', 'textinpfield_' + node.id);
        if (inputElem) {
          inputElem.focus();
          if (this.editableNode !== node) {
            document.execCommand('selectAll', false, null);
          }
          this.editableNode = node;
        }
      }, 1);
    }
  }

  getNodeById(id) {
    for (const node of this.declarationNodes) {
      if (node.id === id) {
        return node;
      }
    }
    return undefined;
  }

  canEdit(node) {
    return true;
  }


  saveEditedData(event, node) {
    // console.log('saveEditedData(), event = ', event);

    const htmlElement = event.srcElement || event.target;
    if (!htmlElement) {
      console.error('saveEditedData(), Error: fail to get html element, event = ', event);
      return;
    }

    let value = htmlElement.textContent;

    if (value.trim() === '') {
      value = '* empty *';
    }

    console.log('saveEditedData(), node = ', node);
    console.log('saveEditedData(), value = ', value);

    // don't save if value not changed
    if (value === node.name) {
      console.log('saveEditedData() - elem not changed');
      return;
    }

    switch (node.type) {
      case 'block':
        this.updateBlockNodeText(node, value);
        break;
      case 'declaration':
        this.updateDeclarationNodeText(node, value);
        break;
      case 'page':
        this.updatePageNodeText(node, value);
        break;
    }

    this.eventService.send(Message.DECLARATION_CHANGED, {
      cpnElement: node.cpnElement,
      newTextValue: value
    });

    this.eventService.send(Message.MODEL_CHANGED);

    this.sendSelectDeclarationNode(node, false);
  }

  getNodeByCpnElement(cpnElement) {
    return this.getNodeById(cpnElement._id);
  }

  /**
   * Find node by cpn element and update it's text
   * @param cpnElement
   */
  updateNodeByCpnElement(cpnElement, newTextValue) {
    const nodeForUpdate = this.getNodeByCpnElement(cpnElement);

    console.log(this.constructor.name, 'updateNodeByCpnElement(), cpnElement, newTextValue, nodeForUpdate = ',
      cpnElement, newTextValue, nodeForUpdate);

    if (nodeForUpdate) {
      this.updateDeclarationNodeText(nodeForUpdate, newTextValue);
    }
  }


  /**
   * Updating block node
   * @param node
   * @param newValue
   */
  updateBlockNodeText(node, newValue) {
    node.name = newValue; // update tree node text
    node.cpnElement.id = newValue; // update cpnElement
  }


  /**
   * Updating page node
   * @param node
   * @param newValue
   */
  updatePageNodeText(node, newValue) {
    node.name = newValue; // update tree node text
    node.cpnElement.pageattr._name = newValue; // update cpnElement
    this.eventService.send(Message.CHANGE_NAME_PAGE, { id: node.cpnElement._id, name: newValue });
  }

  /**
   * Updating declaration node
   * @param node
   * @param newValue
   */
  updateDeclarationNodeText(node, newValue) {
    node.text = node.name = newValue; // update tree node text
    // node.cpnElement.pageattr._name = newValue; // update cpnElement

    const oldCpnType = node.declarationType;

    const result = this.modelService.stringToCpnDeclarationElement(node.cpnElement, newValue);
    node.cpnElement = result.cpnElement;
    node.declarationType = result.declarationType;

    console.log('updateDeclarationNodeText(). parsing result = ', result);

    const cpnType = node.declarationType;
    const cpnElement = node.cpnElement;
    let cpnParentElement = node.cpnParentElement;

    if (cpnType !== oldCpnType) {
      console.log('updateDeclarationNodeText(). cpnParentElement = ', cpnParentElement);
      console.log('updateDeclarationNodeText(). cpnElement = ', cpnElement);
      console.log('updateDeclarationNodeText(). oldCpnType = ', oldCpnType);

      node.cpnParentElement = this.modelService.removeCpnElement(cpnParentElement, cpnElement, oldCpnType);
      console.log('updateDeclarationNodeText(). node.cpnParentElement = ', node.cpnParentElement);

      cpnParentElement = node.cpnParentElement;
      node.cpnParentElement = this.modelService.addCpnElement(cpnParentElement, cpnElement, cpnType);
    } else {
      this.modelService.updateCpnElement(cpnParentElement, cpnElement, cpnType);
    }
  }

  hideColapseTable(tableId, block) {
    let table: HTMLTableElement = <HTMLTableElement>document.getElementById(tableId);
    console.log(this.constructor.name, 'hideColapseTable(), table = ', tableId);
    block.visible = !block.visible;
    // table.hidden = !table.hidden;
  }

}
