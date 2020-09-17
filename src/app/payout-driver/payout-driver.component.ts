import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelService } from '../services/excel.service';

@Component({
  selector: 'app-payout-driver',
  templateUrl: './payout-driver.component.html',
  styleUrls: ['./payout-driver.component.css']
})
export class PayoutDriverComponent implements OnInit {
  page = 1;
  payout_data: any;
  total: any;
  limit: number;
  driverPaysearch='';
  exportsdata: any;
  disabled=false
  constructor(private router: Router, private service: ApiServiceService, private tostr: ToastrService, private spinner :NgxSpinnerService,private excelService:ExcelService) { }

  ngOnInit() {
    this.disabled=false
    this.payout_driver_list(1)
  }
  payout_driver_list(page) {
    this.spinner.show()
    this.service.getApi(`driver/admin/payout?.page=${this.page}`,1).subscribe((res) => {
      if (res.status == 200) {
        this.spinner.hide()
        this.payout_data =res.body
        this.page = page
        this.total=res.body.count
        this.limit=10
      }
    },err=>{
      this.spinner.hide()
      if(err.status == 403 || err.status == 401){
        this.spinner.hide()
        this.service.logout();
      }
      else if (err.status == 400){
        this.spinner.hide()
        this.tostr.error(err.error.response_message)
      }
    })
  }

  enterValue(){
    if(this.driverPaysearch!=''){

      this.disabled=true

    }else if(this.driverPaysearch==''){

      this.disabled=false

    }
  }

  // search(){
  //   console.log('driverPaysearch',this.driverPaysearch)
  // }

  // ------------------------Search Api----------------------//

  submit(){
    console.log('driverPaysearch',this.driverPaysearch)
    this.spinner.show()
    this.service.getApi(`driver/admin/payout?search=${this.driverPaysearch}`,1).subscribe((res) => {
      if (res.status == 200) {
        this.spinner.hide()
        this.payout_data =res.body
     
      }
    },err=>{
      this.spinner.hide()
      if(err.status == 403 || err.status == 401){
        this.spinner.hide()
        this.service.logout();
      }
      else if (err.status == 400){
        this.spinner.hide()
        this.tostr.error(err.error.response_message)
      }
    })
  }

  // ---------------------Reset value-------------------//
  reset(){
    this.driverPaysearch='';
    this.disabled=false
    this.payout_driver_list(1)
  }


  export():void{
    this.service.getApi('driver/admin/payout?pagination',1).subscribe(res=>{
      if(res.status == 200 ){
        this.exportsdata=res.body 
        console.log('Export',this.exportsdata)
        let dataArry=[];
        this.exportsdata.forEach((element,ind)=>{
         let d=new Date(element.created_at);
         let creation=`${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
          dataArry.push({
            "First Name"      : element.first_name?element.first_name:'--',
            "Middle Name"     : element.last_name?element.last_name:'--',
            "Last Name"       : element.middle_name?element.middle_name:'--',
            "Phone "          : element.mobile?element.mobile:'--',
            "Total Order"     : element.total_order?element.total_order:'0',
            "Amount Pending"  : element.amount_pending?element.amount_pending:'0',


           // "Total Reference" : 
           // "Status":element.is_active==true?'Active':'Inactive',
          })
        })
        this.excelService.exportAsExcelFile(dataArry,'Sale Representative Data');
      }
    })
  
  
  }
}
