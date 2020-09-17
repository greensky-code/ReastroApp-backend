import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-shipping-charge',
  templateUrl: './add-shipping-charge.component.html',
  styleUrls: ['./add-shipping-charge.component.css']
})
export class AddShippingChargeComponent implements OnInit {
  addStaffForm:FormGroup ;
  constructor() { }

  ngOnInit() {
    this.formValiadtion()
  }

  formValiadtion(){
    this.addStaffForm= new FormGroup({
      pickUp: new FormControl(''),
      dropOff: new FormControl(''),
      longDistance: new FormControl(''),
      perKm: new FormControl('')
    })
  }

}
