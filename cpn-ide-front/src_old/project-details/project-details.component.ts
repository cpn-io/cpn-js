import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Message} from '../common/message';
import {EventService} from '../services/event.service';
import {TabsContainer} from '../tabs/tabs-container/tabs.container';
import {ProjectService} from '../services/project.service';
import {ModelService} from '../services/model.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
  declarations = [];
  selectedElemement;
  currentPojectModel;
  selectedBlock = undefined;
  countNewItems = 0;
  showTable = 'not';
  paramsTypes = ['ml', 'color', 'var', 'globref'];
  standartDeclaration = ['UNIT', 'BOOL', 'INT', 'INTINF', 'TIME', 'REAL', 'STRING'];
  @ViewChild('tabsComponent') tabsComponent: TabsContainer;

  constructor(private eventService: EventService, private projectService: ProjectService, private modelService: ModelService) {
  }

  ngOnInit() {
    // Subscribe on project load event
    this.eventService.on(Message.PROJECT_LOAD, (data) => {
      // console.log('ProjectParametersComponent.ngOnInit(), Message.PROJECT_LOAD, data -> ', data);
      this.loadProjectData(data.project);
      this.currentPojectModel = data.project;
    });
    this.eventService.on(Message.PROJECT_FILE_OPEN, (data) => {
      // console.log('ProjectParametersComponent.ngOnInit(), Message.PROJECT_LOAD, data -> ', data);
      this.loadProjectData(data.project);
      this.currentPojectModel = data.project;
    });

    this.eventService.on(Message.OPEN_DECLARATION_BLOCK, (data) => {
      let tab = this.tabsComponent.tabs.find(e => e.id === data.id);
      if (tab) {
        let oldSelectedTab = this.tabsComponent.getSelectedTab();
        if (oldSelectedTab && !this.paramsTypes.includes(oldSelectedTab.id)) {
          oldSelectedTab.isHidden = true;
        }
        this.tabsComponent.selectTab(tab);
        tab.isHidden = false;
        // let newSelectedTab = document.getElementById(tab.id);
        // if(newSelectedTab) newSelectedTab.hidden = false;
      }

    });

    this.eventService.on(Message.CHANGE_EXPLORER_TREE, (data) => {
      this.explorerTreeChangeHandler(data);
    });


  }


  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }


  explorerTreeChangeHandler(data) {
    switch (data.action) {
      case 'add':
        if (data.element === 'tab') {
          this.createNewTab(data.state, data.target);
        } else {
          this.addItemClick(data.target, data.element, data.state);
        }
        break;
      case 'rename':
        this.changeinExplorerName(data);
        this.eventService.send(Message.UPDATE_TREE, {
          project: this.currentPojectModel,
          state: data.state,
          newNodeId: data.node.id,
          comonBlock: data.target,
          after: 'edit'
        });
        break;
      case 'delete':
        if (data.element === 'tab') {
          this.tabsComponent.deleteTabById(data.id);
          this.declarations = this.declarations.filter(e => e.id !== data.id);
          //cpnet.globbox.block = cpnet.globbox.block.filter(e => e.id !== data.id);
          this.modelService.deleteBlock(data.id);
          this.eventService.send(Message.UPDATE_TREE, {project: this.currentPojectModel, state: data.state});
        } else {
          let afterDelDec;
          if (data.element) {
            afterDelDec = this.declarations.find(e => e.id === data.target);
            // afterDelDec[data.element] = afterDelDec[data.element].filter(elem => elem._id !== data.id);
            this.modelService.deleteElementInBlock(afterDelDec, data.element, data.id);
          } else {
            //let block = this.declarations.find(elem => elem.id === data.target);
            this.modelService.deleteBlock(data.id);
            //delete block[data.id];
          }
          this.eventService.send(Message.UPDATE_TREE, {project: this.currentPojectModel, state: data.state});
        }
        break;

      default:

    }
  }


  newTabDblClick(tabid) {
    if (event.target['className'] !== 'tabs__tab active') {
      console.log('DBL CLICK new tab------------');
      this.createNewTab(undefined, '');
    } else {
      //this.tabsComponent.selectTab(this.tabsComponent.tabs[0])
      console.log('double click tab for rename tab');
    }
  }

  createNewTab(state, id) {
    let newTabBlock = {
      _id: 'ID' + new Date().getTime(),
      id: this.projectService.getAppSettings()['block'] + (++this.countNewItems)
    };
    this.declarations.push(newTabBlock);
    let targetBlock = this.findblockById(id, this.modelService.getCpn().globbox.block);
    this.modelService.createNewBlock(newTabBlock, targetBlock);
    console.log('add new tab');
    this.eventService.send(Message.UPDATE_TREE, {project: this.currentPojectModel, state: state, newNodeId: newTabBlock.id});
  }


  sendMlToMlEditor(value: any) {
    // console.log("DOUBLECLICK");
    // EmitterService.getAppMessageEmitter().emit({
    //   id: Constants.ACTION_SML_TO_EDITOR,
    //   fn: { data: value }
    // });
    this.eventService.send(Message.SML_TO_EDITOR, {fn: {data: value}});
  }


  /**
   * add Parameters button click handler
   */
  addItemClick(blockId, elementType, state) {
    let comBlocks = false;
    if (blockId === elementType) {
      blockId = this.selectedBlock;
      comBlocks = true;
    }
    console.log('add variable click');
    const cpnet = this.modelService.getCpn();
    let newNode;
    if (this.declarations) {
      let block = this.declarations.find(elem => elem.id === blockId);
      newNode = this.modelService.addItemToBlock(block, elementType);
      // if (!block[elementType]) {
      //   newNode = this.newElemetn(elementType);
      //   block[elementType] = [newNode];
      //   //////create new elemenetType whith
      // } else {
      //   newNode = this.newElemetn(elementType);
      //   block[elementType].push(newNode);
      // }
    }
    if (blockId) {
      blockId = undefined;
    }
    this.eventService.send(Message.UPDATE_TREE, {
      project: this.currentPojectModel,
      state: state,
      newNodeId: newNode._id,
      comonBlock: comBlocks
    });
  }

  //
  // newElemetn(elementType): any {
  //   switch (elementType) {
  //     case 'var':
  //       return {id: this.projectService.getAppSettings()[elementType] + (++this.countNewItems), type: {id: this.projectService.getAppSettings()[elementType]}, _id: 'ID' + new Date().getTime()};
  //       break;
  //     case 'color':
  //       return {id: this.projectService.getAppSettings()[elementType] + (++this.countNewItems), timed: '', name: this.projectService.getAppSettings()[elementType], _id: 'ID' + new Date().getTime()};
  //       break;
  //     case 'ml':
  //       return {
  //         _id: 'ID' + new Date().getTime(), __text: this.projectService.getAppSettings()[elementType], toString() {
  //           return (this.__text != null ? this.__text : '');
  //         }
  //       };
  //       break;
  //     case 'globref':
  //       return {id: this.projectService.getAppSettings()[elementType] + (++this.countNewItems), ml: this.projectService.getAppSettings()[elementType], _id: 'ID' + new Date().getTime()}
  //       break;
  //     default:
  //
  //   }
  // }


  deleteRow(tabsComp, state) {
    console.log('DELETE ROW click');
    let afterDelDec;
    if (this.selectedElemement) {
      afterDelDec = this.declarations.find(e => e.id === this.selectedElemement.tabid);
      //afterDelDec[this.selectedElemement.type] = afterDelDec[this.selectedElemement.type].filter(elem => elem._id !== this.selectedElemement.id);
      this.modelService.deleteElementInBlock(afterDelDec, this.selectedElemement.type, this.selectedElemement.id);
      let elemFromEntry = afterDelDec[this.selectedElemement.type][0] || afterDelDec;
      this.selectedElemement = undefined;
      this.eventService.send(Message.UPDATE_TREE, {
        project: this.currentPojectModel,
        state: state,
        comonBlock: elemFromEntry,
        after: 'delete'
      });
    }

  }

  deleteTab(tabsComp, state) {
    console.log('DELETE TAB click, tabsComp = ' + JSON.stringify(tabsComp));
    if (tabsComp) {
      let cpnet = this.modelService.getCpn();
      tabsComp.deleteTabById(tabsComp.selectedTab.id);
      this.declarations = this.declarations.filter(e => e.id !== tabsComp.selectedTab.id);
      cpnet.globbox.block = cpnet.globbox.block.filter(e => e.id !== tabsComp.selectedTab.id);
    }
    this.eventService.send(Message.UPDATE_TREE, {project: this.currentPojectModel, state: state});
  }


  selectClick(item, tabid, elemType) {
    if (elemType) {
      this.selectedElemement = {id: item._id, tabid: tabid, type: elemType};
    } else {
      let splitTabId = tabid.split('-');
      let blockId = splitTabId[2];
      let typeElem = splitTabId[1];
      this.selectedBlock = blockId === this.selectedBlock ? undefined : blockId;
      this.selectedElemement = {id: item._id, tabid: blockId, type: typeElem};
    }
  }

  loadProjectData(project: any) {
    this.declarations = [];
    const projectData = project.data;
    const projectName = project.name;
    this.tabsComponent.clear();
    const cpnet = this.modelService.getCpn();

    console.log('ProjectDetailsComponent ----- LoadData');

    if (cpnet) {
      if (cpnet.globbox) {
        if (cpnet.globbox) {
          /* let defaultBlock;
           //if (cpnet.globbox.block.color || cpnet.globbox.block.var || cpnet.globbox.block.ml || cpnet.globbox.block.globref) {
           defaultBlock = {
             id: 'Default'
           };
           if (cpnet.globbox.color) defaultBlock.color = cpnet.globbox.color;
           if (cpnet.globbox.var) defaultBlock.var = cpnet.globbox.var;
           if (cpnet.globbox.globref) defaultBlock.globref = cpnet.globbox.globref;
           if (cpnet.globbox.ml) defaultBlock.ml = cpnet.globbox.ml;
           //  }
           if (defaultBlock) this.declarations.push(defaultBlock);*/
          // GlobBox
          // --------------------------------------
          let params = [];
          for (let paramElem of this.paramsTypes) {
            let paramBlock = {
              id: paramElem,
              block: []
            };
            params[paramElem] = paramBlock;
          }
          this.searchBlocks(cpnet.globbox, params);
          this.declarations.push(params['color']);
          this.declarations.push(params['var']);
          this.declarations.push(params['globref']);
          this.declarations.push(params['ml']);
          /*
          for (const block of cpnet.globbox.block) {
            this.blocksToArray(block);
            //dataSets[block.id] = block;
            this.declarations.push(block);
            //  console.log(this.dataSets);
          }
          if(cpnet.globbox.block.id) {
            let rootBlock = {
              id: cpnet.globbox.block.id
            }
            if (cpnet.globbox.block.color) rootBlock['color'] = cpnet.globbox.block.color;
            if (cpnet.globbox.block.var) rootBlock['var'] = cpnet.globbox.block.var;
            if (cpnet.globbox.block.globref) rootBlock['globref'] = cpnet.globbox.block.globref;
            if (cpnet.globbox.block.ml) rootBlock['ml'] = cpnet.globbox.block.ml;
            this.declarations.push(rootBlock);
          }*/

        }
      }
    }
  }

  findblockById(id, globoxBlock): any {
    let result;
    for (const block of globoxBlock) {
      if (block.id === id) {
        return block;
      }
      if (block.block) {
        result = this.findblockById(id, block.block);
      }
    }
    return result;
  }


  searchBlocks(currentBlock, params) {
    this.blocksToArray(currentBlock);
    for (const block of currentBlock) {
      this.blocksToArray(block);
      //dataSets[block.id] = block;
      this.declarations.push(block);
      if (block.color) {
        params['color'].block.push({id: block.id, rows: block.color});
      }
      if (block.var) {
        params['var'].block.push({id: block.id, rows: block.var});
      }
      if (block.globref) {
        params['globref'].block.push({id: block.id, rows: block.globref});
      }
      if (block.ml) {
        params['ml'].block.push({id: block.id, rows: block.ml});
      }
      if (block.block) {
        this.searchBlocks(block.block, params);
      }
      //  console.log(this.dataSets);
    }
    let rootBlock = {
      id: currentBlock.id ? currentBlock.id : 'globbox'
    };

    if (currentBlock.color) {
      rootBlock['color'] = currentBlock.color;
      params['color'].block.push({id: currentBlock.id, rows: currentBlock.color, visible: true});
    }
    if (currentBlock.var) {
      rootBlock['var'] = currentBlock.var;
      params['var'].block.push({id: currentBlock.id, rows: currentBlock.var, visible: true});
    }
    if (currentBlock.globref) {
      rootBlock['globref'] = currentBlock.globref;
      params['globref'].block.push({id: currentBlock.id, rows: currentBlock.globref, visible: true});
    }
    if (currentBlock.ml) {
      rootBlock['ml'] = currentBlock.ml;
      params['ml'].block.push({id: currentBlock.id, rows: currentBlock.ml, visible: true});
    }
    if (currentBlock.block && rootBlock.id === 'globbox') {
      this.searchBlocks(currentBlock.block, params);
    }
    this.declarations.push(rootBlock);
  }


  blocksToArray(block) {
    if (block.color && !(block.color instanceof Array)) {
      block.color = [block.color];
    }
    if (block.var && !(block.var instanceof Array)) {
      block.var = [block.var];
    }
    if (block.globref && !(block.globref instanceof Array)) {
      block.globref = [block.globref];
    }
    if (block.ml && !(block.ml instanceof Array)) {
      block.ml = [block.ml];
    }
  }

  getColorStringValue(color): string {
    /*
    let colorStringValue;
    if (color.alias && color.alias.id) {
      colorStringValue = color.alias.id;
    }
    if (color.list && color.list.id) {
      colorStringValue = 'list ' + color.list.id;
    }
    if (color.product && color.product.id) {
      colorStringValue = 'product ' + color.product.id;
    }*/
    const node = {
      name: color.id,
    };
    if (color.layout) {
      node.name = color.layout;//color.layout.substr(7);
      //console.log('colset --------', node.name);
    } else {
      node.name = 'colset ' + node.name;
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
    return  node.name;
  }

  getVariableStringValue(variable) {

    return variable.layout ? variable.layout.substr(4) : variable.id + ': ' + variable.type.id;
  }

  getGlobrefStringValue(globref) {
    return globref.layout ? globref.layout.substr(8) : globref.id + ' = ' + globref.ml;
  }

  getFunStringValue(globref) {
    return globref.layout ? globref.layout.substr(4) : globref.__text;
  }

  getBlockElemeStringValue(item, type) {
    switch (type) {
      case 'var':
        return item ? this.getVariableStringValue(item) : 'var';
        break;
      case 'color':
        return item ? this.getColorStringValue(item) : 'color';
        break;
      case 'ml':
        return !item.flag ? this.getFunStringValue(item) : (item.item.layout ? item.item.layout.split(' ')[0] : item.item.__text.split(' ')[0]);
        break;
      case 'globref':
        return item ? this.getGlobrefStringValue(item) : 'globref';
        break;
      default:

    }

  }


  /**
   *The listener waits for pressing the input button in the panel and determines which property in which table has been changed.
   * @param event
   */
  // @HostListener('window:keydown', ['$event'])
  // keyEvent(event: KeyboardEvent) {
  //
  //   if (event.keyCode === 13) {
  //     console.log('TESTstr ----------------------------------------- PARAMETERS');
  //     let htmlElement: HTMLElement = <HTMLElement>event.target;
  //     if (htmlElement && (htmlElement.nodeName === 'TD' || htmlElement.nodeName === 'TR')) {
  //       if (htmlElement.offsetParent) {
  //         var table: HTMLTableElement = <HTMLTableElement>document.getElementById(htmlElement.offsetParent.id);
  //         let tableDataSource;
  //         if (table.id) {
  //           let parsId = table.id.split('-')
  //           if (parsId[0] === 'declarationPanel') {
  //             if (parsId.length > 3) for (let i = 3; i < parsId.length; ++i) parsId[2] = parsId[2] + '-' + parsId[i];
  //             switch (parsId[1]) {
  //               case 'var':
  //                 this.editVarTable(parsId[2], table);
  //                 break;
  //               case 'color':
  //                 this.editColorTable(parsId[2], table);
  //                 break;
  //               case 'ml':
  //                 this.editMlTable(parsId[2], table);
  //                 break;
  //               case 'globref':
  //                 this.editGlobrefTable(parsId[2], table);
  //                 break;
  //               default:
  //
  //             }
  //             // this.updateProperties(this.nodes, table);
  //             this.eventService.send(Message.UPDATE_TREE, {project: this.currentPojectModel});
  //           }
  //         }
  //       }
  //     }
  //   }
  // }


  saveEditedData(event) {
    console.log(event.target);
    let htmlElement: HTMLElement = <HTMLElement>event.target;
    if (htmlElement && (htmlElement.nodeName === 'TD' || htmlElement.nodeName === 'TR')) {
      if (htmlElement.offsetParent) {
        var table: HTMLTableElement = <HTMLTableElement>document.getElementById(htmlElement.offsetParent.id);
        if (table.id) {
          let parsId = table.id.split('-');
          if (parsId[0] === 'declarationPanel') {
            if (parsId.length > 3) {
              for (let i = 3; i < parsId.length; ++i) {
                parsId[2] = parsId[2] + '-' + parsId[i];
              }
            }
            switch (parsId[1]) {
              case 'var':
                this.editVarTable(parsId[2], table);
                break;
              case 'color':
                this.editColorTable(parsId[2], table);
                break;
              case 'ml':
                this.editMlTable(parsId[2], table);
                break;
              case 'globref':
                this.editGlobrefTable(parsId[2], table);
                break;
              default:

            }
            // this.updateProperties(this.nodes, table);
            this.eventService.send(Message.UPDATE_TREE, {project: this.currentPojectModel});
          }
        }
      }
    }

  }

  /**
   * Функция из кода на ml понимает, что это такое: декларация функции, переменной или исключение
   * @param globref
   */
  getFirstCellDataFromMLCode(globref): string {

    let str;
    if (globref instanceof Object) {
      str = globref.layout ? globref.layout : globref.__text;
    } else {
      str = globref;
    }

    let firstCell: string;
    let array = str.match('^((local){1}\\s+)*(fun|val|exception){1}\\s+');
    if (array) {
      firstCell = array[0].trim();
    } else {
      array = str.match('^[a-zA-Z0-9_]+\\s*:');
      if (array) {
        firstCell = 'var';
      } else {
        array = str.match('^[a-zA-Z0-9_]+\\s*=');
        if (array) {
          firstCell = 'colset';
        } else {
          firstCell = '';
        }
      }
    }
    return firstCell;
  }


  /**
   * Handler for change name from explorer panel
   * @param data - params for changing
   */
  changeinExplorerName(data) {
    let block;
    switch (data.element) {
      case 'ml':
        block = this.declarations.find(e => e.id === data.target).ml;
        if (block instanceof Array) {
          block = block.find(e => e._id === data.id);
        }
        this.modelService.parseVariableLayout(data.node.data.name, block, 'ml');
        break;
      case 'var':
        block = this.declarations.find(e => e.id === data.target).var;
        if (block instanceof Array) {
          block = block.find(e => e._id === data.id);
        }
        this.modelService.parseVariableLayout(data.node.data.name, block, 'var');
        break;
      case 'color':
        block = this.declarations.find(e => e.id === data.target).color;
        if (block instanceof Array) {
          block = block.find(e => e._id === data.id);
        }
        this.modelService.parseVariableLayout(data.node.data.name, block, 'color');
        break;
      case 'globref':
        block = this.declarations.find(e => e.id === data.target).globref;
        if (block instanceof Array) {
          block = block.find(e => e._id === data.id);
        }
        this.modelService.parseVariableLayout(data.node.data.name, block, 'globref');
        break;
      case 'tab':
        block = this.declarations.find(e => e.id === data.target);
        block.name = data.node.data.name;
        block.id = data.node.data.name;
        break;
    }
  }

  editVarTable(tabId, table) {
    let block = this.declarations.find(elem => elem.id === tabId.replace('-commonTable', '')).var;
    var rowLength = table.rows.length;
    for (var i = 0; i < rowLength; i += 1) {
      var input = table.rows[i].cells[1].textContent;
      console.log(input);
      this.modelService.parseVariableLayout(input, block[i], 'var');
      // block[i - 2].type.id = input;
      // block[i - 2].id = table.rows[i].cells[0].textContent;
      // block[i - 2].layout = 'var ' + block[i - 2].id + ': ' + block[i - 2].type.id + ';';
      //console.log('ENTER On property pield' + this.nodes[i]);
    }
    this.showTable = 'Var';
    setTimeout(() => {
      this.showTable = 'not';
    }, 0);
  }


  editColorTable(tabId, table) {
    console.log ('editColorTable ', tabId, table)
    let block = this.declarations.find(elem => elem.id === tabId.replace('-commonTable', '')).color;
    var rowLength = table.rows.length;
    for (var i = 0; i < rowLength; i += 1) {
      var input = table.rows[i].cells[1].textContent;
      console.log(input);
      this.modelService.parseVariableLayout(input, block[i], 'color');
      /* let words = input.split(/\s+/)
       words = words.filter(elem => elem !== '');
       if (!this.standartDeclaration.includes(table.rows[i].cells[0].textContent)) {
         if (words.length === 1) {
           delete block[i - 2].list;
           delete block[i - 2].product;
           block[i - 2].alias = {id: words[0]};
         } else {
           if (words[0] === 'product') {
             delete block[i - 2].alias;
             delete block[i - 2].list;
             block[i - 2].product = {id: words[2].split(',')};
           } else if (words[0] === 'list') {
             delete block[i - 2].alias;
             delete block[i - 2].product;
             block[i - 2].list = {id: words[2].split(',')};
           }
         }

         // tableDataSource[i - 1].value = input;
         block[i - 2].name = input;
         block[i - 2].id = table.rows[i].cells[0].textContent;
       }*/
    }
    this.showTable = 'Color';
    setTimeout(() => {
      this.showTable = 'not';
    }, 0);
  }


  editMlTable(tabId, table) {
    let block = this.declarations.find(elem => elem.id === tabId.replace('-commonTable', '')).ml;
    var rowLength = table.rows.length;
    for (var i = 0; i < rowLength; i += 1) {
      var input = table.rows[i].cells[1].textContent;
      console.log(input);
      this.modelService.parseVariableLayout(input, block[i], 'ml');
    }
    this.showTable = 'Ml';
    setTimeout(() => {
      this.showTable = 'not';
    }, 0);
  }


  editGlobrefTable(tabId, table) {
    let block = this.declarations.find(elem => elem.id === tabId.replace('-commonTable', '')).globref;
    var rowLength = table.rows.length;
    for (var i = 0; i < rowLength; i += 1) {
      var input = table.rows[i].cells[1].textContent;
      console.log(input);
      this.modelService.parseVariableLayout(input, block[i], 'globref');
      //  block[i - 2].ml = input;
      //block[i - 2].id = table.rows[i].cells[0].textContent;
      // console.log('ENTER On property pield' + this.nodes[i]);
    }
    this.showTable = 'Globref';
    setTimeout(() => {
      this.showTable = 'not';
    }, 0);

  }

  hideColapseTable(tableId, block) {
    var table: HTMLTableElement = <HTMLTableElement>document.getElementById(tableId);
    console.log(this.constructor.name, 'hideColapseTable(), table = ', tableId);
    block.visible = !block.visible;
    // table.hidden = !table.hidden;
  }

  isDeclarationBlock(tabId): boolean {
    return !this.paramsTypes.includes(tabId);
  }

}
