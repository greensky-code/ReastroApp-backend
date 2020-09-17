import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-view-penalty',
  templateUrl: './view-penalty.component.html',
  styleUrls: ['./view-penalty.component.css']
})
export class ViewPenaltyComponent implements OnInit { 
  form:FormGroup
  
  constructor() { }

  ngOnInit() {
    this.formValiadtion()
  }

  formValiadtion(){
    this.form= new FormGroup({

    })
  }
}
