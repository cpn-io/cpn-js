import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AccessCpnService } from '../services/access-cpn.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  constructor(public accessCpnService: AccessCpnService) { }

  ngOnInit() {
  }

}
