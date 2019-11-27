import { Input, OnChanges, SimpleChanges, DoCheck, KeyValueDiffers } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { nodeToArray } from '../../common/utils';
import { ModelService } from '../../services/model.service';
import { TreeData } from '../project-tree.component';
import { ITreeNode } from '../tree-node/tree-node';
import { AccessCpnService } from '../../services/access-cpn.service';

@Component({
  selector: 'app-project-tree-monitor-node',
  templateUrl: './project-tree-monitor-node.component.html',
  styleUrls: ['./project-tree-monitor-node.component.scss']
})
export class ProjectTreeMonitorNodeComponent implements OnInit, DoCheck, ITreeNode {
  public nodeToArray = nodeToArray;

  @Input() public monitor: any;

  @Input() public tree: TreeData;

  public nodeList = [];

  differ: any;

  constructor(
    public modelService: ModelService,
    private differs: KeyValueDiffers,
    public accessCpnService: AccessCpnService) {

    this.differ = this.differs.find({}).create();
  }

  ngOnInit() {
    this.nodeList = this.modelService.getMonitorNodeNamesList(this.monitor);
  }

  ngDoCheck() {
    // console.log(this.constructor.name, 'ngDoCheck()');
    const change = this.differ.diff(this.monitor);
    if (change) {
      console.log('ngDoCheck(), change = ', change);
      this.nodeList = this.modelService.getMonitorNodeNamesList(this.monitor);
    }
  }

  isFiltered() {
    if (!this.tree.filter || this.tree.filter === '') {
      return true;
    }

    if (this.monitor._name.toLowerCase().includes(this.tree.filter.toLowerCase())) {
      return true;
    }

    return false;
  }

  onSelectedOption(option) {
    this.tree.selected.treeNodeComponent = this;

    this.tree.selected.id = 'monitorOption_' + option._name;
    this.tree.selected.type = 'monitorOption';
    this.tree.selected.cpnElement = option;
  }

  onSelectedNode(node) {
    this.tree.selected.treeNodeComponent = this;

    this.tree.selected.id = 'monitorNode_' + node.element._id;
    this.tree.selected.type = 'monitorNode';
    this.tree.selected.cpnElement = node;
  }

  onSelect() {
    throw new Error("Method not implemented.");
  }
  onClick() {
    throw new Error("Method not implemented.");
  }
  onExpand() {
    throw new Error("Method not implemented.");
  }
  onContextMenu(event: any) {
    throw new Error("Method not implemented.");
  }
  onKeydown(event: any) {
    throw new Error("Method not implemented.");
  }
  onUpdate(event: any) {
    throw new Error("Method not implemented.");
  }
  onNew(event: any) {
    throw new Error("Method not implemented.");
  }
  onDelete(event: any) {
    throw new Error("Method not implemented.");
  }
  onUp(event: any) {
    throw new Error("Method not implemented.");
  }
  onDown(event: any) {
    throw new Error("Method not implemented.");
  }
}
