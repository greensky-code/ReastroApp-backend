import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-view-bank-details',
  templateUrl: './view-bank-details.component.html',
  styleUrls: ['./view-bank-details.component.css']
})
export class ViewBankDetailsComponent implements OnInit {
  form:FormGroup;
  tabView: any='bankDetails';
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


}
