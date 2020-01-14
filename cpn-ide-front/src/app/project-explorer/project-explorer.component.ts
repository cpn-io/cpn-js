import { Component, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
// import {NgxXml2jsonService} from 'ngx-xml2json';
import { EventService } from '../services/event.service';
import { Message } from '../common/message';
import { ProjectService } from '../services/project.service';
import { TreeComponent, TREE_ACTIONS } from 'angular-tree-component';
import { ModelService } from '../services/model.service';
import { ColorDeclarationsPipe } from '../pipes/color-declarations.pipe';
import { OptionsNamePipePipe } from '../pipes/options-name.pipe';
import { AccessCpnService } from '../services/access-cpn.service';
import { SettingsService } from '../services/settings.service';
import { ValidationService } from '../services/validation.service';
import { nodeToArray } from '../common/utils';
import { MonitorType } from '../common/monitors';

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

  /**
   * treeComponent - component for displaying project tree
   */
  @ViewChild('tree', {static: false}) treeComponent: TreeComponent;

  monitorType = MonitorType;

  cpnElementType = {
    place: 'cpn:Place',
    transition: 'cpn:Transition'
  };

  JSON = JSON;

  tabList = [
    { id: 'projectTree', name: 'Project explorer' },
    // { id: 'explorerPanel', name: 'Project explorer (Old)' },
    { id: 'applicationSettings', name: 'Application settings' },
  ];

  idNodeCounter = 0;
  newPageCount = 0;

  lastContextMenuId;

  treeState;

  selectedNode;
  createMonitorIntent = null;

  filterText = '';

  reservedWords = ['project', 'Declarations', 'Monitors', 'Options', 'Default', 'Pages', 'globbox'];
  paramsTypes = ['ml', 'colset', 'var', 'globref'];

  // subscription: Subscription;
  modelName;
  subpages = [];
  editableNode;

  editActions = ['clone', 'enable', 'enable_all', 'disable', 'disable_all', 'delete'];

  // error identificators
  errorIds = [];

  colorDeclarationsPipe;


  nodes = [];

  // Step and Time nodes
  stepNode;
  timeNode;
  monitorsNode;

  // Множество идентификаторов узлов, которые должны быть подсвечены снизу в даный момент
  underlineNodeSet = new Set();

  // Множество идентификаторов узлов, которые должны быть подсвечены снизу в даный момент
  disabledNodeSet = new Set();

  // Состояние укороченных названий узлов
  openedLabel = [];

  options = {
    allowDrag: true,

    allowDrop: (element, { parent, index }) => {

      console.log('allowDrop, element ', element.data.type, ' to ', parent.data.type, ' index = ', index);

      let permis = false;
      if (element && parent) {
        if (element.data.type === 'declaration' || element.data.type === 'block') {
          permis = (element.data.type === 'declaration' && parent.data.type === 'block' ||
            element.data.type === 'block' && parent.data.id === 'Declarations') &&
            this.isOneGroup({ from: element, to: { index: index, parent: parent } }) ? true : false;
        }
      }

      return permis;
    },

    actionMapping: {
      mouse: {
        contextMenu: (model: any, node: any, event: any) => {
          this.onTreeNodeContextMenu(event, node);
        },
        drop: (tree, node, $event, { from, to }) => {
          this.moveNodeInTree(tree, node, $event, { from, to });
        }
      }
    }
  };


  /**
   * Constructor
   * @param {NgxXml2jsonService} xml2jsonService - xml to json service provider
   */
  constructor(
    private eventService: EventService,
    private settings: SettingsService,
    private modelService: ModelService,
    private _colorDeclarationsPipe: ColorDeclarationsPipe,
    private accessCpnService: AccessCpnService,
    private validationService: ValidationService) {

    this.colorDeclarationsPipe = this._colorDeclarationsPipe;
  }

  ngOnInit() {
    // const self = this;

    // this.eventService.on(Message.PROJECT_LOAD, (event) => {
    //   if (event.project) {
    //     this.treeState = {};
    //     this.loadProject(event.project);
    //   }
    // });

    // this.eventService.on(Message.MODEL_RELOAD, () => {
    //   const project = this.modelService.getProject();
    //   console.log('MODEL_RELOAD, project = ', project);
    //   if (project) {
    //     this.loadProject(project);
    //   }
    //   this.treeState = localStorage.treeState && JSON.parse(localStorage.treeState);
    // });

    // this.eventService.on(Message.DECLARATION_CHANGED, (event) => {
    //   if (event.cpnElement && event.newTextValue) {
    //     this.updateTreeNodeByCpnElement(event.cpnElement, event.newTextValue);
    //   }
    // });

    // this.eventService.on(Message.TREE_UPDATE_PAGES, (event) => {
    //   this.updatePagesNode(event.currentPageId);
    // });

    // this.eventService.on(Message.PAGE_CREATE_SUBST, (event) => {
    //   const subpageCpnElement = this.modelService.createSubpage(event.cpnElement, event.subPageName, event.subPageId);
    //   this.updatePagesNode(event.currentPageId);

    //   this.eventService.send(Message.PAGE_UPDATE_SUBST, {
    //     cpnElement: event.cpnElement,
    //     subpageName: subpageCpnElement.pageattr._name
    //   });
    // });

    // this.eventService.on(Message.SHAPE_HOVER, (data) => {
    //   this.underlineRelations(data.element);
    // });

    // this.eventService.on(Message.SHAPE_OUT, (data) => {
    //   this.doUnderlineNodeLabel(false);
    // });

    // this.eventService.on(Message.SHAPE_SELECT, (data) => {
    //   const element = data.element.labelTarget ?
    //     data.element.labelTarget.labelTarget || data.element.labelTarget :
    //     data.element;

    // });

    // // Update monitors
    // this.eventService.on(Message.MONITOR_CREATED, (event) => {
    //   if (event.newMonitorCpnElement) {
    //     this.loadProject(this.modelService.getProject());

    //     const nodeId = event.newMonitorCpnElement._id;
    //     this.expandNode(nodeId);
    //     this.gotoNode(nodeId);
    //   }
    // });

    // // Update monitors
    // this.eventService.on(Message.MONITOR_CHANGED, (event) => {
    //   if (event.monitorCpnElement) {
    //     this.loadProject(this.modelService.getProject());
    //     const nodeId = event.monitorCpnElement._id;
    //     this.expandNode(nodeId);
    //     this.gotoNode(nodeId);
    //   }
    // });

    // // Update monitors
    // this.eventService.on(Message.MONITOR_DELETED, (event) => {
    //   this.loadProject(this.modelService.getProject());
    //   const nodeId = 'Monitors';
    //   this.expandNode(nodeId);
    //   this.gotoNode(nodeId);
    // });

    // // Get error identificators
    // this.eventService.on(Message.SERVER_INIT_NET_DONE, (event) => {
    //   this.errorIds = [];
    //   for (const id of Object.keys(this.accessCpnService.getErrorData())) {
    //     this.errorIds.push(id);
    //   }

    //   // expand error nodes
    //   for (const id of this.errorIds) {
    //     this.expandParentNode(id);
    //   }
    // });

    // this.eventService.on(Message.SIMULATION_UPDATE_STATE, (event) => {
    //   const stateData = this.accessCpnService.getStateData();
    //   if (stateData) {
    //     this.stepNode.name = 'Step: ' + stateData.step;
    //     this.timeNode.name = 'Time: ' + stateData.time;
    //   } else {
    //     this.stepNode.name = 'Step: 0';
    //     this.timeNode.name = 'Time: 0';
    //   }
    //   this.updateTree();
    // });

    // this.eventService.on(Message.TREE_SELECT_DECLARATION_NODE, (event) => {
    //   console.log(self.constructor.name, 'SELECT_DECLARATION_NODE, event = ', event);
    //   if (event && event.sender !== self) {
    //     if (event.cpnElement) {
    //       this.gotoNode(event.cpnElement._id);
    //     }
    //   }
    // });
  }

  ngOnDestroy() {
  }

  getIndexToDrop(toIndex, type, target) {
    let startIndex = 0;
    for (let i = 0; i < target.parent.data.children.length; i++) {
      if (target.parent.data.children[i].declarationType === type) {
        startIndex = i;
        break;
      }
    }
    return toIndex - startIndex;
  }

  isOneGroup(data) {
    if (!data) {
      return false;
    }

    const element = data.from;
    const parent = data.from.parent;
    const index = data.to.index;
    const prevNode = parent.data.children[index - 1];
    const currNode = parent.data.children[index];

    return (
      (element.data.type === 'declaration' || element.data.type === 'block') &&
      ((currNode && currNode.declarationType === element.data.declarationType)
        || (prevNode && (prevNode.declarationType === element.data.declarationType))
        || ((!prevNode || !currNode) && !parent.data.cpnElement[element.data.declarationType]))
    );
  }

  setState(state) {
    console.log(this.constructor.name, 'setState(), state = ', state);

    localStorage.treeState = JSON.stringify(state);
  }

  updatePagesNode(currentPageId) {
    const cpnet = this.modelService.getCpn();
    if (!cpnet) {
      return;
    }

    const projectNode = this.nodes[0];
    const pagesNode = this.createPagesNode('Pages', cpnet);
    console.log('updatePagesNode(), pagesNode = ', pagesNode);

    projectNode.children[projectNode.children.length - 1] = pagesNode;
    this.updateTree();

    if (currentPageId) {
      this.expandNode(currentPageId);
      // this.gotoNode(currentPageId);
    }
  }

  moveNodeInTree(tree, node, $event, { from, to }) {
    console.log('dragAndDrop, from ', from, ' to ', to);
    console.log('dragAndDrop, moveNode ', node.name, ' to ', to.parent.name, ' at index ', to.index);

    const parentJson = from.parent.data.cpnElement;
    const type = node.data.type === 'page'
      ? 'page'
      : this.paramsTypes.includes(from.parent.data.declarationType) ? undefined : from.data.declarationType;

    const isEntryExist: boolean = to.parent.data.cpnElement[type];
    this.modelService.moveNonModelJsonElement(
      from.data.cpnElement,
      parentJson,
      to.parent.data.cpnElement,
      this.getIndexToDrop(to.index, type, to), type);

    TREE_ACTIONS.MOVE_NODE(tree, node, $event, { from, to });

    // this.eventService.send(Message.MODEL_CHANGED);
  }

  getNodeByCpnElement(cpnElement) {
    return this.treeComponent.treeModel.getNodeBy((node) => {
      // return node.data && node.data.cpnElement === cpnElement;
      return node.data && node.data.id === cpnElement._id;
    });
  }

  /**
   * Find tree node by cpn element and update it's name
   * @param cpnElement
   */
  updateTreeNodeByCpnElement(cpnElement, newTextValue) {
    console.log(this.constructor.name, 'updateTreeNodeByCpnElement(), cpnElement, newTextValue = ', cpnElement, newTextValue);

    const nodeForUpdate = this.getNodeByCpnElement(cpnElement);

    console.log(this.constructor.name, 'updateTreeNodeByCpnElement(), nodeForUpdate = ', nodeForUpdate);

    if (nodeForUpdate && nodeForUpdate.data) {
      switch (nodeForUpdate.data.type) {
        case 'block':
          this.updateBlockNodeText(nodeForUpdate, newTextValue);
          break;
        case 'declaration':
          this.updateDeclarationNodeText(nodeForUpdate, newTextValue);
          break;
        case 'page':
          this.updatePageNodeText(nodeForUpdate, newTextValue);
          break;
      }

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

    if (element.type === this.cpnElementType.place) {

      // подчеркиваем тип
      if (element.cpnElement.type && element.cpnElement.type.text) {
        this.underlineRelationsRecursively(this.nodes[0], element.cpnElement.type.text.toString());
      }

      // разбираем инитмарк и находим в нем литералы
      if (element.cpnElement.initmark && element.cpnElement.initmark.text) {
        this.processMlCodeRecursively(element.cpnElement.initmark.text.toString());
      }

    } else if (element.type === this.cpnElementType.transition) {
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
    this.underlineInMonitors(element.id);
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
      if (arc.annot && arc.annot.text) {
        this.processMlCodeRecursively(arc.annot.text.toString());
      }
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

  underlineInMonitors(id) {
    let found = false;
    for (const monitors of this.nodes[0].children) {
      if (monitors.id === 'Monitors' && monitors.children) {
        for (const monitor of monitors.children) {
          if (monitor.children) {
            for (const nodesOrdered of monitor.children) {
              if (nodesOrdered.name === 'Nodes ordered by pages' && nodesOrdered.children) {
                for (const page of nodesOrdered.children) {
                  if (page.children) {
                    for (const idref of page.children) {
                      const refs = idref.id.split('_');
                      if (refs.indexOf(id) > -1) {
                        found = true;
                        this.doUnderlineNodeLabel(true, idref.id);
                        break;
                      }
                    }
                    if (found) {
                      this.doUnderlineNodeLabel(true, page.id);
                      break;
                    }
                  }
                }
                if (found) {
                  this.doUnderlineNodeLabel(true, nodesOrdered.id);
                  break;
                }
              }
            }
            if (found) {
              this.doUnderlineNodeLabel(true, monitor.id);
              this.doUnderlineNodeLabel(true, monitors.id);
              found = false;
              continue;
            }
          }
        }
        break;
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
      if (parentNode.type === 'monitor_ref') {
        if (parentNode.name === name) {
          this.doUnderlineNodeLabel(true, parentNode.id);
          return true;
        }
      }
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

  isError(id: any) {
    // console.log('isError(), errorIds, id = ', this.errorIds, id);
    return this.errorIds.includes(id);
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

    let cpnElement, newNode;

    let cpnParentElement = treeNode.data.cpnElement;
    if (['declaration', 'page'].includes(treeNode.data.type)) {
      if (!treeNode.parent || !treeNode.parent.data) {
        console.error('onAddNode(), ERROR: Fail to get parent node for treeNode = ', treeNode);
        return;
      }
      cpnParentElement = treeNode.parent.data.cpnElement;
    }

    const defValue = this.settings.appSettings[type];

    let cpnType;

    switch (type) {
      case 'block':
        cpnElement = this.modelService.createCpnBlock(defValue);
        newNode = this.createBlockNode(cpnElement);
        cpnType = 'block';
        break;

      case 'declaration':
        cpnElement = this.modelService.createCpnDeclaration(defValue);
        newNode = this.createDeclarationNode(cpnElement);
        cpnType = newNode.cpnType;
        break;

      case 'page':
        cpnElement = this.modelService.createCpnPage(defValue + ' ' + (++this.newPageCount));
        newNode = this.createPageNode(cpnElement);
        cpnType = 'page';
        break;
    }

    this.addCreatedNode(treeNode, newNode, cpnElement, cpnType, cpnParentElement, true);

    // this.eventService.send(Message.MODEL_CHANGED);

    if (type === 'page') {
      // update instances
      this.modelService.updateInstances();
    }
  }

  addCreatedNode(treeNode, newNode, cpnElement, cpnType, cpnParentElement, gotoEdit = false) {
    // console.log('onAddNode(), cpnType = ', cpnType);
    // console.log('onAddNode(), cpnParentElement = ', cpnParentElement);
    // console.log('onAddNode(), cpnElement = ', cpnElement);
    // console.log('onAddNode(), treeNode = ', treeNode);

    this.modelService.addCpnElement(cpnParentElement, cpnElement, cpnType);

    if (newNode) {
      if (treeNode.data.children && !(['declaration', 'page'].includes(treeNode.data.type))) {
        treeNode.data.children.push(newNode);
      } else if (treeNode.parent) {
        treeNode.parent.data.children.push(newNode);
      }

      this.treeComponent.treeModel.update();

      if (gotoEdit) {
        setTimeout(() => {
          this.treeComponent.treeModel.getNodeById(newNode.id).setActiveAndVisible();
          this.goToEditNode(newNode.id);
        }, 100);
      }
    }
  }

  onUpNode() {
    const direction = 'up';
    this.moveDeclUpDown(this.getDataForMoving(direction), direction);
  }

  onDownNode() {
    const direction = 'down';
    this.moveDeclUpDown(this.getDataForMoving(direction), direction);
  }

  moveDeclUpDown(data, direction) {
    if (this.isOneGroup(data)) {
      this.treeComponent.treeModel.moveNode(data.from, data.to);
      this.modelService.moveNonModelJsonElement(
        data.from.data.cpnElement,
        data.from.parent.data.cpnElement,
        data.from.parent.data.cpnElement,
        direction === 'down' ? data.to.index - 1 : data.to.index,
        data.type);
    }

    // this.eventService.send(Message.MODEL_CHANGED);
    //  this.moveNodeInTree(this.treeComponent, treeNode.parent, undefined, {from, to});
  }


  getDataForMoving(direction) {
    const treeNode = this.treeComponent.treeModel.getActiveNode();
    if (!treeNode) {
      return null;
    }
    return {
      from: treeNode,
      type: treeNode.data.cpnType ? treeNode.data.cpnType : treeNode.data.declarationType || treeNode.data.type,
      to: { index: direction === 'down' ? treeNode.parent.data.children.indexOf(treeNode.data) + 2 : treeNode.parent.data.children.indexOf(treeNode.data) - 1, parent: treeNode.parent }
    };

    // this.eventService.send(Message.MODEL_CHANGED);
  }


  /**
   * Deleting node from the tree
   *
   * @param treeNode - tree node object (in terms of tree model)
   */
  onDeleteNode(treeNode) {
    console.log('onDeleteNode(), node = ', treeNode);

    // let cpnParentElement = treeNode.data.cpnElement;
    // if (['declaration', 'page'].includes(treeNode.data.type)) {
    //   if (!treeNode.parent || !treeNode.parent.data) {
    //     console.error('onAddNode(), ERROR: Fail to get parent node for treeNode = ', treeNode);
    //     return;
    //   }
    //   cpnParentElement = treeNode.parent.data.cpnElement;
    // }

    if (treeNode.parent) {
      const cpnElement = treeNode.data.cpnElement;
      if (cpnElement) {
        this.modelService.deleteFromModel(cpnElement);
      }

      const parentChildren = treeNode.parent.data.children;
      if (parentChildren) {

        const indexElem = parentChildren.indexOf(treeNode.data);
        let deleted = false;

        if (treeNode.data) {
          if (treeNode.data.type === 'declaration') {

            this.modelService.deleteElementInBlock(treeNode.parent.data.cpnElement, treeNode.data.cpnType, treeNode.id);
            deleted = true;

          } else if (treeNode.data.type === 'page') {

            const allPages = this.modelService.getAllPages();

            // if (allPages.length > 1) {

            let upperPage;
            if (treeNode.parent.id !== 'Pages') {
              upperPage = treeNode.parent.data.cpnElement;
            } else {
              if (indexElem !== 0) {
                upperPage = treeNode.parent.children[indexElem - 1].data.cpnElement;
              } else {
                if (treeNode.parent.data.children.length > 1) {
                  upperPage = treeNode.parent.children[indexElem + 1].data.cpnElement;
                }
              }
            }
            if (upperPage) {
              this.eventService.send(Message.PAGE_TAB_OPEN, { pageObject: upperPage });
            }

            this.modelService.deleteFromModel(treeNode.data.cpnElement);

            // update instances
            this.modelService.updateInstances();

            this.eventService.send(Message.PAGE_TAB_CLOSE, { id: treeNode.id });
            this.eventService.send(Message.MODEL_RELOAD);

            deleted = true;

            // }

          } else if (treeNode.data.type === 'block') {

            this.modelService.deleteFromModel(treeNode.data.cpnElement);
            deleted = true;

          } else if (treeNode.data.type === 'monitor') {

            this.modelService.deleteFromModel(treeNode.data.cpnElement);
            deleted = true;

          }
        }

        if (deleted) {
          parentChildren.splice(indexElem, 1);
          this.treeComponent.treeModel.update();
        }

      }

      // this.eventService.send(Message.MODEL_CHANGED);
    }
  }

  onNodeArrowClick(event, node) {
    this.openedLabel[node.id] = !this.openedLabel[node.id];
    if (this.openedLabel[node.id]) {
      this.openNode(event, node);
      this.goToEditNode(node.id);
    } else {
      // this.saveEditedData(event, node);
    }
  }

  onNodeClick(event, node) {
    console.log(this.constructor.name, 'onNodeClick(), node = ', node);


    if (!this.openedLabel[node.id]) {
      this.onNodeArrowClick(event, node);
    } else {
      this.goToEditNode(node.id);
    }
  }

  onNodeDblClick(event, node) {
    this.onNodeClick(event, node);

    if (this.selectedNode.data.type === 'declaration') {
      this.sendSelectDeclarationNode(this.selectedNode, true);
    }
  }

  sendSelectDeclarationNode(node, openEditor) {
    this.eventService.send(Message.TREE_SELECT_DECLARATION_NODE, {
      sender: this,
      openEditorTab: openEditor,
      cpnType: node.data.cpnType,
      cpnElement: node.data.cpnElement
    });
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
    this.eventService.send(Message.TREE_OPEN_DECLARATION_NODE, { id: currentNode.id });

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
   * cancel creating monitor
   * @param event
   */
  @HostListener('document:keydown', ['$event'])
  onKeyEvent(event: KeyboardEvent) {
    // console.log('project-explorer Keyboard event ', event);
    let code: number | string;

    if (event.code !== undefined) {
      code = event.code;
    } else if (event.keyCode !== undefined) {
      code = event.keyCode;
    }
    if (code === 'Escape' || code === 27) {
      if (this.createMonitorIntent) {
        this.clearCreateMonitorIntent();
      }
    }
  }

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

          // if (htmlTableElement.id === 'application-settings-table') {
          //   const rows = htmlTableElement.rows.length;

          //   for (let i = 0; i < rows; i += 1) {
          //     const value = htmlTableElement.rows[i].cells[1].textContent;
          //     const name = htmlTableElement.rows[i].cells[0].textContent;
          //     this.appSettings[name] = value;
          //   }

          // }

          // this.showTable = 'application-settings-table';
          // setTimeout(() => {
          //   this.showTable = 'not';
          // }, 0);

        }

      }
    } else if (code === 'Escape' || code === 27) {
      console.log('keyEvent. code = ', code);
      if (this.createMonitorIntent) {
        console.log('keyEvent. code = ', code);
        this.clearCreateMonitorIntent();
      }
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

  /**
   * Clear tree component
   */
  clearTree() {
    if (this.treeComponent) {
      this.treeComponent.treeModel.collapseAll();
      this.nodes = [];
      this.updateTree();
    }
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

    console.log('createDeclarationsNode(), cpnElement = ', cpnElement);

    if (cpnElement.block) {
      if (cpnElement.block instanceof Array) {
        for (const block of cpnElement.block) {
          declarationsNode.children.push(this.createBlockNode(block));
        }
      } else {
        declarationsNode.children.push(this.createBlockNode(cpnElement.block));
      }
    } else {
      declarationsNode.children.push(this.createBlockNode(cpnElement));
    }

    return declarationsNode;
  }

  /**
   * Creating project Block node
   * @param cpnElement - cpn JSON object
   * @returns - tree node
   */
  createBlockNode(cpnElement) {
    // console.log('createBlockNode(), cpnElement = ', cpnElement);

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
    let declarationNode = this.createTreeNode('* empty declaration *');
    if (cpnElement) {
      declarationNode.id = cpnElement._id;
      declarationNode.name = cpnElement.layout;
      declarationNode.cpnElement = cpnElement;
      declarationNode.type = 'declaration';
      declarationNode.children = undefined;
      declarationNode.cpnType = 'ml';
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
          declarationNode.cpnType = key;
          declarationNode.declarationType = key;
          break;
      }
    }
    declarationNode.editable = true;
    declarationNode.actions = ['block', 'declaration', 'delete'];
    return declarationNode;
  }


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

    const pageNodeList = [];

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
    const subpages = [];
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
    const subpages = [];
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

  isExistsEditSection(selNode): boolean {
    return selNode && selNode.data && selNode.data.actions &&
      (selNode.data.actions.includes('enable') ||
        selNode.data.actions.includes('enable_all') ||
        selNode.data.actions.includes('disable') ||
        selNode.data.actions.includes('disable_all') ||
        selNode.data.actions.includes('delete') ||
        selNode.data.actions.includes('clone'));
  }

  canDoEditAction(selectedNode, editAction: string) {
    return selectedNode &&
      selectedNode.data &&
      selectedNode.data.actions &&
      selectedNode.data.actions.includes(editAction) &&
      this.editActions.includes(editAction);
  }
  // <editor-fold desc="Creating monitors nodes and actions">

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
    monitorsNode.type = 'monitors';
    monitorsNode.actions = ['block', 'disable_all', 'enable_all'];

    const monitorsNodeList = [];

    // Monitor nodes, create and save it to monitorsNodeList
    for (const monitor of nodeToArray(cpnElement.monitor)) {
      const monitorNode = this.createMonitorNode(monitor);
      monitorsNodeList[monitorNode.id] = monitorNode;
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
    const monitorNode = this.createTreeNode(cpnElement._id, cpnElement._name);
    monitorNode.cpnElement = cpnElement;
    monitorNode.editable = true;
    monitorNode.type = 'monitor';
    monitorNode.actions = ['block', 'clone', 'template', 'delete'];

    // typedescription
    const subnodes11 = [];
    const monTypeNode = this.createTreeNode('monitor_type_' + cpnElement._id, cpnElement._typedescription);
    monTypeNode.cpnElement = cpnElement;
    monTypeNode.type = 'monitor_type';

    // options
    const subnodes12 = [];
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
    // for(let subn of subnodes11) {
    //   subn.actions = ['delete'];
    // }
    monitorNode.children = subnodes11;

    if (cpnElement._disabled === 'true') {
      monitorNode.actions.push('enable');
      this.doDisableMonitorNodeInTree(monitorNode, true);
    } else {
      monitorNode.actions.push('disable');
    }

    return monitorNode;
  }

  // TODO implement
  onCloneMonitor(treeNode) {
  }

  onCreateNewMonitor(monitorType: string) {
    this.createMonitorIntent = monitorType;
    document.body.style.cursor = 'crosshair';
  }

  clearCreateMonitorIntent() {
    this.createMonitorIntent = null;
    document.body.style.cursor = 'default';
  }

  createMonitorOptionNode(cpnElement, option) {
    const monOptNode = this.createTreeNode('monitor_option_' + cpnElement._id, option._name);
    monOptNode.cpnElement = option;
    monOptNode.type = 'monitor_option';
    return monOptNode;
  }

  createMonitorNodesOrderedByPage(cpnElement): any {
    const nobp = this.createTreeNode('nobp_' + cpnElement._id, 'Nodes ordered by pages');
    const subnodes = [];
    const pageinstanceidref = new Map<string, Array<string>>();
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
      const instRefNode = this.createTreeNode(k + '_' + cpnElement._id, k);
      const subnodes1 = [];
      for (const id of pageinstanceidref.get(k)) {
        const idrefNode = this.createTreeNode(id + '_' + cpnElement._id, id);
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
    nobp.actions = ['delete'];
    return nobp;
  }

  findElementOnPageByID(page, idref): any {
    let name = null;
    if (page.trans) {
      for (const trans of nodeToArray(page.trans)) {
        if (trans._id === idref) {
          name = trans.text + ' (Transition)';
          break;
        }
      }
    }

    if (name === null) {
      if (page.place) {
        for (const place of nodeToArray(page.place)) {
          if (place._id === idref) {
            name = place.text + ' (Place)';
            break;
          }
        }
      }
    }
    return name;
  }

  createMonitorDeclaration(decl, cpnElement): any {
    const d = this.createTreeNode('monitor_' + decl._name.split(' ')[0] + '_' + cpnElement._id, decl._name);

    const d1 = this.createTreeNode(decl.ml._id, decl.ml.__text);
    d1.editable = true;
    d1.type = 'monitor_' + decl._name.split(' ')[0];

    d.children = [d1];

    return d;
  }

  isMonitorsSubnode(treeNode): boolean {
    return treeNode && treeNode.data && treeNode.data.type
      && (treeNode.data.type.toString().search('monitor') > -1);
  }

  isMonitorType(treeNode): boolean {
    return treeNode.data && treeNode.data.type
      && treeNode.data.type === 'monitor_type';
  }

  isMonitor(treeNode): boolean {
    return treeNode.data && treeNode.data.type
      && treeNode.data.type === 'monitor';
  }

  isMonitorsRoot(treeNode): boolean {
    return treeNode.data && treeNode.data.type
      && treeNode.data.type === 'monitors';
  }

  isMonitorOption(treeNode): boolean {
    return treeNode.data && treeNode.data.type
      && treeNode.data.type === 'monitor_option';
  }

  isMonitorRef(treeNode): boolean {
    return treeNode.data && treeNode.data.type
      && treeNode.data.type === 'monitor_ref';
  }

  getMonitorOption(node): boolean {
    return node.data &&
      node.data.cpnElement &&
      node.data.cpnElement._value &&
      node.data.cpnElement._value === 'true';
  }

  setMonitorOption(event, node) {
    console.log('setMonitorOption(), event = ', event);
    if (event.target) {
      node.data.cpnElement._value = event.target.checked ? 'true' : 'false';
    }
  }

  onDisableMonitor(treeNode) {
    this.disableMonitor(treeNode, true);
  }

  onEnableMonitor(treeNode) {
    this.disableMonitor(treeNode, false);
  }

  disableMonitor(treeNode, disable: boolean) {
    if (this.isMonitorsRoot(treeNode)) {
      for (const subNode of treeNode.children) {
        subNode.data.cpnElement._disabled = disable.toString();
        subNode.data.actions.pop(disable ? 'disable' : 'enable');
        subNode.data.actions.push(disable ? 'enable' : 'disable');
        this.doDisableMonitorNodeInTree(subNode, disable);
      }
    } else {
      treeNode.data.actions.pop(disable ? 'disable' : 'enable');
      treeNode.data.actions.push(disable ? 'enable' : 'disable');
      treeNode.data.cpnElement._disabled = disable.toString();
      this.doDisableMonitorNodeInTree(treeNode, disable);
    }
  }

  doDisableMonitorNodeInTree(treeNode: any, disable: boolean) {
    this.doDisableNodeInTree(treeNode.id, disable);
    for (const childNode of treeNode.children) {
      this.doDisableMonitorNodeInTree(childNode, disable);
    }
  }

  doDisableNodeInTree(nodeId, disable: boolean) {
    if (disable) {
      this.disabledNodeSet.add(nodeId);
    } else {
      if (this.disabledNodeSet.has(nodeId)) {
        this.disabledNodeSet.delete(nodeId);
      }
    }
  }

  isDisabledNode(nodeId): boolean {
    let disabled = undefined;

    const treeNode = this.treeComponent.treeModel.getNodeById(nodeId);
    if (treeNode) {
      if (treeNode.data && treeNode.data.cpnElement && treeNode.data.cpnElement._disabled) {
        disabled = treeNode.data.cpnElement._disabled === 'true';
      }
    }

    if (disabled === undefined) {
      disabled = this.disabledNodeSet.has(nodeId);
    }

    return disabled;
    // return this.disabledNodeSet.has(nodeId);
  }

  // </editor-fold desc="Monitors">

  isPage(node) {
    return node.data
      && node.data.type === 'page';
  }

  /**
   * Loading project JSON to tree component object
   * @param project - cpn net JSON object
   */
  loadProject(project) {
    this.filterText = '';

    const projectData = project.data;
    const projectName = project.name;

    this.clearTree();

    const cpnet = this.modelService.getCpn(); // this.getCpnetElement(projectData);
    if (!cpnet) {
      return;
    }

    console.log('loadProject(), cpnet = ', cpnet);

    // Create project root node
    const projectNode = this.createProjectNode(projectName, cpnet);

    // Simulation step nodes
    this.stepNode = this.createTreeNode('simulation-step-node', 'Step: 0');
    this.timeNode = this.createTreeNode('simulation-time-node', 'Time: 0');
    projectNode.children.push(this.stepNode);
    projectNode.children.push(this.timeNode);

    // Create project options node
    if (cpnet.options) {
      const optionsNode = this.createOptionsNode('Options', cpnet.options);
      projectNode.children.push(optionsNode);
    }

    // const historyNode = this.createTreeNode('History');
    // historyNode.classes = ['tree-project'];
    // historyNode.children = [this.createTreeNode('* empty *')];

    this.monitorsNode = null;
    if (cpnet.monitorblock) {
      this.monitorsNode = this.createMonitorsRootNode('Monitors', cpnet.monitorblock);
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

    // projectNode.children.push(historyNode);
    projectNode.children.push(declarationsNode);
    if (this.monitorsNode) {
      projectNode.children.push(this.monitorsNode);
    }
    projectNode.children.push(pagesNode);

    this.nodes.push(projectNode);

    this.expandNode(projectNode.id);
    this.expandNode(pagesNode.id);

    // go to first page if no node selected
    // console.log(this.constructor.name, 'loadProject(), treeModel.activeNodeIds = ',
    //   this.treeComponent.treeModel.activeNodeIds);

    if (Object.entries(this.treeState).length < 1 ||
      Object.entries(this.treeComponent.treeModel.activeNodeIds).length < 1) {
      if (pagesNode.children.length > 0) {
        const firstPageId = pagesNode.children[0].id;
        if (firstPageId) {
          this.expandNode(firstPageId);
          this.gotoNode(firstPageId);
        }
      }
    }
  }

  expandParentNode(nodeId) {
    setTimeout(() => {
      if (this.treeComponent) {
        const treeNode = this.treeComponent.treeModel.getNodeById(nodeId);
        if (treeNode && treeNode.parent) {
          treeNode.parent.expand();
        }
      }
    }, 100);
  }

  expandNode(nodeId) {
    setTimeout(() => {
      if (this.treeComponent) {
        const treeNode = this.treeComponent.treeModel.getNodeById(nodeId);
        if (treeNode) {
          treeNode.expand();
        }
      }
    }, 100);
  }

  gotoNode(nodeId) {
    setTimeout(() => {
      if (this.treeComponent) {
        const treeNode = this.treeComponent.treeModel.getNodeById(nodeId);
        if (treeNode) {
          treeNode.setActiveAndVisible();

          const scrollHtmlElement = document.getElementById('tree-scroll-pane');
          const nodeHtmlElement = document.getElementById('node-table-' + treeNode.id);
          if (scrollHtmlElement && nodeHtmlElement) {
            console.log('TREE COTO NODE, nodeHtmlElement = ', nodeHtmlElement.offsetTop);
            scrollHtmlElement.scrollTop = nodeHtmlElement.offsetTop;
          }

        }
      }
    }, 100);
  }

  treeModelChanged(event) {
    console.log('TREE MODEL CHANGES, event = ', event);
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
    const blob = new Blob([data], { type: 'text/json' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  updateTree() {
    if (this.treeComponent && this.treeComponent.treeModel) {
      this.treeComponent.treeModel.update();
    }
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

    this.expandNode(this.selectedNode.id);

    console.log(event.node);

    if (event && event.node && this.isPage(event.node)) {
      this.eventService.send(Message.PAGE_TAB_OPEN, { pageObject: event.node.data.cpnElement });
    }

    if (event && event.node && this.isMonitor(event.node)) {
      this.eventService.send(Message.MONITOR_OPEN, { monitorObject: event.node.data.cpnElement });
    }

    if (this.selectedNode.data.type === 'declaration') {
      this.sendSelectDeclarationNode(this.selectedNode, false);
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

    let value = htmlElement.textContent;

    if (value.trim() === '') {
      value = '* empty *';
    }

    console.log('saveEditedData(), value = ', value);
    console.log('saveEditedData(), node.data.name = ', node.data.name);

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

        this.eventService.send(Message.DECLARATION_CHANGED, {
          cpnElement: node.data.cpnElement,
          newTextValue: htmlElement.textContent
        });
        break;
      case 'page':
        this.updatePageNodeText(node, value);
        break;
    }

    this.updateTree();

    // this.eventService.send(Message.MODEL_CHANGED);

    this.sendSelectDeclarationNode(node, false);
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
    this.eventService.send(Message.PAGE_CHANGE_NAME, { id: node.data.cpnElement._id, name: newValue, parent: node.parent.id });
  }

  /**
   * Updating declaration node
   * @param node
   * @param newValue
   */
  updateDeclarationNodeText(node, newValue) {
    node.data.name = newValue; // update tree node text
    // node.data.cpnElement.pageattr._name = newValue; // update cpnElement

    const oldCpnType = node.data.cpnType;

    const result = this.modelService.stringToCpnDeclarationElement(
      node.data.cpnElement,
      newValue);
    node.data.cpnElement = result.cpnElement;
    node.data.cpnType = result.cpnType;
    node.data.declarationType = result.declarationType;

    console.log('updateDeclarationNodeText(). parsing result = ', result);

    const cpnType = node.data.cpnType;
    const cpnElement = node.data.cpnElement;
    let cpnParentElement = node.parent.data.cpnElement;

    if (cpnType !== oldCpnType) {
      console.log('updateDeclarationNodeText(). cpnParentElement = ', cpnParentElement);
      console.log('updateDeclarationNodeText(). cpnElement = ', cpnElement);
      console.log('updateDeclarationNodeText(). oldCpnType = ', oldCpnType);

      node.parent.data.cpnElement = this.modelService.removeCpnElement(cpnParentElement, cpnElement, oldCpnType);
      console.log('updateDeclarationNodeText(). node.parent.data.cpnElement = ', node.parent.data.cpnElement);

      cpnParentElement = node.parent.data.cpnElement;
      this.modelService.addCpnElement(cpnParentElement, cpnElement, cpnType);
    } else {
      this.modelService.updateCpnElement(cpnParentElement, cpnElement, cpnType);
    }
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
          this.eventService.send(Message.PAGE_CHANGE_NAME, {
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
    if (this.accessCpnService.isSimulation) {
      return false;
    }

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

