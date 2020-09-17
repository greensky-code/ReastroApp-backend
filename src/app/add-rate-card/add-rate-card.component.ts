import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-rate-card',
  templateUrl: './add-rate-card.component.html',
  styleUrls: ['./add-rate-card.component.css']
})
export class AddRateCardComponent implements OnInit {
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
