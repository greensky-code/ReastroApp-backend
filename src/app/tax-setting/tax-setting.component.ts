import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any;
@Component({
  selector: 'app-tax-setting',
  templateUrl: './tax-setting.component.html',
  styleUrls: ['./tax-setting.component.css']
})
export class TaxSettingComponent implements OnInit {
  taxForm:FormGroup
  taxdata: any;
  errorMessage: any;
  taxValue: any;
  varificationCode: any;
  showOtpComponent=true;
  constructor(private service:ApiServiceService, private fb:FormBuilder,private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.taxForm=this.fb.group({
      'taxRate' : ['',Validators.required]
    })
    this.getTax()

  }

  getTax(){
    this.service.getApi('api/tax',1).subscribe(res=>{
      if(res.status == 200){
        this.taxdata=res.body
        this.taxForm.patchValue({
          'taxRate'    : this.taxdata.tax_percentage
        })
        // console.log('taxdata',this.taxdata.tax_percentage)
      }

    },err=>{
      if(err.status == 500 ){
        this.spinner.hide()
        this.service.toastErr('Internal server error.')
      }else if(err.status == 403 || err.status == 401){
        this.spinner.hide()
        this.service.logout()
        this.service.toastErr(err.message)
      }else if(err.status == 400 ){
        this.spinner.hide()
        this.service.toastErr(err.message)
      }
    })
  }

  // -----------------------Tax Update-------------------------//

   updatetax(){
    this.spinner.show()
     let  object={
      "tax_percentage": this.taxForm.value.taxRate
     }
    this.service.postApi('api/tax',object,1).subscribe(res=>{
      if(res.status == 201){ 
        this.spinner.hide()
        this.service.showSuccess('Tax updated successfully.')
      }

    },err=>{
      if(err.status == 500 ){
        this.spinner.hide()
        this.service.toastErr('Internal server error.')
      }else if(err.status == 403 || err.status == 401){
        this.spinner.hide()
        this.service.logout()
        this.service.toastErr(err.message)
      }else if(err.status == 400 ){
        this.spinner.hide()
        this.service.toastErr(err.message)
      }
    })
   }
   generate(value){
    this.taxValue=value
    if(this.taxValue=='tax'){
      $('#googleauth').modal({ backdrop: 'static', keyboard: false })
  
    }
  
  }
  
  // google auth
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
  // modal(){
  //   $('#comanModal').modal('hide')
  //   $('#googleauth').modal({ backdrop: 'static', keyboard: false })
  // }
  
  verify(){
    this.spinner.show()
    let data = {
      "code": this.varificationCode
    }
    this.service.postApi('api/google-auth-step-verification',data,1).subscribe((res)=>{
      if(res.status == 200){
        this.spinner.hide()
        this.onConfigChange()
        this.updatetax()
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
