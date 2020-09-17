import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-shipping-assigned-zone',
  templateUrl: './shipping-assigned-zone.component.html',
  styleUrls: ['./shipping-assigned-zone.component.css']
})
export class ShippingAssignedZoneComponent implements OnInit {
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
