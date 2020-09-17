import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-report-setting-management',
  templateUrl: './report-setting-management.component.html',
  styleUrls: ['./report-setting-management.component.css']
})
export class ReportSettingManagementComponent implements OnInit {
  addStaffForm:FormGroup
  constructor() { }

  ngOnInit() {
    this.formValidation()
  }

  formValidation(){
    this.addStaffForm= new FormGroup({
      
    })
  }

}
