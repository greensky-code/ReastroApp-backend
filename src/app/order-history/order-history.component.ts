import { Component, OnInit, ɵConsole } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelService } from '../services/excel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  order_listdetails: any=[];
  searchName='';
  fromDate='';
  toDate='';
  todayDate: any = new Date();
  toMaxDate: any = new Date();
  newDate: any;

  // pagination 
  pageNo: any;
  total: Number;
  page = 1;
  limit=10;
  formDate: any;
  resturanment_name: any;
  restaurantName='';
  order_id: any;
  order_status: any;
  disabled=false
  constructor(private service: ApiServiceService, public toastr: ToastrService, private spinner: NgxSpinnerService,private excelService:ExcelService,private router:Router) { }

  ngOnInit() {
    this.disabled=false
    // this.getorder_history();
    this.getorder_history(1);
    this.getRole();
    // this.submitdata();
  }

  // -------------------------- get all driver details doc 5 ------------------------ //
  // getallorderlist() {
  //   this.service.getApi('driver/detail',1).subscribe(res => {
  //     if (res.status == 200) {
  //       this.order_listdetails = res.body.results
  //     }
  //     else {
  //     }
  //   }, err => {
  //   })
  // }

  // ---------------------------- get order-list for pagination data -------------------------- //
  getorder_history(page) {
    this.spinner.show()
    // this.order_listdetails = '';
    this.service.getApi(`api/orders?page=${this.page}&restaurant_id=${this.restaurantName}&search=${this.searchName}`, 1).subscribe(res => {
      if (res.status == 200) {
        this.spinner.hide()
        this.total = res.body.count
        this.page = page;
        this.limit = 10
        this.order_listdetails = res.body.results

      }
    } ,err=>{
      this.spinner.hide()
      if(err.status == 403 || err.status == 401){
        // this.service.logout();
        this.spinner.hide()
      }
      else if (err.status == 400){
        this.spinner.hide()
        this.toastr.error(err.error.response_message)
      }else if (err.status == 500){

        this.spinner.hide()

        this.service.toastErr(err.statusText)
      }
    })
  } 

   // -------------------- let resturnament list ---------------------------------- //
  getRole(){
    this.service.getApi('api/all-restaurant',1).subscribe(res=>{
      if(res.status==200){
        this.resturanment_name=res.body
        
       
      }
    })
  }

  // -------------------- date validation ---------------------------------- //

  // //////////////FILTER BY RESTAURANT NAME//////////////

onSelect(value){
  this.restaurantName = value
  console.log('restaurantName',this.restaurantName)


  if(this.restaurantName!=''){

    this.disabled=true

  }else if(this.restaurantName==''){

    this.disabled=false

  }
  
  }
 

  getDate(event) {
    if (event) {
      this.formDate = event;
      console.log('formDate',this.formDate)
      this.disabled=true
    }
    else {
      this.newDate = ''
    }
  }

  fromMaxDate(event){
    if(event){
      this.todayDate = new Date(event)
      console.log('todayDate===>>',this.todayDate)

      this.disabled=true
    }
    else{
      this.todayDate = new Date()
    }
  }
  searchNameOrder(value){
    this.searchName=value
    console.log('this.searchName',this.searchName)
    this.disabled=true

  }

  // ---------------------------- search driver with specific data ------------------------- //
  submitdata() {

    // this.spinner.show()
    
    let data, url = '', count = 0;
    // to validate date 
    if (this.fromDate) {
      count++;
    }
    if (this.toDate) {
      count++;
    }
    if (count == 1) {
      this.toastr.error('Please select from and to date.');
      return;
    }
    if (this.searchName) {
      if (url.includes('?')) {
        url = url + '&' + `search=${this.searchName}`
      } else {
        url = '?' + `search=${this.searchName}`
      }
    }
    // if (this.fromDate && this.toDate) {
    //   if (url.includes('?')) {
    //     url = url + `&created_at_after=${this.fromDate}&created_at_before=${this.toDate}`
    //   } else {
    //     url = `?created_at_after=${this.fromDate}&created_at_before=${this.toDate}`
    //   }
    // }

    if(this.fromDate && this.toDate){
      url=`?created_at_after=`+this.fromDate+'&created_at_before='+this.toDate
    }
    if(this.fromDate=='' && this.toDate){
     
   this.service.toastErr('Please enter from date.')
   this.spinner.hide()
   }else if(this.fromDate && this.toDate==''){
    
   this.service.toastErr('Please enter to date.')
   this.spinner.hide()
   }
    if (this.restaurantName) {
      url = `?restaurant_id=` + this.restaurantName
    }
    
    this.service.getApi(`api/orders${url}`, 1).subscribe(res => {
    // this.service.getApi(url, 1).subscribe(res => {
      if (res.status == 200) {
        this.spinner.hide()

        this.total = res.body.count
        this.order_listdetails = res.body.results
      }
    }, err => {
      console.log('eeeeeeee==>>',err)
  
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

  // reset search driver fields
  reset() {
    this.newDate = Date;
    this.formDate = '';
    this.searchName = "";
    this.restaurantName = "";
    this.newDate = Date;
    // this.fromMaxDate()
    this.fromDate = '';
    this.toDate = '';
    this.disabled=false;
    this.getorder_history(1); //recal pagination data after reset search
  }



  exportAsXLSX():void { 
  let dataArr=[];
  this.order_listdetails.forEach((element=>{
     dataArr.push({
       "Order ID	":element.order_id?element.order_id:'N/A',
       "Order Data	":element.delivery_date_time?element.delivery_date_time:'N/A',
      "Customer Name":element.customer_name!=null?element.customer_name:'N/A',
      "Customer Email":element.customer_email!=null?element.customer_email:'N/A',
      "Customer Phone":element.customer_mobile!=null?element.customer_mobile:'N/A',
      "Restaurant Name":element.restaurant_name!=null?element.restaurant_name:'N/A',
      "Order Price":element.order_value?element.order_value:'N/A',
      "Order Status":element.order_status?element.order_status:'N/A',
  

     })
  }))
  this.excelService.exportAsExcelFile(dataArr,'Order history');

}


viewOrder(id,value){
  this.order_id=id
  this.order_status=value
  this.router.navigate(['order-view',{id:this.order_id,value:this.order_status}])
  

}


}
