import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rate-assizned-zone',
  templateUrl: './rate-assizned-zone.component.html',
  styleUrls: ['./rate-assizned-zone.component.css']
})
export class RateAssiznedZoneComponent implements OnInit {
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
