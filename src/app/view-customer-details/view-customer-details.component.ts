import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any;
@Component({
  selector: 'app-view-customer-details',
  templateUrl: './view-customer-details.component.html',
  styleUrls: ['./view-customer-details.component.css']
})
export class ViewCustomerDetailsComponent implements OnInit {
  selectedTab = '1a';
  sale_id: any;
  saledata: any;
  order_history: any;
  saved_addresses: any;
  order_data: any;
  chat_data: any;
  chat_list: any;
  chat_historydata: any;
  order_items: any;
  sales_details: any;
  sales_bank: any;
  earning: any;
  payout_details: any=[];
  data: any=[];
  referenceData: any=[];
  selfie: any;
  constructor(private service:ApiServiceService,private router:Router, private activateRouter:ActivatedRoute,private spinner:NgxSpinnerService) { }
  ngOnInit() {
  this.activateRouter.params.subscribe((res)=>{
    this.sale_id=res.id
  })
  this.retrivesaledetail()
  }
  makeActive(tab: string) {
    this.selectedTab = tab;
    if(tab === '3a'){
      this.getEarning()
    }else if(tab === '2a'){
      this.getTotalReference()
    }
   
  }
  getEarning(){
    this.spinner.show()
    this.service.getApi('sales/admin/earnings/'+this.sale_id,1).subscribe((res)=>{
      if(res.status == 200){
        this.spinner.hide()
        this.earning=res.body
        this.payout_details=this.earning.data.payout_details
        this.data=this.earning.data
      }
    }, err => {
      if (err.status == 500) {
        this.spinner.hide()
        this.service.toastErr('Internal server error.')
      } else if (err.status == 403 || err.status == 401) {
        this.spinner.hide()
        this.service.logout()
        this.service.toastErr(err.message)
      } else if (err.status == 400) {
        this.spinner.hide()
        this.service.toastErr(err.message)
      }
      this.spinner.hide()
    })
  }
getTotalReference(){
  this.spinner.show()

  this.service.getApi('sales/admin/total-reference/'+ this.sale_id,1).subscribe((res:any)=>{
    if(res.status == 200){
      this.spinner.hide()
      this.referenceData = res.body.merchants;

    }
  }, err => {
    if (err.status == 500) {
      this.spinner.hide()
      this.service.toastErr('Internal server error.')
    } else if (err.status == 403 || err.status == 401) {
      this.spinner.hide()
      this.service.logout()
      this.service.toastErr(err.message)
    } else if (err.status == 400) {
      this.spinner.hide()
      this.service.toastErr(err.message)
    }
  })
}
  // /////////////////// RETRIEVE CUSTOMER API ///////////////
  retrivesaledetail() {
    this.spinner.show()
    this.service.getApi('sales/admin/detail/' + this.sale_id, 1).subscribe(res => {
      if (res.status == 200) {
        this.spinner.hide()
        this.saledata = res.body
        console.log('saledata',this.saledata)
        this.sales_details = this.saledata.sales_details
        this.saved_addresses = this.saledata.sales_address
        this.sales_bank = this.saledata.sales_bank
        this.selfie=this.saledata.sales_details.selfie
      }
    }, err => {
      if (err.status == 500) {
        this.spinner.hide()
        this.service.toastErr('Internal server error.')
      } else if (err.status == 403 || err.status == 401) {
        this.spinner.hide()
        this.service.logout()
        this.service.toastErr(err.message)
      } else if (err.status == 400) {
        this.spinner.hide()
        this.service.toastErr(err.message)
      }
    })
  }
viewOrderdata(id){
  $('#exampleModalCenter').modal({ backdrop: 'static', keyboard: false })
  this.service.getApi('customer/order/' +id , 1).subscribe((res)=>{
    this.order_data = res.body;
  })
}
modal(){
  $('#myModal').modal({ backdrop: 'static', keyboard: false })
}
}