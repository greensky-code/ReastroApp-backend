import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-shipping-charge',
  templateUrl: './edit-shipping-charge.component.html',
  styleUrls: ['./edit-shipping-charge.component.css']
})
export class EditShippingChargeComponent implements OnInit {
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
