import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-selfie-management',
  templateUrl: './selfie-management.component.html',
  styleUrls: ['./selfie-management.component.css']
})
export class SelfieManagementComponent implements OnInit {
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
