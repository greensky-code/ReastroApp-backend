import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-penalty',
  templateUrl: './add-penalty.component.html',
  styleUrls: ['./add-penalty.component.css']
})
export class AddPenaltyComponent implements OnInit {
  form:FormGroup;
 
  
  constructor() { }

  ngOnInit() {
    this.formValiadtion();
  }

  formValiadtion(){
    this.form= new FormGroup({

    })
  }
  

}
