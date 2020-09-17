import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelService } from '../services/excel.service';

@Component({
  selector: 'app-payout-sale-reprentative-pending',
  templateUrl: './payout-sale-reprentative-pending.component.html',
  styleUrls: ['./payout-sale-reprentative-pending.component.css']
})
export class PayoutSaleReprentativePendingComponent implements OnInit {
  salepayout_data: any;
  page=1;
  total: any;
  limit: number;
  salePaysearch='';
  activate: any;
  exportsdata: any;
  exports: any;
  disabled=false;

  constructor(private router: Router, private service: ApiServiceService, private tostr: ToastrService, private spinner :NgxSpinnerService,private excelService:ExcelService) { }

  ngOnInit() {
    this.disabled=false
 
    this.payout_driver_list(1)
  }
  payout_driver_list(page) {
    this.spinner.show()
    this.service.getApi(`sales/admin/payout-pending?.page=${this.page}`,1).subscribe((res) => {
      if (res.status == 200) {
        this.spinner.hide()
        this.salepayout_data =res.body.results
        console.log('salepayout_data',this.salepayout_data)
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

  // ----------------------Search Api----------------------//
  submit(){
    this.spinner.show()
    this.service.getApi(`sales/admin/payout-pending?search=${this.salePaysearch}`,1).subscribe((res) => {
      if (res.status == 200) {
        this.spinner.hide()
        this.salepayout_data =res.body.results
       
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
    if(this.salePaysearch!=''){

      this.disabled=true

    }else if(this.salePaysearch==''){

      this.disabled=false

    }
  }

  // -----------------------Reset value-------------------//
  reset(){
    this.salePaysearch='';
    this.disabled=false;
    this.payout_driver_list(1)
 
  }


  export():void{
    this.service.getApi('sales/admin/payout-pending?pagination=false',1).subscribe(res=>{
      if(res.status == 200 ){
        this.exports=res.body.results
        console.log('Export',this.exports)
        let dataArry=[];
        this.exports.forEach((element,ind)=>{
          dataArry.push({
            "Representative"      : element.first_name?element.first_name:'--',
            "Phone "          : element.mobile?element.mobile:'--',
            "Total Business"     : element.business_reference?element.business_reference:'0',
            "Amount Pending"  : element.amount_pending?element.amount_pending:'0',
          })
        })
        this.excelService.exportAsExcelFile(dataArry,'Sale Representative Data');
      }
    })
  
  
  }
}
