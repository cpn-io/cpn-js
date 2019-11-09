import { Input, OnChanges, SimpleChanges, DoCheck, KeyValueDiffers } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { nodeToArray } from '../../common/utils';
import { ModelService } from '../../services/model.service';

@Component({
  selector: 'app-project-tree-monitor-node',
  templateUrl: './project-tree-monitor-node.component.html',
  styleUrls: ['./project-tree-monitor-node.component.scss']
})
export class ProjectTreeMonitorNodeComponent implements OnInit, DoCheck {

  public nodeToArray = nodeToArray;

  @Input() public monitor: any;

  @Input() public tree: any;
  
  public nodeList = [];

  differ: any;

  constructor(public modelService: ModelService, private differs: KeyValueDiffers) {
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

  onSelectedOption(option) {
    this.tree.selected.id = 'monitorOption_' + option._name;
    this.tree.selected.type = 'monitorOption';
    this.tree.selected.cpnElement = option;
  }

  onSelectedNode(node) {
    this.tree.selected.id = 'monitorNode_' + node.element._id;
    this.tree.selected.type = 'monitorNode';
    this.tree.selected.cpnElement = node;
  }
}
