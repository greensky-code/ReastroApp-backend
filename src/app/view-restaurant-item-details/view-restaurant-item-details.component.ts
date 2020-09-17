import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
declare var $:any
@Component({
  selector: 'app-view-restaurant-item-details',
  templateUrl: './view-restaurant-item-details.component.html',
  styleUrls: ['./view-restaurant-item-details.component.css']
})
export class ViewRestaurantItemDetailsComponent implements OnInit {
  form:FormGroup
  tabView: any='itemDetails';
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
  if(tab === 'itemDetails') {
    this.router.navigate(['/view-resturant-item-details'])
  }
  else if(tab ==='restaurentDetails'){
     this.router.navigate(['/view-resturant-details'])
  }
  else if(tab === 'companyDetails') {
    this.router.navigate(['/view-company-details'])
  }
  
  else if(tab === 'bankDetails') {
    this.router.navigate(['/view-bank-details'])
  }
}

// =========modal========//
delete(){
  $('#customer').modal('show')
}

deletemodal(){
 $('#customer').modal('hide')
}

disable(){
 $('#disable').modal('show')
}
deletemodal1(){
 $('#disable').modal('hide')
}


}
