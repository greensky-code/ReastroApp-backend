import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
// import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-register-merchant',
  templateUrl: './register-merchant.component.html',
  styleUrls: ['./register-merchant.component.css']
})
export class RegisterMerchantComponent implements OnInit {

  model_phone_number: '';
  email: '';
  isValidNumber: any;
  myCode: string;
  // phoneForm: any;
  data: any;
  phoneForm: FormGroup;
  showOtpComponent = true;
  varificationCode: any;
  merchantValue: any;
  errorMessage: any;
  constructor(private router: Router, private fb: FormBuilder, private service: ApiServiceService, public toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    // this.phoneForm = new FormGroup({
      //   phoneNo: new FormControl('', [Validators.required])
      // })
      this.phoneForm = this.fb.group({
        number  : ['',Validators.compose([Validators.required])],
        email   : ['',Validators.compose([Validators.maxLength(256),Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)])],
      });
      this.phoneCheckCountry();
  }
  phoneCheckCountry() {
    $("#phoneNumber2").intlTelInput({
      autoPlaceholder: false,
      autoFormat: false,
      autoHideDialCode: false,
      initialCountry: 'th',
      nationalMode: false,
      onlyCountries: [],
      // preferredCountries: ["us"],
      formatOnInit: true,
      separateDialCode: true,
      formatOnDisplay: false
    });
  }
  toCheckSpaceChar() {
    this.isValidNumber = $('#phoneNumber2').intlTelInput('isValidNumber');
    const countryData = $('#phoneNumber2').intlTelInput('getSelectedCountryData');
    this.myCode = "+" + countryData.dialCode;
  }

  
  addmerchant(){
    this.spinner.show()
    if(this.isValidNumber == true){
      if(this.phoneForm.value.number){
        this.data={
          mobile: this.myCode + this.phoneForm.value.number,
        }
      }
      if(this.phoneForm.value.number && this.phoneForm.value.email){
        this.data={
          mobile: this.myCode + this.phoneForm.value.number,
          email: this.phoneForm.value.email
        }
      }
      this.service.postApi('merchant/sign-up', this.data,1).subscribe(res => {
        if (res.status == 200) {
          this.spinner.hide()
          this.toastr.success('Merchant added sucessfully ')
  
          var data = "Merchant account has been created sucessfully. An one time use password has been sent to the registerd phone number"
          localStorage.setItem('marchantId', res.body.uuid)
          this.router.navigate(['manage-merchant'])
        }
  
  
      },err=>{
        this.spinner.hide()
        if(err.status == 403 || err.status == 401){
          this.spinner.hide()
          this.service.logout();
        }
        else if (err.status == 400){
          this.spinner.hide()
          this.toastr.error(err.error.message)
        }
      })
    }
  }

 
   // ----------------Router Link---------------------------------//
   generate(value){
    this.merchantValue=value
    if(this.merchantValue=='merchant'){
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
    // GFDSFDHJDweqweqwewe
    let data = {
      "code": this.varificationCode
    }
    this.service.postApi('api/google-auth-step-verification',data,1).subscribe((res)=>{
      if(res.status == 200){
        this.onConfigChange()
        this.addmerchant()
       $('#googleauth').modal('hide')
    
  
      }
     
    } ,err=>{
      // console.log('errorqweqweqwewq',err)
      
     if(err.status == 403 || err.status == 401){
       this.onConfigChange()
       this.service.logout();
     }
     else if (err.status == 400){
      this.errorMessage=err.error.message
      console.log('errorqweqweqwewq',this.errorMessage)
       this.onConfigChange()
     }
   })
  }
 reset(){
   this.errorMessage='';
   this.onConfigChange()
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
