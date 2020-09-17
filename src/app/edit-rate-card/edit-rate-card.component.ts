import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-rate-card',
  templateUrl: './edit-rate-card.component.html',
  styleUrls: ['./edit-rate-card.component.css']
})
export class EditRateCardComponent implements OnInit {
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
