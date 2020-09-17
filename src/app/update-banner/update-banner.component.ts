import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-banner',
  templateUrl: './update-banner.component.html',
  styleUrls: ['./update-banner.component.css']
})
export class UpdateBannerComponent implements OnInit {
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
