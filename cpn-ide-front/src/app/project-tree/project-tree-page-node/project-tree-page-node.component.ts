import { Component, OnInit, Input } from '@angular/core';
import { nodeToArray } from '../../common/utils';
import { ModelService } from '../../services/model.service';
import { AccessCpnService } from '../../services/access-cpn.service';

@Component({
  selector: 'app-project-tree-page-node',
  templateUrl: './project-tree-page-node.component.html',
  styleUrls: ['./project-tree-page-node.component.scss']
})
export class ProjectTreePageNodeComponent implements OnInit {

  public nodeToArray = nodeToArray;

  @Input() page: any = {};
  @Input() isSubpage = false;
  @Input() subpages: any = [];
  @Input() expanded: any = [];
  @Input() selected: any = {};

  constructor(public modelService: ModelService, public accessCpnService: AccessCpnService) { }

  ngOnInit() {
    // console.log(this.constructor.name, 'ngOnInit(), this.page.pageattr._name = ', this.page.pageattr._name);
    // console.log(this.constructor.name, 'ngOnInit(), this.isSubpage = ', this.isSubpage);
    // console.log(this.constructor.name, 'ngOnInit(), this.subpages = ', this.subpages);

    if (this.isSubpage) {
      this.subpages.push(this.page._id);
    }
  }

  hasSubpages() {
    if (this.page) {
      for (const trans of nodeToArray(this.page.trans)) {
        if (trans.subst && trans.subst._subpage) {
          return true;
        }
      }
    }
    return false;
  }

}
