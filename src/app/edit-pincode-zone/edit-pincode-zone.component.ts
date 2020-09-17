import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-pincode-zone',
  templateUrl: './edit-pincode-zone.component.html',
  styleUrls: ['./edit-pincode-zone.component.css']
})
export class EditPincodeZoneComponent implements OnInit {
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
