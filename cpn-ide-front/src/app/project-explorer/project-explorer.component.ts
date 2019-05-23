import {Component, HostListener, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
// import {NgxXml2jsonService} from 'ngx-xml2json';
import {EventService} from '../services/event.service';
import {Message} from '../common/message';
import {ProjectService} from '../services/project.service';
import {TreeComponent, TREE_ACTIONS} from 'angular-tree-component';
import {ModelService} from '../services/model.service';
import {ColorDeclarationsPipe} from '../pipes/color-declarations.pipe';
import {OptionsNamePipePipe} from '../pipes/options-name.pipe';
import {Constants} from '../common/constants';
import { AccessCpnService } from '../services/access-cpn.service';

// import {TreeComponent} from 'angular-tree-component';

@Component({
  selector: 'app-project-explorer',
  templateUrl: './project-explorer.component.html',
  styleUrls: ['./project-explorer.component.scss'],
  providers: [ColorDeclarationsPipe, OptionsNamePipePipe]
})
/**
 * class ProjectExplorerComponent
 */
export class ProjectExplorerComponent implements OnInit, OnDestroy {
  @Input() message = 'Not set';

  JSON = JSON;

  idNodeCounter = 0;
  private eventHub: any;
  newPageCount = 0;
  stateTree;
  showTable = 'not';
  lastContextMenuId;

  selectedNode;

  filterText = '';

  // topics = ['project', 'Declarations', 'Monitors', 'Options', 'Default', 'Pages', 'Standard priorities', 'Standard declarations'];

  reservedWords = ['project', 'Declarations', 'Monitors', 'Options', 'Default', 'Pages', 'globbox'];
  paramsTypes = ['ml', 'colset', 'var', 'globref'];
  appSettingsKeys;
  appSettings;
  /**
   * JSON object, contains full CPN-model
   */
  currentProject;
  currentProjectModel;

  // subscription: Subscription;
  modelName;
  subpages = [];
  editableNode;
  /**
   * treeComponent - component for displaying project tree
   */
  @ViewChild('tree') treeComponent: TreeComponent;

  nodes = [];

  // Множество идентификаторов узлов, которые должны быть подсвечены снизу в даный момент
  underlineNodeSet = new Set();

  // Состояние укороченных названий узлов
  openedLabel = [];

  // nodes = [
  //   {
  //     id: 1,
  //     name: 'root1',
  //     children: [
  //       { id: 2, name: 'child1' },
  //       { id: 3, name: 'child2' }
  //     ]
  //   },
  //   {
  //     id: 4,
  //     name: 'root2',
  //     children: [
  //       { id: 5, name: 'child2.1' },
  //       {
  //         id: 6,
  //         name: 'child2.2',
  //         children: [
  //           { id: 7, name: 'subsub' }
  //         ]
  //       }
  //     ]
  //   }
  // ];
  //
  options = {
    allowDrag: true,
    allowDrop: (element, {parent, index}) => {

      // console.log('allowDrop, element ', element, ' to ', parent, ' index = ', index);
      console.log('allowDrop, element ', element.data.type, ' to ', parent.data.type, ' index = ', index);

      return element && parent &&
      element.data.type === 'declaration' &&
      parent.data.type === 'block' ? true : false;

      // return true;

      // const elemHeaderCatalog = this.getHeaderCatalog(element);
      // const parentHeaderCatalog = this.getHeaderCatalog(parent);
      // if (this.paramsTypes.includes(element.parent.data.name)) {
      //   if (element.parent.data.name !== parent.data.name) {
      //     return false;
      //   }
      // }
      // return elemHeaderCatalog &&
      // parentHeaderCatalog
      //   ? (elemHeaderCatalog.data.name === parentHeaderCatalog.data.name &&
      //     (this.paramsTypes.includes(element.parent.data.name) ||
      //       (!this.paramsTypes.includes(parent.data.name) && !this.paramsTypes.includes(parent.parent.data.name))
      //     )
      //   )
      //   : false;
    },
    actionMapping: {
      mouse: {
        contextMenu: (model: any, node: any, event: any) => {
          this.onTreeNodeContextMenu(event, node);
        },
        drop: (tree, node, $event, {from, to}) => {
          console.log('dragAndDrop, from ', from, ' to ', to);
          console.log('dragAndDrop, moveNode ', node.name, ' to ', to.parent.name, ' at index ', to.index);

          // const parentJson = from.parent.data.cpnElement;
          // const type = node.data.type === 'page' ? 'page' : this.paramsTypes.includes(from.parent.data.name) ? undefined : from.data.name;
          // const isEntryExist: boolean = to.parent.data.cpnElement[type];
          // this.modelService.moveNonModelJsonElement(from.data.cpnElement, parentJson, to.parent.data.cpnElement, to.index, type);
          // if (isEntryExist) {
          //   to.parent = tree.getNodeById((to.parent.children.find(e => e.data.name === type)).id);
          //   node = node.children.find(chld => chld.data.name === from.data.name);
          //   const onDeleteNodeId = from.id;
          //   const fromChildren = from.children;
          //   for (from of fromChildren) {
          //     if (from) {
          //       tree.moveNode(tree.getNodeById(from.id), to);
          //     } else {
          //       break;
          //     }
          //   }
          //   const deleteNode = tree.getNodeById(onDeleteNodeId);
          //   this.deleteNode(this.nodes[0], onDeleteNodeId);
          //   this.updateTree();
          //   this.treeComponent.treeModel.setState(tree.getState());

          // } else {
          //   TREE_ACTIONS.MOVE_NODE(tree, node, $event, { from, to });
          // }
        }
      }
    }
  };

  /*onMoveNode(event) {
    console.log('onMoveNode', event.node.name, 'to', event.to.parent.name, 'at index', event.to.index);
    let parentJson = (this.treeComponent.treeModel.getNodeById(event.node.id));//.parent.data.cpnElement;
    this.modelService.moveNonModelJsonElement(event.node.cpnElement, parentJson, event.to.parent.cpnElement, event.to.index);

  }*/

  colorDeclarationsPipe;

  /**
   * Constructor
   * @param {NgxXml2jsonService} xml2jsonService - xml to json service provider
   */
  constructor(
    private eventService: EventService,
    // private xml2jsonService: NgxXml2jsonService,
    private projectService: ProjectService,
    private modelService: ModelService,
    private _colorDeclarationsPipe: ColorDeclarationsPipe,
    private accessCpnService: AccessCpnService) {

    this.colorDeclarationsPipe = this._colorDeclarationsPipe;
  }

  ngOnInit() {
    this.appSettings = this.projectService.getAppSettings();
    this.appSettingsKeys = Object.keys(this.appSettings);
    // Subscribe on project load event
    this.eventService.on(Message.PROJECT_FILE_OPEN, (data) => {
      this.accessCpnService.resetSim();
      this.loadProjectData(data.project);
    });
    this.eventService.on(Message.PROJECT_LOAD, (data) => {
      this.loadProjectData(data.project);
    });

    this.eventService.on(Message.MODEL_UPDATE, (data) => {
      this.updateModel(data);
    });

    this.eventService.on(Message.UPDATE_TREE, (data) => {

      if (data.cpnElement && data.newTextValue) {
        // console.log('UPDATE_TREE, data.cpnElement = ', data.cpnElement);
        // console.log('UPDATE_TREE, this.treeComponent.treeModel = ', this.treeComponent.treeModel);

        this.updateTreeByCpnElement(data.cpnElement, data.newTextValue);
      }

      // const newNodeId = data.newNodeId; // ? data.newNodeId  : data.comonBlock.id;
      // if (data.state) {
      //   this.stateTree = data.state;
      //   // this.treeComponent.treeModel.setState(data.state);
      // }
      // this.loadProjectData(data.project);
      // this.updateTree();

      // setTimeout(() => {
      //   this.treeComponent.treeModel.setState(data.state);
      //   // const node = this.treeComponent.treeModel.getNodeById('project');

      //   if (newNodeId) {
      //     const nodeForEdit = this.treeComponent.treeModel.getNodeById(newNodeId);
      //     if (!data.comonBlock) {
      //       this.eventService.send(Message.OPEN_DECLARATION_BLOCK, { id: this.getCurrentBlock(nodeForEdit).id });
      //     }
      //     let expnNode = nodeForEdit;
      //     while (expnNode.id !== 'project') {
      //       expnNode.expand();
      //       expnNode = expnNode.parent;
      //     }

      //     this.treeComponent.treeModel.setFocusedNode(nodeForEdit);
      //     if (data.after !== 'delete' && data.after !== 'edit') {
      //       this.goToEditNode(nodeForEdit);
      //     }
      //   }
      // }, 100);

    });

    this.eventService.on(Message.UPDATE_TREE_PAGES, (data) => {
      this.updatePagesNode(data.currentPageId);
    });

    this.eventService.on(Message.CHANGE_NAME_PAGE, (data) => {
      if (data.changedElement === 'tran') {
        const node = this.getObjects(this.nodes, 'id', data.id);
        if (node) {
          node[0].name = data.name;
          this.modelService.changePageName(data.id, data.name);
          /*const changedPage = this.currentProjectModel.workspaceElements.cpnet.page.find(page => page._id === data.id);
          if (changedPage) {
            changedPage.pageattr._name = data.name;
          }*/
        }
      }
    });

    this.eventService.on(Message.SHAPE_HOVER, (data) => {
      // console.log(' ----- SHAPE_HOVER, data = ' + data);
      this.underlineRelations(data.element);
    });

    this.eventService.on(Message.SHAPE_OUT, (data) => {
      // console.log(' ----- SHAPE_OUT, data = ' + data);
      this.doUnderlineNodeLabel(false);
    });
  }

  ngOnDestroy() {
  }

  updatePagesNode(currentPageId) {
    let cpnet = this.getCpnetElement(this.currentProjectModel);
    if (!cpnet) {
      return;
    }

    let projectNode = this.nodes[0];

    let pagesNode = this.createPagesNode('Pages', cpnet);

    console.log('updatePagesNode(), pagesNode = ', pagesNode);

    projectNode.children[projectNode.children.length - 1] = pagesNode;

    this.updateTree();

    if (currentPageId) {
      this.expandNode(currentPageId);
      this.gotoNode(currentPageId);
    }
  }


  /**
   * Find tree node by cpn element and update it's name
   * @param cpnElement
   */
  updateTreeByCpnElement(cpnElement, newTextValue) {
    var nodeForUpdate = this.treeComponent.treeModel.getNodeBy((node) => {
      // console.log('UPDATE_TREE, getNodeBy(), node = ', node);
      return node.data && node.data.cpnElement === cpnElement;
    });
    // if (nodeForUpdate
    //   && nodeForUpdate.data
    //   && nodeForUpdate.data.declarationType
    //   && !(nodeForUpdate instanceof Array)) {
    //   // console.log('UPDATE_TREE, nodeForUpdate = ', nodeForUpdate);
    //   nodeForUpdate.data.name = this.modelService.cpnDeclarationElementToString(
    //     cpnElement,
    //     nodeForUpdate.data.declarationType);
    //   this.updateTree();
    // }
    if (nodeForUpdate && nodeForUpdate.data) {
      this.updateDeclarationNodeText(nodeForUpdate, newTextValue);
      this.updateTree();
    }
  }

  // <editor-fold desc="Подсветка в дереве при наведении на фигуру в графическом редакторе" >

  /**
   * подчеркнуть все, что связано с данным элементом
   */
  underlineRelations(element: any) {
    this.doUnderlineNodeLabel(false);
    let elementId;

    if (element.type === 'cpn:Place') {

      // подчеркиваем тип
      this.underlineRelationsRecursively(this.nodes[0], element.cpnElement.type.text.toString());

      // разбираем инитмарк и находим в нем литералы
      this.processMlCodeRecursively(element.cpnElement.initmark.text.toString());

    } else if (element.type === 'cpn:Transition') {
      elementId = element.cpnElement._id;
      if (this.modelService.getCpn()) {
        if (this.modelService.getCpn().page instanceof Array) {
          for (const page of this.modelService.getCpn().page) {
            this.processPage(page, elementId);
          }
        } else {
          this.processPage(this.modelService.getCpn().page, elementId);
        }
      }
    }
  }

  /**
   * поиск всех арков на странице
   * @param page страница
   * @param elementId ид элемента
   */
  processPage(page: any, elementId: string) {
    if (page.arc) {
      if (page.arc instanceof Array) {
        for (const arc of page.arc) {
          this.processArc(arc, elementId);
        }
      } else {
        this.processArc(page.arc, elementId);
      }
    }
  }

  /**
   * выбор арков, связанных с нашим элементом
   * @param arc объект arc
   * @param elementId идентификатор элемента, для которого мы ищем арки
   */
  processArc(arc: any, elementId: string) {
    if ((arc.placeend && arc.placeend._idref === elementId) || (arc.transend && arc.transend._idref === elementId)) {
      this.processMlCodeRecursively(arc.annot.text.toString());
    }
  }

  /**
   * Обработка кода на языке моделирования с целью выделения из него литералов
   * @param str код на языке моделирования
   */
  processMlCodeRecursively(str: string) {
    const codeWithoutComments = this.removeCommentsFromCode(str);
    // ищем самые глубоко вложенные скобки, и разбиваем строку на две подстроки:
    // первая - все вокруг этих скобок, вторая - все внутри этих скобок
    // если скобок не нашли, значит имеем строку, не содержащую скобок, из которой нам надо выделить литералы
    const lastOpenBracket = codeWithoutComments.lastIndexOf('(');
    if (lastOpenBracket > -1) {
      const nextCloseBracket = (codeWithoutComments.substring(lastOpenBracket)).indexOf(')') + lastOpenBracket;
      this.processMlCodeRecursively(codeWithoutComments.substring(0, lastOpenBracket) + codeWithoutComments.substring(nextCloseBracket + 1));
      this.processMlCodeRecursively(codeWithoutComments.substring(lastOpenBracket + 1, nextCloseBracket));
    } else {
      this.processLiteralsFromMlString(codeWithoutComments);
    }
  }

  /**
   * Функция удаляет комментарии из кода. Возвращает строку без комментариев
   * (* комментарии,
   * могут быть многострочными *)
   * @param str
   */
  removeCommentsFromCode(str: string): string {
    let result = str;
    while (true) {
      const matches = result.match('(\\(\\*){1}(.|\\n|\\r|\\t)*(\\*\\)){1}');
      if (matches) {
        const commentStart = result.indexOf(matches[0]);
        if (commentStart > 0) {
          if (commentStart + matches[0].length === result.length) {
            result = result.substring(0, commentStart - 1);
          } else {
            result = result.substring(0, commentStart - 1) + result.substring(commentStart + matches[0].length);
          }
        } else {
          if (matches[0].length === result.length) {
            result = '';
          } else {
            result = result.substring(matches[0].length);
          }
        }
      } else {
        break;
      }
    }
    return result;
  }

  /**
   * Обработка строки на языке моделирования, не содержащую скобок, из которой нам надо выделить литералы
   * @param str строка на языке моделирования, не содержащая скобок
   */
  processLiteralsFromMlString(str: string) {
    const literals = str.split(',');
    for (const someLiteral of literals) {
      const goodLiterals = someLiteral.match('[a-zA-Z0-9_]+');
      if (goodLiterals) {
        for (const lit of goodLiterals) {
          this.underlineRelationsRecursively(this.nodes[0], lit);
        }
      }
    }
  }

  /**
   * рекурсивный пеербор узлов дерева в поисках имени узла, которое требуется подсветить
   * @param parentNode родительский узел
   * @param name имя типа или функции, которое нужно найти и подчеркнуть в дереве,
   */
  underlineRelationsRecursively(parentNode: any, name: string): boolean {
    if (parentNode.children) {
      for (const node of parentNode.children) {
        if (this.underlineRelationsRecursively(node, name)) {
          this.doUnderlineNodeLabel(true, node.id);
          return true;
        }
      }
    } else {
      const parentCnpWitchoutComments = this.removeCommentsFromCode(parentNode.cpnElement.toString());
      if (parentCnpWitchoutComments.match('^((local){1}\\s+)*(fun|val|exception){1}\\s+' + name + '\\s*[=(]{1}')) {
        // это проверка на то, что строка является декларацией функции или val
        this.doUnderlineNodeLabel(true, parentNode.id);
        return true;

      } else if (parentNode.cpnElement.id) {

        // здесь подчеркиваем переменные и их типы
        if (parentNode.cpnElement.id instanceof Array) {
          for (const someId of parentNode.cpnElement.id) {
            if (someId === name) {
              this.doUnderlineNodeLabel(true, parentNode.id);
              if (parentNode.cpnElement.type) {
                this.underlineRelationsRecursively(this.nodes[0], parentNode.cpnElement.type.id);
              }
              return true;
            }
          }
        } else {
          if (parentNode.cpnElement.id === name) {
            this.doUnderlineNodeLabel(true, parentNode.id);
            if (parentNode.cpnElement.type) {
              this.underlineRelationsRecursively(this.nodes[0], parentNode.cpnElement.type.id);
            }
            return true;
          }
        }
      }
    }
    return false;
  }

  /**
   * Подсвечивание снизу надписи в узле дерева
   * @param {boolean} underline - флаг добавить/убрать подсвечивание
   * @param {string} nodeId - ид ноды. Не обязательный параметр. Если не указан, флаг underline распространяется на все ноды
   * @example this.underlineNode(false) - убрать подсвечивание у всех нод
   * @example this.underlineNode(true, 'NODEID') - подсветить ноду с указанным ид
   */
  doUnderlineNodeLabel(underline: boolean, nodeId?: string) {
    if (underline) {
      if (arguments.length > 1) {
        this.underlineNodeSet.add(nodeId);
      }
    } else {
      if (arguments.length > 1) {
        this.underlineNodeSet.delete(nodeId);
      } else {
        this.underlineNodeSet = new Set();
      }
    }
  }

  isHighlightBottom(id: any) {
    return (this.underlineNodeSet.has(id) && !this.openedLabel[id]);
  }

  isHighlightAround(id: any) {
    return (this.underlineNodeSet.has(id) && this.openedLabel[id]);
  }

  // </editor-fold>

  getStringValueForAddingCp(node) {
    if (node) {
      switch (node.id) {
        case 'Declarations':
          return 'declaration';
          break;
        case 'Pages':
          return 'page';
          break;
        default:
          if (node.data.type === 'page') {
            return 'page';
          } else {
            return node.data.name;
          }

      }
    }
  }

  getHeaderCatalog(node) {
    if (node) {
      while (node.parent && !this.reservedWords.includes(node.id)) {
        node = node.parent;
      }
    }
    return node;

  }


  /**
   * Adding new node to the tree
   *
   * @param treeNode - tree node object (in terms of tree model)
   * @param type - type of adding element
   */
  onAddNode(treeNode, type) {
    console.log('onAddNode(), node = ', treeNode, ', addingElement = ', type);

    this.expandNode(treeNode.id);

    var cpnElement, newNode;

    var cpnParentElement = treeNode.data.cpnElement;
    if (['declaration', 'page'].includes(treeNode.data.type)) {
      if (!treeNode.parent || !treeNode.parent.data) {
        console.error('onAddNode(), ERROR: Fail to get parent node for treeNode = ', treeNode);
        return;
      }
      cpnParentElement = treeNode.parent.data.cpnElement;
    }

    const defValue = this.projectService.getAppSettings()[type];

    var cpnType;

    switch (type) {
      case 'block':
        cpnElement = this.modelService.createCpnBlock(defValue);
        newNode = this.createBlockNode(cpnElement);
        cpnType = 'block';
        break;

      case 'declaration':
        cpnElement = this.modelService.createCpnDeclaration(defValue);
        newNode = this.createDeclarationNode(cpnElement);
        cpnType = newNode.declarationType;
        break;

      case 'page':
        cpnElement = this.modelService.createCpnPage(defValue + ' ' + (++this.newPageCount));
        newNode = this.createPageNode(cpnElement);
        cpnType = 'page';
        break;
    }

    console.log('onAddNode(), cpnType = ', cpnType);
    console.log('onAddNode(), cpnParentElement = ', cpnParentElement);
    console.log('onAddNode(), cpnElement = ', cpnElement);

    this.addCpnElement(cpnParentElement, cpnElement, cpnType);

    if (newNode) {
      if (treeNode.data.children && !(['declaration', 'page'].includes(treeNode.data.type))) {
        treeNode.data.children.push(newNode);
      } else if (treeNode.parent) {
        treeNode.parent.data.children.push(newNode);

        // if (treeNode.data.type === 'page' && treeNode.data.id !== 'Pages') {
        //   this.eventService.send(Message.SUBPAGE_CREATE, {
        //     name: newNode.name,
        //     id: newNode.id,
        //     parentid: treeNode.id,
        //     event: event,
        //     state: this.treeComponent.treeModel.getState()
        //   });
        // }
      }

      this.treeComponent.treeModel.update();
      setTimeout(() => {
        this.treeComponent.treeModel.getNodeById(newNode.id).setActiveAndVisible();
        this.goToEditNode(newNode.id);
      }, 100);
    }
  }

  cloneObject(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * Deleting node from the tree
   *
   * @param treeNode - tree node object (in terms of tree model)
   */
  onDeleteNode(treeNode) {
    console.log('onDeleteNode(), node = ', treeNode);

    if (treeNode.parent) {
      var parentChildren = treeNode.parent.data.children;
      if (parentChildren) {
        parentChildren.splice(
          parentChildren.indexOf(treeNode.data), 1);
        this.treeComponent.treeModel.update();
      }
    }
  }

  /**
   * icon Add click handler
   * @param node - current page node in explorer
   */
  onAddNode_OLD(node, addingElement) {
    console.log('onAddNode(), node = ', node);

    if (node.data.type === 'page' || node.data.id === 'Pages') {
      console.log('content' + node.id + 'IsSelected ---');
      const newPage = {
        pageattr: {
          _name: this.projectService.getAppSettings()['page'] + (this.newPageCount++)
        },
        place: [],
        trans: [],
        arc: [],
        constraints: '',
        _id: 'ID' + new Date().getTime()
      };
      const pageNode = {
        // id: page['@attributes'].id,
        // name: page.pageattr['@attributes'].name,
        id: newPage._id, // page._id,
        name: newPage.pageattr._name, // page.pageattr._name,
        type: 'page',
        cpnElement: newPage, // page,
        children: []
      };

      this.modelService.createNewPage(newPage);
      //  let page = this.getObjects(this.nodes, 'id', node.data.id)
      // page[0].children.push(pageNode);
      node.data.children.push(pageNode);
      this.updateTree();
      const editableNode = this.treeComponent.treeModel.getNodeById(pageNode.id);
      this.treeComponent.treeModel.setFocusedNode(editableNode);
      this.goToEditNode(pageNode.id);
      let expnNode = editableNode;
      while (expnNode && expnNode.id !== 'project') {
        expnNode.expand();
        expnNode = expnNode.parent;
      }
      // this.eventService.send(Message.XML_UPDATE, {project: {data: this.currentProjectModel, name: this.modelName}});
      if (node.data.id !== 'Pages') {
        this.eventService.send(Message.SUBPAGE_CREATE, {
          name: pageNode.name,
          id: pageNode.id,
          parentid: node.id,
          event: event,
          state: this.treeComponent.treeModel.getState()
        });
      }
    } else {
      if (!addingElement) {
        addingElement = node.data.name;
      }

      // this.modelService.sendChangingElementToDeclarationPanel(node, addingElement, 'add', undefined, this.getCurrentBlock(node).id, this.treeComponent.treeModel.getState());
    }
  }

  /*sendChangingElementToDeclarationPanel(node, elementType, action, id) {
    if (elementType === 'Declarations' || elementType === 'block') {
      this.eventService.send(Message.CHANGE_EXPLORER_TREE, {
        node: action === 'rename' ? node : undefined,
        action: action,
        element: 'tab',
        target: this.getCurrentBlock(node).id,
        id: id,
        state: this.treeComponent.treeModel.getState()
      });
    } else if (elementType === 'ml') {
      this.eventService.send(Message.CHANGE_EXPLORER_TREE, {
        node: action === 'rename' ? node : undefined,
        action: action,
        element: elementType,
        target: this.getCurrentBlock(node).id,
        id: id,
        state: this.treeComponent.treeModel.getState()
      });
    } else if (elementType === 'colset') {
      this.eventService.send(Message.CHANGE_EXPLORER_TREE, {
        node: action === 'rename' ? node : undefined,
        action: action,
        element: elementType,
        target: this.getCurrentBlock(node).id,
        id: id,
        state: this.treeComponent.treeModel.getState()
      });
    } else if (elementType === 'var') {
      this.eventService.send(Message.CHANGE_EXPLORER_TREE, {
        node: action === 'rename' ? node : undefined,
        action: action,
        element: elementType,
        target: this.getCurrentBlock(node).id,
        id: id,
        state: this.treeComponent.treeModel.getState()
      });
    } else if (elementType === 'globref') {
      this.eventService.send(Message.CHANGE_EXPLORER_TREE, {
        node: action === 'rename' ? node : undefined,
        action: action,
        element: elementType,
        target: this.getCurrentBlock(node).id,
        id: id,
        state: this.treeComponent.treeModel.getState()
      });
    } else if (this.modelService.paramsTypes.includes(id)) {
      this.eventService.send(Message.CHANGE_EXPLORER_TREE, {
        node: action === 'rename' ? node : undefined,
        action: action,
        target: this.getCurrentBlock(node).id,
        id: id,
        state: this.treeComponent.treeModel.getState()
      });
    }
  }*/


  onNodeArrowClick(event, node) {
    this.openedLabel[node.id] = !this.openedLabel[node.id];
    if (this.openedLabel[node.id]) {
      this.openNode(event, node);
      this.goToEditNode(node.id);
    } else {
      // this.saveEditedData(event, node);
    }
  }

  onNodeLabelClick(event, node) {
    if (!this.openedLabel[node.id]) {
      this.onNodeArrowClick(event, node);
    } else {
      this.goToEditNode(node.id);
    }

    // this.openNode(event, node);
    // if (this.canCollapse(node)) {
    //   if (this.openedLabel[node.id]) {
    //     this.openedLabel[node.id] = false;
    //   }
    // }
    // this.goToEditNode(node.id);
  }

  /*
   * Edit node text by click on node handler or by context menu
   * @param node
   */
  goToEditNode(nodeId) {
    const node = this.treeComponent.treeModel.getNodeById(nodeId);

    if (node && this.canEdit(node)) {
      setTimeout(() => {

        this.treeComponent.focused = false;
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

  openNode(event, node) {
    const currentNode = this.getCurrentBlock(node);
    this.eventService.send(Message.OPEN_DECLARATION_BLOCK, {id: currentNode.id});
    if (this.canCollapse(node)) {
      this.sendMlToMlEditor(node.data.name);
    } else {
      this.sendMlToMlEditor('');
    }
    event.preventDefault();
  }

  // Функция вычисляет, будет ли схлопываться/разворачиваться содержимое метки узла.
  canCollapse(node: any): boolean {
    return this.canEdit(node) && node.children === undefined;
  }

  isOption(node) {
    return node.data
      && node.data.type === 'option';
  }

  isBooleanOption(node) {
    return node.data
      && node.data.type === 'option'
      && node.data.cpnElement
      && node.data.cpnElement.value
      && node.data.cpnElement.value.boolean;
  }

  getBooleanOption(node) {
    return node.data
      && node.data.type === 'option'
      && node.data.cpnElement
      && node.data.cpnElement.value
      && node.data.cpnElement.value.boolean
      && node.data.cpnElement.value.boolean === 'true';
  }

  setBooleanOption(event, node) {
    console.log('setBooleanOption(), event = ', event);
    if (event.target) {
      node.data.cpnElement.value.boolean = event.target.checked ? 'true' : 'false';
    }
  }

  isTextOption(node) {
    return node.data
      && node.data.type === 'option'
      && node.data.cpnElement
      && node.data.cpnElement.value
      && node.data.cpnElement.value.text;
  }

  getTextOption(node) {
    return node.data
      && node.data.type === 'option'
      && node.data.cpnElement
      && node.data.cpnElement.value
      && node.data.cpnElement.value.text || '* empty *';
  }


  /**
   * Распарсить метку, чотбы выцепить оттуда и вернуть название функции или исключения или название переменной
   * @param {string} data - полный текст метки в узле
   */
  getLabel(node: any): string {
    if (this.canCollapse(node)) {
      if (!this.openedLabel[node.id]) {
        let result;
        const data = node.data.name.toString();
        try {
          const array = data.match('^((local){1}\\s+)*(globref|colset|var|val|fun|exception){1}\\s+[a-zA-Z0-9_\\s,]+');
          result = array[0];
        } catch (e) {
          try {
            const array = data.match('^[a-zA-Z0-9_]+');
            result = array[0];
          } catch (e1) {
            // console.warn(`Cannot get short label automatically. Long string = ${data}.`);
            result = data;
          }
        }
        return result;
      }
    }
    return node.data.name;
  }

  sendMlToMlEditor(value: any) {
    this.eventService.send(Message.SML_TO_EDITOR, {fn: {data: value}});
  }

  getCurrentBlock(currentNode): any {
    while (currentNode.parent && currentNode.parent.data && currentNode.parent.data.name !== 'Declarations') {
      if (!this.modelService.paramsTypes.includes(currentNode.data.name) && !this.modelService.paramsTypes.includes(currentNode.parent.data.name)) {
        break;
      }
      currentNode = currentNode.parent;
    }
    return currentNode;
  }

  isDeclarationBlock(node) {
    let block;
    try {
      block = this.findBlock(node);
    } catch (exeption) {
      return false;
    }
    // console.log(block.parent.id)
    return block && block.parent && block.parent.data.id === 'Declarations';
  }

  findBlock(currentNode): any {
    while (currentNode.parent && currentNode.parent.data && currentNode.parent.data.id !== 'Declarations') {
      currentNode = currentNode.parent;
    }
    return currentNode;
  }

  /**
   * save changed name to model by pressing enter key
   * @param event
   */
  // @HostListener('document:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log('project-explorer Keyboard event ', event);
    //  this.diagram.get('eventBus').fire('element.hover', this.curentElement );

    let code: number | string;

    if (event.code !== undefined) {
      code = event.code;

      // } else if (event.keyIdentifier !== undefined) {
      //   // поддержка safari
      //   code = event.keyIdentifier;

    } else if (event.keyCode !== undefined) {
      code = event.keyCode;
    }

    if (this.editableNode) {
      if (code === 'Tab' || code === '9') {
        // event.preventDefault();
      }
    }

    if (code === 'Enter' || code === 'NumpadEnter' || code === 13) {
      const htmlElement: HTMLInputElement = <HTMLInputElement>event.target;
      if (htmlElement && htmlElement.nodeName === 'TD') {
        if (htmlElement.offsetParent) {
          const htmlTableElement: HTMLTableElement = <HTMLTableElement>document.getElementById(htmlElement.offsetParent.id);

          if (htmlTableElement.id === 'application-settings-table') {
            const rows = htmlTableElement.rows.length;

            for (let i = 0; i < rows; i += 1) {
              const value = htmlTableElement.rows[i].cells[1].textContent;
              const name = htmlTableElement.rows[i].cells[0].textContent;
              this.appSettings[name] = value;
            }

          }

          this.showTable = 'application-settings-table';
          setTimeout(() => {
            this.showTable = 'not';
          }, 0);

        }

      }
    }
  }

  /**
   * icon delete click handler
   * @param node - current page node in explorer
   */
  onDeleteNode_OLD(node) {
    let parentNod;
    if (node.data.type === 'page' || node.data.id === 'Pages') {
      // if (this.currentProjectModel.workspaceElements.cpnet.page.length) {
      //   this.currentProjectModel.workspaceElements.cpnet.page = this.currentProjectModel.workspaceElements.cpnet.page.filter(x => x._id !== node.id);
      // } else {
      //   this.currentProjectModel.workspaceElements.cpnet.page = [];
      // }
      this.modelService.deletePage(node.id);
      parentNod = node.parent;
      // node.parent.data.children = node.parent.data.children.filter(x => x.id !== node.id);
      this.deleteNode(this.nodes[0], node.id);
      this.eventService.send(Message.DELETE_PAGE, {id: node.id, parent: node.parent.data.name});
      this.updateTree();
      this.focusedNode(parentNod);
      // this.eventService.send(Message.PAGE_OPEN, {pageObject: undefined, subPages: undefined});
    } else {
      parentNod = node.parent;
      this.focusedNode(parentNod);
      // deletingElem = !this.paramsTypes.includes(node.parent.id) ? node.data.id : node.parent.id;
      // this.sendChangingElementToDeclarationPanel(node, node.parent.id, 'delete', node.data.id);
      // this.modelService.sendChangingElementToDeclarationPanel(node, node.parent.name, 'delete', node.data.id, this.getCurrentBlock(node).id, this.treeComponent.treeModel.getState());
    }

  }

  focusedNode(node) {
    if (node) {
      const newfocusedBlock = this.getCurrentBlock(node);
      this.eventService.send(Message.OPEN_DECLARATION_BLOCK, {id: newfocusedBlock.id});
      this.treeComponent.treeModel.setFocusedNode(newfocusedBlock);
      this.treeComponent.treeModel.setActiveNode(newfocusedBlock, true, false);
      this.treeComponent.treeModel.setSelectedNode(newfocusedBlock, true);
    }
  }

  /**
   * delete page node from model
   */
  deleteNode(node, id) {
    for (const nd of node.children) {
      if (nd.id === id) {
        node.children = node.children.filter(x => x !== nd);
      }
      if (nd.children && nd.children.length > 0) {
        this.deleteNode(nd, id);
      }
    }
  }

  getObjects(obj, key, val) {
    let objects = [];
    for (const i in obj) {
      if (!obj.hasOwnProperty(i)) {
        continue;
      }
      if (typeof obj[i] === 'object') {
        objects = objects.concat(this.getObjects(obj[i], key, val));
      } else if (i === key && obj[i] === val || i === key && val === '') { //
        objects.push(obj);
      } else if (obj[i] === val && key === '') {
        if (objects.lastIndexOf(obj) === -1) {
          objects.push(obj);
        }
      }
    }
    return objects;
  }

  updateModel(updatedData) {
    this.modelService.updateModel(updatedData);
  }

  buildGlobboxTree(block, projectNode) {
    console.log('BUILDGLOBBOXTREE()');
    let paramNode;
    paramNode = {
      id: block.id ? block.id : 'globbox',
      name: block.id ? block.id : 'globbox',
      cpnElement: block,
      children: []
    };

    projectNode.children.push(paramNode);
    if (block.ml) {
      const mlNode = {
        id: 'ml' + this.idNodeCounter++,
        name: 'ml',
        cpnElement: block.ml,
        children: []
      };
      paramNode.children.push(mlNode);
      let mlstr: string;
      if (block.ml instanceof Array) {
        for (const ml of block.ml) {
          mlstr = ml.toString();
          mlNode.children.push({
            id: ml._id,
            // id: globref['@attributes'].id,
            name: ml,
            cpnElement: ml
          });
        }
      } else {
        mlNode.children.push({
          id: block.ml._id,
          // id: globref['@attributes'].id,
          name: block.ml,
          cpnElement: block.ml
        });
      }
    }
    if (block.var) {
      const varNode = {
        id: 'var' + this.idNodeCounter++,
        name: 'var',
        cpnElement: block.var,
        children: []
      };
      paramNode.children.push(varNode);
      if (block.var instanceof Array) {
        for (const v of block.var) {
          const node = {
            // id: v['@attributes'].id,
            id: v._id,
            name: v.id,
            cpnElement: v
          };
          if (v.layout) {
            // node.name += ' : ' + v.layout;
            node.name = v.layout.replace('var ', '');
          } else {
            node.name = v.id + ' : ' + v.type.id + ';';
          }
          varNode.children.push(node);
        }
      } else {
        const node = {
          // id: v['@attributes'].id,
          id: block.var._id,
          name: block.var.id,
          cpnElement: block.var
        };

        if (block.var.layout) {
          //  node.name += ' : ' + block.var.layout;
          node.name = block.var.layout.replace('var ', '');
        } else {
          node.name = block.var.id + ': ' + block.var.type.id + ';';
        }

        varNode.children.push(node);
      }

    }
    if (block.globref) {
      const globrefNode = {
        id: 'globref' + this.idNodeCounter++,
        name: 'globref',
        cpnElement: block.var,
        children: []
      };
      paramNode.children.push(globrefNode);
      if (block.globref instanceof Array) {
        for (const globref of block.globref) {
          globrefNode.children.push({
            // id: globref['@attributes'].id,
            id: globref._id,
            name: globref.layout ? globref.layout.replace('globref ', '') : globref.id + ' = ' + globref.ml + ';',
            cpnElement: globref
          });
        }
      } else {
        globrefNode.children.push({
          // id: globref['@attributes'].id,
          id: block.globref._id,
          name: block.globref.layout ? block.globref.layout.replace('globref ', '') : block.globref.id + ' = ' + block.globref.ml + ';',
          cpnElement: block.globref
        });
      }
    }
    if (block.color) {
      const colorNode = {
        id: 'colset' + this.idNodeCounter++,
        name: 'colset',
        cpnElement: block.color,
        children: []
      };
      paramNode.children.push(colorNode);
      if (block.color instanceof Array) {
        for (const color of block.color) {
          const node = {
            // id: color['@attributes'].id,
            id: color._id,
            name: color.id,
            cpnElement: color
          };
          if (color.layout) {
            node.name = color.layout.replace('colset ', '').replace('color ', '');
          } else {
            if (color.alias && color.alias.id) {
              node.name += ' = ' + color.alias.id;
            } else if (color.list && color.list.id) {
              node.name += ' = list ' + color.list.id;
            } else if (color.product && color.product.id) {
              node.name += ' = product ';
              if (color.product.id instanceof Array) {
                for (let i = 0; i < color.product.id.length; i++) {
                  node.name += i === 0 ? color.product.id[i] + ' ' : '* ' + color.product.id[i];
                }
              } else {
                node.name += color.product.id;
              }
            } else {
              node.name += ' = ' + color.id.toLowerCase();
            }
            if ('timed' in color) {
              node.name += ' timed';
            }
          }
          colorNode.children.push(node);
        }
      } else {
        const node = {
          // id: color['@attributes'].id,
          id: block.color._id,
          name: block.color.id,
          cpnElement: block.color,
        };
        if (block.color.layout) {
          node.name = block.color.layout.replace('colset ', '').replace('color ', '');
        } else {
          if (block.color.alias && block.color.alias.id) {
            node.name += ' = ' + block.color.alias.id;
          } else if (block.color.list && block.color.list.id) {
            node.name += ' = list ' + block.color.list.id;
          } else if (block.color.product && block.color.product.id) {
            node.name += ' = product ';
            if (block.color.product.id instanceof Array) {
              for (let i = 0; i < block.color.product.id.length; i++) {
                node.name += i === 0 ? block.color.product.id[i] + ' ' : '* ' + block.color.product.id[i];
              }
            } else {
              node.name += block.color.product.id;
            }
          } else {
            node.name += ' = ' + block.color.id.toLowerCase();
          }
          if ('timed' in block.color) {
            node.name += ' timed';
          }
        }
        colorNode.children.push(node);
      }
    }
    if (block.block) {
      for (const inblock of block.block) {
        this.buildGlobboxTree(inblock, paramNode);
      }
      if (block.block.id) {
        this.buildGlobboxTree(block.block, paramNode);
      }
    }
  }

  /**
   * Clear tree component
   */
  clearTree() {
    this.treeComponent.treeModel.collapseAll();
    this.nodes = [];
    this.updateTree();
  }

  /**
   * Creating simple tree node
   *
   * @param id - id of tree node
   * @param name - name of tree node
   */
  createTreeNode(id, name = undefined): any {
    return {
      id: id || name,
      name: name || id,
      children: []
    };
  }

  /**
   * Creating project Root node
   *
   * @param name - name of tree node
   * @param cpnElement - cpn JSON object
   *
   * @returns - tree node
   */
  createProjectNode(name, cpnElement) {
    const node = this.createTreeNode('project', name);
    node.cpnElement = cpnElement;
    node.classes = ['tree-project'];
    return node;
  }

  /**
   * Creating project Options node
   *
   * @param name - name of tree node
   * @param cpnElement - cpn JSON object
   *
   * @returns - tree node
   */
  createOptionsNode(name, cpnElement) {
    const optionsNode = this.createTreeNode(name);
    optionsNode.cpnElement = cpnElement;
    optionsNode.classes = ['tree-project'];

    const perfrepName = 'Performance report statistics';
    const perfrepNode = this.createTreeNode(perfrepName);

    // Simulation options
    const simperfrepName = 'Simulation performance report';
    const simperfrepNode = this.createTreeNode(simperfrepName);

    const simperfrepTimedName = 'Timed';
    const simperfrepTimedNode = this.createTreeNode(simperfrepTimedName);
    const simperfrepUntimedName = 'Untimed';
    const simperfrepUntimedNode = this.createTreeNode(simperfrepUntimedName);
    simperfrepNode.children.push(simperfrepTimedNode);
    simperfrepNode.children.push(simperfrepUntimedNode);

    const replperfrepName = 'Replication performance report';
    const replperfrepNode = this.createTreeNode(replperfrepName);

    perfrepNode.children.push(simperfrepNode);
    perfrepNode.children.push(replperfrepNode);

    const extName = 'Extentions';
    const extNode = this.createTreeNode(extName);

    if (cpnElement.option instanceof Array) {

      for (const opt of cpnElement.option) {
        const optName = opt._name + ' = ' + this.cpnOptionValueToString(opt);
        const optNode = this.createTreeNode('option_' + opt._name, optName);
        optNode.cpnElement = opt;
        optNode.type = 'option';

        if (['realtimestamp', 'fair_be', 'global_fairness', 'outputdirectory'].includes(opt._name)) {
          optionsNode.children.push(optNode);
        } else if (opt._name.startsWith('extensions')) {
          extNode.children.push(optNode);
        } else if (opt._name.startsWith('rep')) {
          replperfrepNode.children.push(optNode);
        } else if (opt._name.startsWith('untimed')) {
          simperfrepUntimedNode.children.push(optNode);
        } else {
          simperfrepTimedNode.children.push(optNode);
        }
      }
      optionsNode.children.push(perfrepNode);
      optionsNode.children.push(extNode);
    }

    return optionsNode;
  }

  cpnOptionValueToString(opt) {
    if (!opt.value) {
      return;
    }
    const type = Object.keys(opt.value)[0];
    return opt.value[type];
  }

  /**
   * Creating project Declarations node
   * @param name - name of tree node
   * @param cpnElement - cpn JSON object
   * @returns - tree node
   */
  createDeclarationsNode(name, cpnElement) {
    const declarationsNode = this.createTreeNode(name);
    declarationsNode.classes = ['tree-project'];
    declarationsNode.cpnElement = cpnElement;
    declarationsNode.actions = ['block'];

    // Block nodes
    if (cpnElement.block instanceof Array) {
      for (const block of cpnElement.block) {
        declarationsNode.children.push(this.createBlockNode(block));
      }
    } else {
      declarationsNode.children.push(this.createBlockNode(cpnElement.block));
    }

    return declarationsNode;
  }

  /**
   * Creating project Block node
   * @param cpnElement - cpn JSON object
   * @returns - tree node
   */
  createBlockNode(cpnElement) {
    const blockNode = this.createTreeNode(cpnElement._id, cpnElement.id);
    blockNode.cpnElement = cpnElement;
    blockNode.editable = true;
    blockNode.type = 'block';
    blockNode.actions = ['block', 'declaration', 'delete'];

    for (const key of ['block', 'globref', 'color', 'var', 'ml']) {
      const cpnItem = cpnElement[key];
      if (cpnItem) {
        if (cpnItem instanceof Array) {
          for (const item of cpnItem) {
            blockNode.children.push(this.createDeclarationNode(item, key));
          }
        } else {
          blockNode.children.push(this.createDeclarationNode(cpnItem, key));
        }
      }
    }

    return blockNode;
  }

  /**
   * Get declaration node creator
   * @param key - key of declaration block
   * @param cpnElement - cpn JSON object
   * @returns - tree node for corresponding key
   */
  createDeclarationNode(cpnElement, key = undefined) {
    var declarationNode = this.createTreeNode('* empty declaration *');
    if (cpnElement) {
      declarationNode.id = cpnElement._id;
      declarationNode.name = cpnElement.layout;
      declarationNode.cpnElement = cpnElement;
      declarationNode.type = 'declaration';
      declarationNode.children = undefined;
      declarationNode.declarationType = 'ml';
    }
    if (cpnElement && key) {
      switch (key) {
        case 'block':
          declarationNode = this.createBlockNode(cpnElement);
          break;

        case 'globref':
        case 'color':
        case 'var':
        case 'ml':
          const text = this.modelService.cpnDeclarationElementToString(cpnElement, key);
          declarationNode = this.createTreeNode(cpnElement._id, text);
          declarationNode.cpnElement = cpnElement;
          declarationNode.type = 'declaration';
          declarationNode.children = undefined;
          declarationNode.declarationType = key;
          break;
      }
    }
    declarationNode.editable = true;
    declarationNode.actions = ['block', 'declaration', 'delete'];
    return declarationNode;
  };


  /**
   * Creating project Globref node
   * @param cpnElement - cpn JSON object
   * @returns - tree node
   */
  createGlobrefNode(cpnElement) {
    const code = 'globref ' + cpnElement.id + ' = ' + cpnElement.ml + ';';

    const treeNode = this.createTreeNode(cpnElement._id, code);
    treeNode.cpnElement = cpnElement;
    treeNode.children = undefined;

    return treeNode;
  }

  /**
   * Creating project Color node
   * @param cpnElement - cpn JSON object
   * @returns - tree node
   */
  createColorNode(cpnElement) {
    const text = this.modelService.cpnColorToString(cpnElement);

    const treeNode = this.createTreeNode(cpnElement._id, text);
    treeNode.cpnElement = cpnElement;
    treeNode.children = undefined;

    return treeNode;
  }

  /**
   * Creating project Var node
   * @param cpnElement - cpn JSON object
   * @returns - tree node
   */
  createVarNode(cpnElement) {
    const text = this.modelService.cpnVarToString(cpnElement);

    const treeNode = this.createTreeNode(cpnElement._id, text);
    treeNode.cpnElement = cpnElement;
    treeNode.children = undefined;

    return treeNode;
  }

  /**
   * Creating project ML node
   * @param cpnElement - cpn JSON object
   * @returns - tree node
   */
  createMlNode(cpnElement) {
    const code = cpnElement.__text;

    const treeNode = this.createTreeNode(cpnElement._id, code);
    treeNode.cpnElement = cpnElement;
    treeNode.children = undefined;

    return treeNode;
  }

  // <editor-fold desc="Creating nodes for pages">

  /**
   * Creating project Pages node
   * @param name - name of tree node
   * @param cpnElement - cpn JSON object
   * @returns - tree node
   */
  createPagesNode(name, cpnElement) {
    const pagesNode = this.createTreeNode(name);
    pagesNode.classes = ['tree-project'];
    pagesNode.cpnElement = cpnElement;
    pagesNode.actions = ['page'];
    pagesNode.type = 'pages';

    var pageNodeList = [];


    console.log('createPagesNode(), cpnElement.page = ', cpnElement.page);

    // Page nodes, create and save it to pageNodeList
    if (cpnElement.page instanceof Array) {
      for (const page of cpnElement.page) {
        const pageNode = this.createPageNode(page);
        pageNodeList[pageNode.id] = pageNode;
      }
    } else {
      const pageNode = this.createPageNode(cpnElement.page);
      pageNodeList[pageNode.id] = pageNode;
    }
    // console.log('createPagesNode(), pageNodeList = ', pageNodeList);

    // Move subpages to it's parent page
    var subpages = [];
    for (const pageId of Object.keys(pageNodeList)) {
      const pageNode = pageNodeList[pageId];
      if (pageNode.subpages instanceof Array) {
        for (const id of pageNode.subpages) {
          pageNode.children.push(pageNodeList[id]);
          subpages.push(id);
        }
      }
    }

    // Push all page nodes, which are not subpages to Pages tree node
    for (const pageId of Object.keys(pageNodeList)) {
      const pageNode = pageNodeList[pageId];
      if (!subpages.includes(pageNode.id)) {
        pagesNode.children.push(pageNode);
      }
    }

    return pagesNode;
  }

  /**
   * Creating Page node
   * @param cpnElement - cpn JSON object
   * @returns - tree node
   */
  createPageNode(cpnElement) {
    const pageNode = this.createTreeNode(cpnElement._id, cpnElement.pageattr._name);
    pageNode.cpnElement = cpnElement;
    pageNode.editable = true;
    pageNode.type = 'page';
    pageNode.actions = ['page', 'delete'];

    // fill subpages array for this page
    let subpages = [];
    if (cpnElement.trans) {
      if (cpnElement.trans instanceof Array) {
        for (const tran of cpnElement.trans) {
          if (tran.subst) {
            subpages.push(tran.subst._subpage);
          }
        }
      } else if (cpnElement.trans.subst) {
        subpages.push(cpnElement.trans.subst._subpage);
      }
    }
    pageNode.subpages = subpages;

    return pageNode;
  }

  // </editor-fold>

  // <editor-fold desc="Creating nodes for monitors">

  /**
   * Creating monitors node
   * @param name - name of tree node
   * @param cpnElement - cpn JSON object
   * @returns - tree node
   */
  createMonitorsRootNode(name, cpnElement): any {
    const monitorsNode = this.createTreeNode(name);
    monitorsNode.classes = ['tree-project'];
    monitorsNode.cpnElement = cpnElement;
    // monitorsNode.actions = ['page'];

    let monitorsNodeList = [];

    // Monitor nodes, create and save it to monitorsNodeList
    if (cpnElement.monitor instanceof Array) {
      for (const monitor of cpnElement.monitor) {
        const monitorNode = this.createMonitorNode(monitor);
        monitorsNodeList[monitorNode.id] = monitorNode;
      }
    }
    // Move monitors to it's parent page
    for (const monitorId of Object.keys(monitorsNodeList)) {
      const monitorNode = monitorsNodeList[monitorId];
      monitorsNode.children.push(monitorNode);
    }

    return monitorsNode;
  }

  /**
   * Creating Monitor node
   * @param cpnElement - cpn JSON object
   * @returns - tree node
   */
  createMonitorNode(cpnElement) {
    const monitorsNode = this.createTreeNode(cpnElement._id, cpnElement._name);
    monitorsNode.cpnElement = cpnElement;
    monitorsNode.editable = true;
    monitorsNode.type = 'monitor';
    if (cpnElement._disabled === 'true') {
      monitorsNode.options = {nodeClass: 'disabledNode'};
    }
    // node.actions = ['page', 'delete'];

    // typedescription
    let subnodes11 = [];
    const monTypeNode = this.createTreeNode('monitor_type_' + cpnElement._id, cpnElement._typedescription);
    monTypeNode.cpnElement = cpnElement;
    monTypeNode.type = 'monitor_type';

    // options
    let subnodes12 = [];
    if (cpnElement.option instanceof Array) {
      for (const option of cpnElement.option) {
        const opt = this.createMonitorOptionNode(cpnElement, option);
        subnodes12.push(opt);
      }
    } else if (cpnElement.option) {
      const opt = this.createMonitorOptionNode(cpnElement, cpnElement.option);
      subnodes12.push(opt);
    }
    monTypeNode.children = subnodes12;
    subnodes11.push(monTypeNode);

    // nodes ordered by page
    const nobp = this.createMonitorNodesOrderedByPage(cpnElement);
    subnodes11.push(nobp);

    if (cpnElement.declaration) {
      if (cpnElement.declaration instanceof Array) {
        for (const decl of cpnElement.declaration) {
          subnodes11.push(this.createMonitorDeclaration(decl, cpnElement));
        }
      } else {
        subnodes11.push(this.createMonitorDeclaration(cpnElement.declaration, cpnElement));
      }
    }

    monitorsNode.children = subnodes11;

    return monitorsNode;
  }

  createMonitorOptionNode(cpnElement, option) {
    const monOptNode = this.createTreeNode('monitor_option_' + cpnElement._id, option._name);
    monOptNode.cpnElement = option;
    monOptNode.type = 'monitor_option';
    return monOptNode;
  }

  createMonitorNodesOrderedByPage(cpnElement): any {
    let nobp = this.createTreeNode('nobp_' + cpnElement._id, 'Nodes ordered by pages');
    let subnodes = [];
    let pageinstanceidref = new Map<string, Array<string>>();
    if (cpnElement.node instanceof Array) {
      for (const node of cpnElement.node) {
        if (pageinstanceidref.has(node._pageinstanceidref)) {
          pageinstanceidref.get(node._pageinstanceidref).push(node._idref);
        } else {
          pageinstanceidref.set(node._pageinstanceidref, [node._idref]);
        }
      }
    } else if (cpnElement.node) {
      pageinstanceidref.set(cpnElement.node._pageinstanceidref, [cpnElement.node._idref]);
    }
    for (const k of pageinstanceidref.keys()) {
      let instRefNode = this.createTreeNode(k + '_' + cpnElement._id, k);
      let subnodes1 = [];
      for (const id of pageinstanceidref.get(k)) {
        let idrefNode = this.createTreeNode(id + '_' + cpnElement._id, id);
        idrefNode.type = 'monitor_ref';
        subnodes1.push(idrefNode);

        let name = null;
        if (this.modelService.getCpn().page) {
          if (this.modelService.getCpn().page instanceof Array) {
            for (const page of this.modelService.getCpn().page) {
              name = this.findElementOnPageByID(page, id);
              if (name !== null) {
                instRefNode.name = page.pageattr._name;
                idrefNode.name = name;
                break;
              }
            }
          } else {
            name = this.findElementOnPageByID(this.modelService.getCpn().page, id);
            if (name !== null) {
              instRefNode.name = this.modelService.getCpn().page.pageattr._name;
              idrefNode.name = name;
            }
          }
        }
      }
      instRefNode.children = subnodes1;
      subnodes.push(instRefNode);
    }
    nobp.children = subnodes;
    return nobp;
  }

  findElementOnPageByID(page, idref): any {
    let name = null;
    if (page.trans) {
      if (page.trans instanceof Array) {
        for (const trans of page.trans) {
          if (trans._id === idref) {
            name = trans.text + ' (transition)';
            break;
          }
        }
      } else {
        if (page.trans._id === idref) {
          name = page.trans.text + ' (transition)';
        }
      }
    }

    if (name === null) {
      if (page.place) {
        if (page.place instanceof Array) {
          for (const place of page.place) {
            if (place._id === idref) {
              name = place.text + ' (place)';
              break;
            }
          }
        } else {
          if (page.place._id === idref) {
            name = page.place.text + ' (place)';
          }
        }
      }
    }
    return name;
  }

  createMonitorDeclaration(decl, cpnElement): any {
    let d = this.createTreeNode('monitor_' + decl._name.split(' ')[0] + '_' + cpnElement._id, decl._name);

    let d1 =  this.createTreeNode(decl.ml._id, decl.ml.__text);
    d1.editable = true;
    d1.type = 'monitor_' + decl._name.split(' ')[0];

    d.children = [d1];

    return d;
  }

  isMonitorType(node) {
    return node.data
      && node.data.type === 'monitor_type';
  }

  isMonitorOption(node) {
    return node.data
      && node.data.type === 'monitor_option';
  }

  isMonitorRef(node) {
    return node.data
      && node.data.type === 'monitor_ref';
  }

  getMonitorOption(node): boolean {
    return node.data &&
      node.data.cpnElement &&
      node.data.cpnElement &&
      node.data.cpnElement._value === 'true';
  }

  setMonitorOption(event, node) {
    console.log('setMonitorOption(), event = ', event);
    if (event.target) {
      node.data.cpnElement._value = event.target.checked ? 'true' : 'false';
    }
  }

  // </editor-fold>

  /**
   * Get root cpnet element from CPN project JSON object
   * @param projectData - CPN project JSON object
   * @returns - cpnElement for cpnet element
   */
  getCpnetElement(projectData) {
    var cpnet;
    if (projectData.workspaceElements) {
      if (projectData.workspaceElements instanceof Array) {
        for (const workspaceElement of projectData.workspaceElements) {
          if (workspaceElement.cpnet) {
            cpnet = workspaceElement.cpnet;
            break;
          }
        }
      } else {
        if (projectData.workspaceElements.cpnet) {
          cpnet = projectData.workspaceElements.cpnet;
        }
      }
    }
    return cpnet;
  }

  onReload() {
    this.loadProjectData(this.currentProject);
  }

  /**
   * Loading project JSON to tree component object
   * @param project - cpn net JSON object
   */
  loadProjectData(project) {

    // Init Access/CPN
    this.accessCpnService.initNet(project.data);

    this.filterText = '';

    const projectData = project.data;
    const projectName = project.name;
    this.currentProjectModel = project.data;
    this.currentProject = project;

    this.clearTree();

    let cpnet = this.getCpnetElement(projectData);
    if (!cpnet) {
      return;
    }

    // Create project root node
    const projectNode = this.createProjectNode(projectName, cpnet);

    // Simulation step nodes
    const stepNode = this.createTreeNode('simulation-step-node', 'Step: 0');
    const timeNode = this.createTreeNode('simulation-time-node', 'Time: 0');
    projectNode.children.push(stepNode);
    projectNode.children.push(timeNode);

    // Create project options node
    if (cpnet.options) {
      const optionsNode = this.createOptionsNode('Options', cpnet.options);
      projectNode.children.push(optionsNode);
    }

    const historyNode = this.createTreeNode('History');
    historyNode.classes = ['tree-project'];
    historyNode.children = [this.createTreeNode('* empty *')];

    // let monitorsNode = this.createTreeNode('Monitors');
    // monitorsNode.classes = ['tree-project'];
    // monitorsNode.children = [this.createTreeNode('* empty *')];
    if (cpnet.monitorblock) {
      const monitorsNode = this.createMonitorsRootNode('Monitors', cpnet.monitorblock);
      projectNode.children.push(monitorsNode);
    }

    // Create project Declarations node
    let declarationsNode = this.createTreeNode('Declarations');
    declarationsNode.children = [this.createTreeNode('* empty *')];
    if (cpnet.globbox) {
      declarationsNode = this.createDeclarationsNode('Declarations', cpnet.globbox);
    }

    // Create project Pages node
    let pagesNode = this.createTreeNode('Pages');
    pagesNode.children = [this.createTreeNode('* empty *')];
    if (cpnet.page) {
      pagesNode = this.createPagesNode('Pages', cpnet);
    }

    projectNode.children.push(historyNode);
    projectNode.children.push(declarationsNode);
    projectNode.children.push(pagesNode);

    this.nodes.push(projectNode);

    this.expandNode(projectNode.id);
    this.expandNode(pagesNode.id);
    if (pagesNode.children.length > 0) {
      const firstPageId = pagesNode.children[0].id;
      if (firstPageId) {
        this.expandNode(firstPageId);
        this.gotoNode(firstPageId);
      }
    }
  }

  expandNode(nodeId) {
    setTimeout(() => {
      const treeNode = this.treeComponent.treeModel.getNodeById(nodeId);
      if (treeNode) {
        treeNode.expand();
      }
    }, 100);
  }

  gotoNode(nodeId) {
    setTimeout(() => {
      const treeNode = this.treeComponent.treeModel.getNodeById(nodeId);
      if (treeNode) {
        treeNode.setActiveAndVisible();
      }
    }, 100);
  }

  treeModelChanged(event) {
    console.log('TREE MODEL CHANGES, event = ', event);
  }

  loadProjectData_OLD(project: any) {
    // console.log('LOADPROJECTDATA, project = ', project);
    this.filterText = '';

    this.doUnderlineNodeLabel(false);
    this.openedLabel = [];
    const projectData = project.data;
    const projectName = project.name;
    this.currentProjectModel = project.data;

    this.nodes = [];
    this.treeComponent.treeModel.collapseAll();
    this.updateTree();

    const projectNode = {
      id: 'project',
      // name: 'Project: ' + project.name,
      name: project.name,
      classes: ['tree-project'],
      children: []
    };
    this.nodes.push(projectNode);
    const OptionsNode = {
      id: 'Options',
      name: 'Options',
      children: []
    };
    projectNode.children.push(OptionsNode);
    let cpnet;

    if (projectData.workspaceElements) {
      if (projectData.workspaceElements instanceof Array) {
        for (const workspaceElement of projectData.workspaceElements) {
          if (workspaceElement.cpnet) {
            cpnet = workspaceElement.cpnet;
            break;
          }
        }
      } else {
        if (projectData.workspaceElements.cpnet) {
          cpnet = projectData.workspaceElements.cpnet;
        }
      }
    }

    if (cpnet) {
      if (cpnet.globbox) {
        if (cpnet.globbox) {
          const DeclarationsNode = {
            id: 'Declarations',
            name: 'Declarations',
            children: []
          };
          projectNode.children.push(DeclarationsNode);
          // GlobBox
          // --------------------------------------
          /* for (const block of cpnet.globbox.block) {
             this.buildGlobboxTree(block, DeclarationsNode);
           }
           if (cpnet.globbox.block.id) {
             this.buildGlobboxTree(cpnet.globbox.block, DeclarationsNode);
           }*/
          this.buildGlobboxTree(cpnet.globbox, DeclarationsNode);

          // this.buildGlobboxTree(cpnet.globbox, DeclarationsNode);
          // this.buildGlobboxTree(cpnet.globbox.block, projectNode);
          // Pages
          // --------------------------------------
          if (cpnet.page) {
            const pagesNode = {
              id: 'Pages',
              name: 'Pages',
              children: []
            };
            projectNode.children.push(pagesNode);
            console.log('cpnet page count: ' + cpnet.page.length);
            if (!cpnet.page.length) {
              this.setPage(cpnet.page, pagesNode, cpnet, false);
            } else {
              for (const page of cpnet.page) {
                if (page.trans && page.trans.length) {
                  for (const tran of page.trans) {
                    if (tran.subst) {
                      this.subpages.push({subpageid: tran.subst._subpage, tranid: tran._id});
                      // this.subpages.push(tran._id);
                    }
                  }
                } else {
                  if (page.trans && page.trans.subst) {
                    this.subpages.push({subpageid: page.trans.subst._subpage, tranid: page.trans._id});
                    // this.subpages.push(page.trans._id);
                  }
                }
              }
              for (const page of cpnet.page) {
                this.setPage(page, pagesNode, cpnet, false);
              }
            }
          }
          // -------------------------------
          const MonitorNode = {
            id: 'Monitors',
            name: 'Monitors',
            children: []
          };
          projectNode.children.push(MonitorNode);
        }
      }
    }

    if (!this.stateTree) {
      this.updateTree();
      setTimeout(() => {
        const node = this.treeComponent.treeModel.getNodeById('project');
        if (node) {
          node.expand();
        }
      }, 100);
    }

  }


  setPage(page: any, pagesNode: any, cpnet: any, isTransit: boolean) {
    console.log('SETPAGE()');
    // Page
    if (page.pageattr && (!this.subpages.find(e => e.subpageid === page._id || e.tranid === page._id) || isTransit)) {
      const pageNode = {
        // id: page['@attributes'].id,
        // name: page.pageattr['@attributes'].name,
        id: page._id,
        name: page.pageattr._name,
        type: 'page',
        cpnElement: page,
        children: []
      };

      pagesNode.children.push(pageNode);

      // Places
      if (page.place) {
        const placesNode = {
          id: 'Places.' + pageNode.id,
          name: 'Places',
          children: []
        };
        //  pageNode.children.push(placesNode);

        for (const place of page.place) {
          const node = {
            // id: place['@attributes'].id,
            id: place._id,
            name: place.text,
            cpnElement: place
          };

          //  placesNode.children.push(node);
        }
      }
      // ---------------------------------------


      // Transitions
      if (page.trans) {
        const transitionNode = {
          id: 'Transitions.' + pageNode.id,
          name: 'Transitions',
          children: []
        };
        // pageNode.children.push(transitionNode);
        if (page.trans.length) {
          for (const trans of page.trans) {
            const node = {
              // id: place['@attributes'].id,
              id: trans._id,
              name: trans.text,
              cpnElement: trans
            };
            if (trans.subst) {
              for (const subpage of cpnet.page) {
                if (subpage._id === trans.subst._subpage) {
                  this.setPage(subpage, pageNode, cpnet, true);
                }
              }
            } else {
              //  transitionNode.children.push(node);
            }
          }
        } else {
          if (page.trans.subst) {
            for (const subpage of cpnet.page) {
              if (subpage._id === page.trans.subst._subpage) {
                this.setPage(subpage, pageNode, cpnet, true);
              }
            }
          } else {
            /*transitionNode.children.push({
              // id: place['@attributes'].id,
              id: page.trans._id,
              name: page.trans.text,
              cpnElement: page.trans
            });*/
          }
        }
      }

      // Arcs
      if (page.arc) {
        const arcNode = {
          id: 'Arcs.' + pageNode.id,
          name: 'Arcs',
          children: []
        };
        // pageNode.children.push(arcNode);
        if (page.arc.length) {
          for (const arc of page.arc) {
            const node = {
              // id: place['@attributes'].id,
              id: arc._id,
              name: arc.text ? arc.text : arc.annot.text + '(' + arc._id + ')',
              cpnElement: arc
            };
            // arcNode.children.push(node);
          }
        } else {
          /*arcNode.children.push({
            // id: place['@attributes'].id,
            id: page.arc._id,
            name: page.arc.text ? page.arc.text : page.arc.annot.text + '(' + page.arc._id + ')',
            cpnElement: page.arc
          });*/
        }
      }

    }
  }

  downloadFile(data: string) {
    const blob = new Blob([data], {type: 'text/json'});
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  updateTree() {
    this.treeComponent.treeModel.update();
  }


  addNode(tree: any) {
    this.nodes[0].children.push({
      id: 7, name: 'a new child'
    });
    this.updateTree();
  }

  activateNode(event) {
    if (this.selectedNode) {
      this.openedLabel[this.selectedNode.id] = false;
    }

    this.selectedNode = event.node;
    this.openedLabel[this.selectedNode.id] = true;

    console.log(event.node);

    if (event && event.node && event.node.data && event.node.data.type === 'page') {
      // const pageObject = event.node.data.cpnElement;
      const pageObject = event.node.data.cpnElement;
      this.eventService.send(Message.PAGE_OPEN, {pageObject: pageObject, subPages: this.subpages});
    }

    if (this.selectedNode.data.type === 'declaration') {
      this.eventService.send(Message.CHANGE_EXPLORER_TREE, {
        declarationType: this.selectedNode.data.declarationType,
        action: 'select',
        cpnElement: this.selectedNode.data.cpnElement
      });
    }
  }

  hideContextMenu() {
    if (this.lastContextMenuId) {
      $(this.lastContextMenuId).removeClass('show').hide();
    }
  }

  onTreeNodeContextMenu(event, node) {

    this.hideContextMenu();

    const contextMenuId = '#context-menu-' + node.id.replace(' ', '-').toLowerCase();

    console.log('onTreeNodeContextMenu, node = ', node);

    const top = event.pageY;
    const left = event.pageX;
    $(contextMenuId).css({
      display: 'block',
      top: top,
      left: left
    }).addClass('show');

    this.lastContextMenuId = contextMenuId;

    event.preventDefault();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event) {
    this.hideContextMenu();
  }

  saveEditedData(event, node) {
    // console.log('saveEditedData(), event = ', event);

    const htmlElement = event.srcElement || event.target;
    if (!htmlElement) {
      console.error('saveEditedData(), Error: fail to get html element, event = ', event);
      return;
    }

    const value = htmlElement.textContent;
    // console.log('saveEditedData(), value = ', value);
    // console.log('saveEditedData(), node.data.name = ', node.data.name);

    // don't save if value not changed
    if (value === node.data.name) {
      console.log('saveEditedData() - elem not changed');
      return;
    }

    switch (node.data.type) {
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

    this.updateTree();
  }

  /**
   * Updating block node
   * @param node
   * @param newValue
   */
  updateBlockNodeText(node, newValue) {
    node.data.name = newValue; // update tree node text
    node.data.cpnElement.id = newValue; // update cpnElement
  }


  /**
   * Updating page node
   * @param node
   * @param newValue
   */
  updatePageNodeText(node, newValue) {
    node.data.name = newValue; // update tree node text
    node.data.cpnElement.pageattr._name = newValue; // update cpnElement
  }

  /**
   * Updating declaration node
   * @param node
   * @param newValue
   */
  updateDeclarationNodeText(node, newValue) {
    node.data.name = newValue; // update tree node text
    // node.data.cpnElement.pageattr._name = newValue; // update cpnElement

    const oldCpnType = node.data.declarationType;

    const result = this.modelService.stringToCpnDeclarationElement(
      node.data.cpnElement,
      newValue);
    node.data.cpnElement = result.cpnElement;
    node.data.declarationType = result.cpnType;

    // console.log('updateDeclarationNodeText(). parsing result = ', result);

    if (oldCpnType !== node.data.declarationType) {
      var cpnParentElement = node.parent.data.cpnElement;
      const cpnElement = node.data.cpnElement;
      const cpnType = node.data.declarationType;

      // console.log('updateDeclarationNodeText(). cpnParentElement = ', cpnParentElement);
      // console.log('updateDeclarationNodeText(). cpnElement = ', cpnElement);
      // console.log('updateDeclarationNodeText(). oldCpnType = ', oldCpnType);
      node.parent.data.cpnElement = this.removeCpnElement(cpnParentElement, cpnElement, oldCpnType);
      // console.log('updateDeclarationNodeText(). node.parent.data.cpnElement = ', node.parent.data.cpnElement);

      cpnParentElement = node.parent.data.cpnElement;
      node.parent.data.cpnElement = this.addCpnElement(cpnParentElement, cpnElement, cpnType);
    }
  }

  /**
   * Remove cpn element from it's parent
   * @param cpnParentElement
   * @param cpnElement
   * @param cpnType - old cpn type from where cpn element should be removed
   */
  removeCpnElement(cpnParentElement, cpnElement, cpnType) {
    if (!cpnParentElement) {
      console.error('ProjectExplorerComponent.removeCpnElement(). ERROR: Undefined cpnParentElement element.');
      return;
    }
    if (!cpnElement) {
      console.error('ProjectExplorerComponent.removeCpnElement(). ERROR: Undefined cpnElement element.');
      return;
    }
    if (!cpnType) {
      console.error('ProjectExplorerComponent.removeCpnElement(). ERROR: Undefined cpnType.');
      return;
    }

    if (cpnParentElement[cpnType]) {
      if (cpnParentElement[cpnType] instanceof Array) {
        cpnParentElement[cpnType] = cpnParentElement[cpnType].filter((e) => {
          return e._id !== cpnElement._id;
        });
        if (cpnParentElement[cpnType].length === 0) {
          cpnParentElement[cpnType] = undefined;
        }
      } else {
        cpnParentElement[cpnType] = undefined;
      }
    }
    return cpnParentElement;
  }

  /**
   * Add cpn element to parent
   * @param cpnParentElement
   * @param cpnElement
   * @param cpnType - new cpn type where cpn element should be placed
   */
  addCpnElement(cpnParentElement, cpnElement, cpnType) {
    if (!cpnParentElement) {
      console.error('ProjectExplorerComponent.addCpnElement(). ERROR: Undefined cpnParentElement element.');
      return;
    }
    if (!cpnElement) {
      console.error('ProjectExplorerComponent.addCpnElement(). ERROR: Undefined cpnElement element.');
      return;
    }
    if (!cpnType) {
      console.error('ProjectExplorerComponent.addCpnElement(). ERROR: Undefined cpnType.');
      return;
    }

    if (cpnParentElement[cpnType] instanceof Array) {
      cpnParentElement[cpnType].push(cpnElement);
    } else if (cpnParentElement[cpnType]) {
      cpnParentElement[cpnType] = [cpnParentElement[cpnType], cpnElement];
    } else {
      cpnParentElement[cpnType] = cpnElement;
    }
    return cpnParentElement;
  }

  saveEditedData_OLD(event) {
    console.log('saveEditedData(), event = ', event);

    const htmlElement: HTMLInputElement = <HTMLInputElement>event.target;

    if (htmlElement && (htmlElement.className.search('editablenode') > -1)) {
      // сохраняем изменения, только если они были
      if (this.editableNode.data.name.toString() !== htmlElement.innerText) {
        this.editableNode.data.name = htmlElement.innerText;
        if (this.editableNode.data.cpnElement && this.editableNode.data.cpnElement.type === 'page') {
          this.editableNode.data.cpnElement.pageattr._name = this.editableNode.data.name;
          this.eventService.send(Message.CHANGE_NAME_PAGE, {
            id: this.editableNode.id,
            name: this.editableNode.data.name,
            changedElement: 'page',
            parentPage: this.editableNode.parent.data.name
          });
        } else {
          // this.modelService.sendChangingElementToDeclarationPanel(
          //   this.editableNode,
          //   this.editableNode.parent.parent ? this.editableNode.parent.data.name : 'project',
          //   'rename',
          //   this.editableNode.data.id,
          //   this.getCurrentBlock(this.editableNode).id,
          //   this.treeComponent.treeModel.getState());
        }
      }
    }
  }


  canCreate(node): boolean {
    return node && ((node.id === 'Pages' || node.data.type === 'page' || node.id === 'Declarations')
      || (!this.modelService.paramsTypes.includes(node.parent.data.name) && (this.modelService.paramsTypes.includes(node.data.name))));
  }

  canEdit(node): boolean {
    // return node &&
    //   !this.reservedWords.includes(node.data.name) &&
    //   !this.modelService.paramsTypes.includes(node.data.name);
    return node && node.data && node.data.editable ? true : false;
  }

  canDelete(node): boolean {
    return node && !this.reservedWords.includes(node.data.name) && !this.modelService.paramsTypes.includes(node.data.name);
  }

  canCreateBlock(node): boolean {
    return (this.isDeclarationBlock(node)
      && !this.modelService.paramsTypes.includes(node.data.name)
      && !this.modelService.paramsTypes.includes(node.parent.data.name));
  }

  canCreateDeclaration(node): boolean {
    return (this.isDeclarationBlock(node)
      && !this.modelService.paramsTypes.includes(node.data.name)
      && !this.modelService.paramsTypes.includes(node.parent.data.name));
  }

  changeFilter(filterText) {
    this.filterText = filterText;

    if (this.filterText !== '') {
      this.treeComponent.treeModel.filterNodes((node) => {
        // console.log(this.constructor.name, 'this.treeComponent.treeModel.filterNodes, node = ', node);
        return node.data.name.toString().toLowerCase().includes(this.filterText.toLowerCase());
      });
    } else {
      this.treeComponent.treeModel.clearFilter();
    }
  }

}

