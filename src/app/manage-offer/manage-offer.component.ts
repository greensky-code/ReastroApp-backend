import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ExcelService } from '../services/excel.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $ :any;

@Component({
  selector: 'app-manage-offer',
  templateUrl: './manage-offer.component.html',
  styleUrls: ['./manage-offer.component.css']
})
export class ManageOfferComponent implements OnInit {
  offer_list: any=[];
  disable_id: any;
  is_active: any;
  enable_id: any;
  varificationCode: any;
  status: any;
  disabledata: any;
  showOtpComponent = true;
  url: string;
  export: any;
  exports: any;
  object: { "id": any; "status": boolean; };
  errorMessage: any;
  page=1
;
  total: any;
  limit: number;
  constructor(private service:ApiServiceService,private toaster:ToastrService,private spinner: NgxSpinnerService, private router:Router, private activateRouter:ActivatedRoute,private excelService:ExcelService) { }

  ngOnInit() {
    this.offerlist(1)
  }
  offerlist(page){
    this.page=page
    this.spinner.show()
    this.service.getApi(`api/offers?page=${this.page}`,1).subscribe((res)=>{
      if(res.status == 200){
        this.spinner.hide()
        this.offer_list = res.body
        this.total = res.body.count
        this.limit=10;
        console.log('ress',res)
      }

    } ,err=>{
      if(err.status == 403 || err.status == 401){
        this.spinner.hide()
        this.service.logout();
      }else if (err.status == 500){

        this.spinner.hide()

        this.service.toastErr(err.statusText)
      }
     
    })
    
  }
  disable(id,is_active){
    this.status =is_active;
    this.enable_id = id;
    // this.status = "enable"hsagsghsgas
    console.log('status',this.status)
    console.log('status',this.status)
    $('#disablemodal').modal({ backdrop: 'static', keyboard: false })

  }
  // ---------------------------modal show and hide------------------------------------------//
modal(){
  if(this.status == false){
    $('#disablemodal').modal('hide')
    $('#googleauth').modal({ backdrop: 'static', keyboard: false })
  }
  if(this.status == true){
    $('#disablemodal').modal('hide')
    $('#googleauth').modal({ backdrop: 'static', keyboard: false })
  }
}


disableFunctions(){
  if(this.status==false){
    this.object={
      "id": this.enable_id,
      "status": true
    }
    // this.url=`api/offer-enable-disable/true`
  }else if(this.status==true){
    this.object={
      "id": this.enable_id,
      "status": false
    }
    // this.url=`api/offer-enable-disable/false`
  }
  this.spinner.show()
  this.service.postApi('api/offer-enable-disable',this.object,1).subscribe(res=>{
    if(res.status==200){
      this.spinner.hide()
      this.disabledata=res
      this.toaster.success(res.body.message)
      this.offerlist(1)
    }
  }, err=>{
    if(err.status == 403 || err.status == 401){
      this.spinner.hide()
      this.service.logout();
    }
    else if (err.status == 400){
      this.spinner.hide()
      this.toaster.error(err.error.message)
    }
    else if (err.status == 500){
      this.spinner.hide()
      this.toaster.error(err.statusText)
    }
    this.spinner.hide()
  })
}
//------------------------ Google auth -------------------------------//

onOtpChange(value){
  this.varificationCode=value
 }

 onConfigChange() {
  this.showOtpComponent = false;
  this.varificationCode = null;
  setTimeout(() => {
    this.showOtpComponent = true;
  }, 0);
}
 verify(){
  this.spinner.show()
   let data = {
     "code": this.varificationCode
   }
   this.service.postApi('api/google-auth-step-verification',data,1).subscribe((res)=>{
   
     if(res.status == 200){
      this.disableFunctions()
      $('#googleauth').modal('hide')

     }
    
   } ,err=>{
    if(err.status == 403 || err.status == 401){
      this.spinner.hide()
      this.onConfigChange()
      this.service.logout();
    }
    else if (err.status == 400){
      this.spinner.hide()
     this.onConfigChange()
     this.errorMessage=err.error.message
    }
  })
 }

 reset(){
  this.errorMessage='';
  this.onConfigChange()
}
 
    
  
  
  exportAsXLSX():void { 
    this.service.getApi(`api/offers?pagination`,1).subscribe(res=>{
      if(res.status == 200 ){
        
        this.exports=res.body
        console.log('export',this.exports)
        let dataArr=[];
        this.exports.forEach((element=>{
          let d=new Date(element.created_at);
          let creation=`${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
       
           dataArr.push({
             "Offer ID":element.id?element.id:'--',
             "Offer Name":element.name?element.name:'--',
            "Status":element.is_active?element.is_active:'--',
            "Start Date":element.start_date?element.start_date:'--',
            "End Date":element.end_date?element.end_date:'--',
            "Created At":element.created_at ?creation:'--',
            "Created By":element.created_by?element.created_by:'--',
           })
        }))
        this.excelService.exportAsExcelFile(dataArr,'Offer list');
      }
    })
  }
  
    // only number Allowed
    numberOnly(event): boolean {
      const charCode = (event.which) ? event.which : event.keyCode;
       if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
      }
     return true;
  }
}
