import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-menu-items',
  templateUrl: './add-menu-items.component.html',
  styleUrls: ['./add-menu-items.component.css']
})
export class AddMenuItemsComponent implements OnInit {
  form:FormGroup;
  constructor(public router:Router) { }
  ngOnInit() {
    this.formValidation()
  }

  formValidation(){
    this.form= new FormGroup({
      'category':new FormControl('')
    })
  }

}
