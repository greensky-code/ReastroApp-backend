import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-tip-and-charity',
  templateUrl: './tip-and-charity.component.html',
  styleUrls: ['./tip-and-charity.component.css']
})
export class TipAndCharityComponent implements OnInit {
  form:FormGroup;
  myForm:FormGroup
  
  constructor() { }

  ngOnInit() {
    this.formValiadtion();
    this.myFormValidation()
  }

  formValiadtion(){
    this.form= new FormGroup({

    })
  }
  myFormValidation(){
    this.myForm= new FormGroup({

    })
  }

}
