import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-close-penalty',
  templateUrl: './close-penalty.component.html',
  styleUrls: ['./close-penalty.component.css']
})
export class ClosePenaltyComponent implements OnInit {
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
