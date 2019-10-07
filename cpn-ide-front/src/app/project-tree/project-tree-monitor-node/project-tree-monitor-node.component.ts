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
  @Input() public expanded: any;
  @Input() public selected: any;

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
    this.selected.id = 'monitorOption_' + option._name;
    this.selected.type = 'monitorOption';
    this.selected.cpnElement = option;
  }

  onSelectedNode(node) {
    this.selected.id = 'monitorNode_' + node.element._id;
    this.selected.type = 'monitorNode';
    this.selected.cpnElement = node;
  }
}
