import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IfStmt } from '@angular/compiler';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any
@Component({
  selector: 'app-customer-managment',
  templateUrl: './customer-managment.component.html',
  styleUrls: ['./customer-managment.component.css']
})
export class CustomerManagmentComponent implements OnInit {
  customer: any=[];
  searchValue: any;
  total: any;
  limit: number=10;
  // page=1;

  statusSelect: any;
  searchbar: any;
  searchName: any;
  selectvalue: any;
  page=1;
  select: any;
  searchselect: any;
  valueTrue: any;
  disables=false;
  selectState='';

  constructor(private service:ApiServiceService, private router:Router, private toastr:ToastrService , private spinner: NgxSpinnerService) { }

  ngOnInit() {
  this.disables=false
    this.customerDetail();
  }

  //////////////////// Customer Detail Api ///////////////////////
  // `api/role?page=${this.page}`,1

  customerDetail(){
    this.spinner.show()
    this.service.getApi(`customer/detail?page=${this.page}`,1).subscribe((res=>{
      if(res.status==200){
        this.spinner.hide()
        this.customer=res.body.results
        this.total=res.body.count
      }
    }),err=>{
      if(err.status == 403 || err.status == 401){
        this.spinner.hide()
        this.service.logout();
      }
      else if (err.status == 400){
        this.spinner.hide()
        this.toastr.error(err.error.message)
      }
      else if (err.status == 500){
        this.spinner.hide()
        this.toastr.error(err.statusText)
      }
    })
  }
  onSelect(value){

 this.selectState=value




 if(this.selectState!=''){

   this.disables=true

 }else if(this.selectState==''){

   this.disables=false

 }
  }

  reset(){

    this.searchName='';

    this.selectState='';

    this.disables=false


    this.customerDetail()
  }


  searchCustomer(value){

    this.searchName=value


    if(this.searchName!=''){

      this.disables=true

    }else if(this.searchName==''){

      this.disables=false

    }

  }
  searchSubmit() {
    if(this.searchName){
      this.service.getApi('customer/detail?search=' + this.searchName, 1).subscribe(res => {
        if (res.status == 200) {
          this.customer = res.body.results
          this.total = res.body.count;
        }
  
      })
    }
    else{
      this.orderStatus();
    }
    
  
  }

  orderStatus(){
    this.spinner.show()
    this.service.getApi('customer/detail?is_active='+this.selectState,1).subscribe(res=>{
      if (res.status == 200) {
        this.spinner.hide()
        this.customer=res
        this.customer = res.body.results
        this.total = res.body.count;
      }
    }, err => {
      if (err.status == 500) {
        this.spinner.hide()
        this.service.toastErr('Internal server error.')
      } else if (err.status == 403 || err.status == 401) {
        this.spinner.hide()
        this.service.logout()
        this.service.toastErr(err.error.message)
      } else if (err.status == 400) {
        this.spinner.hide()
        this.service.toastErr(err.error.message)
      }
        this.spinner.hide()
    })
  }

  // //////Pagination Method////////
  pagination(page){
    this.page=page
    if(this.searchName){
      this.searchWithPagination()
    }else{
      this.customerDetail()
    }
    if(this.selectvalue){
      this.searchWithPagination()
    }else{
      this.customerDetail()
    }
  }

 searchWithPagination(){
   this.spinner.show()
   
   this.service.getApi(`customer/detail?search=${this.searchName}&page=${this.page}`|| `customer/detail?is_active=${this.selectvalue}&page=${this.page}`,1).subscribe(res=>{
     if(res.status==200){
      this.spinner.hide()
      this.customer =res.body.results
      this.total = res.body.count;
     }
   }, err => {
    if (err.status == 500) {
      this.spinner.hide()
      this.service.toastErr('Internal server error.')
    } else if (err.status == 403 || err.status == 401) {
      this.spinner.hide()
      this.service.logout()
      this.service.toastErr(err.error.message)
    } else if (err.status == 400) {
      this.spinner.hide()
      this.service.toastErr(err.error.message)
    }
      this.spinner.hide()
  })
 }

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








 
    // (`api/role?search=${this.searchRoleName}&page=${this.page}`, 1)
}
 //////////// Manage Customer Detail Api////////////

 
  
  


   







