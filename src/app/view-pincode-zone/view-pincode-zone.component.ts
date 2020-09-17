import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-view-pincode-zone',
  templateUrl: './view-pincode-zone.component.html',
  styleUrls: ['./view-pincode-zone.component.css']
})
export class ViewPincodeZoneComponent implements OnInit {
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
