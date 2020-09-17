import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-restaurant-details',
  templateUrl: './view-restaurant-details.component.html',
  styleUrls: ['./view-restaurant-details.component.css']
})
export class ViewRestaurantDetailsComponent implements OnInit {
  form:FormGroup
  tabView: any='restaurentDetails';
  constructor(public router:Router) { }

  ngOnInit() {
   this.formValidation() 
 }
formValidation(){
  this.form= new FormGroup({
    'category':new FormControl('')
  })
}
// view tab (patient or plasma-donated-patient)
viewTab(tab) {
  this.tabView = tab;
  if(tab ==='restaurentDetails'){
     this.router.navigate(['/view-resturant-details'])
  }
  else if(tab === 'companyDetails') {
    this.router.navigate(['/view-company-details'])
  }
  else if(tab === 'itemDetails') {
    this.router.navigate(['/view-resturant-item-details'])
  }
  else if(tab === 'bankDetails') {
    this.router.navigate(['/view-bank-details'])
  }
}

}
