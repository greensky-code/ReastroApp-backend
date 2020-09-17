import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-pincode-zone',
  templateUrl: './add-pincode-zone.component.html',
  styleUrls: ['./add-pincode-zone.component.css']
})
export class AddPincodeZoneComponent implements OnInit {
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
