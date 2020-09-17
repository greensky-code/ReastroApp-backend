import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-milestone-assizned-zone',
  templateUrl: './milestone-assizned-zone.component.html',
  styleUrls: ['./milestone-assizned-zone.component.css']
})
export class MilestoneAssiznedZoneComponent implements OnInit {
  addStaffForm:FormGroup
  
  constructor() { }

  ngOnInit() {
    this.formValiadtion()
  }

  formValiadtion(){
    this.addStaffForm= new FormGroup({

    })
  }

}
