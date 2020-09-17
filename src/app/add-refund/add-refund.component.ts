import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-refund',
  templateUrl: './add-refund.component.html',
  styleUrls: ['./add-refund.component.css']
})
export class AddRefundComponent implements OnInit {
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
