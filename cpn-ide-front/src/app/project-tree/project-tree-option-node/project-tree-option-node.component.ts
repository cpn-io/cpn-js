import { Component, OnInit, Input } from '@angular/core';
import { TreeData } from '../project-tree.component';
import { OptionsNamePipePipe } from '../../pipes/options-name.pipe';

@Component({
  selector: 'app-project-tree-option-node',
  templateUrl: './project-tree-option-node.component.html',
  styleUrls: ['./project-tree-option-node.component.scss']
})
export class ProjectTreeOptionNodeComponent implements OnInit {

  @Input() public tree: TreeData;
  @Input() public option: any = {};

  constructor() { }

  ngOnInit() {
  }

  onSelected() {
    this.tree.selected.id = this.option._name;
    this.tree.selected.type = 'option';
    this.tree.selected.cpnElement = this.option;
  }

  isFiltered() {
    if (!this.tree.filter || this.tree.filter === '') {
      return true;
    }

    const optionName = new OptionsNamePipePipe().transform(this.option._name);

    if (optionName.toLowerCase().includes(this.tree.filter.toLowerCase())) {
      return true;
    }

    return false;
  }

}
