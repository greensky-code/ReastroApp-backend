import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
@Component({
  selector: 'app-support-setting',
  templateUrl: './support-setting.component.html',
  styleUrls: ['./support-setting.component.css']
})
export class SupportSettingComponent implements OnInit {
  supportSettingform: FormGroup;
  isValidNumber: any;
  myCode: string;
  supportSettings: any;
  errorMessage: any;
  varificationCode: any;
  showOtpComponent=true;
  suportValue: any;
  constructor(private service: ApiServiceService, private fb: FormBuilder,private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.supportSettingform = this.fb.group({
      'checkPhone': [false],
      'number': ['', Validators.required],
      'checkMail': [false],
      'email': [''],
      'checkLiveChat': [false],

    })
    this.phoneCheckCountry()
    this.getSupportSetting()
  }


  phoneCheckCountry() {
    $("#phoneNumber").intlTelInput({
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
    this.isValidNumber = $('#phoneNumber').intlTelInput('isValidNumber');
    const countryData = $('#phoneNumber').intlTelInput('getSelectedCountryData');
    this.myCode = "+" + countryData.dialCode;

  }

  getSupportSetting() {
    this.service.getApi('api/support-setting', 1).subscribe(res => {
      if (res.status == 200) {
        this.supportSettings = res.body
        console.log('supportSettings', this.supportSettings)
        this.supportSettingform.patchValue({
          'checkPhone': this.supportSettings[0].is_phone,
          'number': this.supportSettings[0].phone,
          'checkMail': this.supportSettings[0].is_email,
          'email': this.supportSettings[0].email,
          'checkLiveChat': this.supportSettings[0].is_live_chat,
        })
      }
    })
  }

  seting() {
    let object = {
      "phone": this.supportSettingform.value.number,
      "email": this.supportSettingform.value.email,
      "is_phone": this.supportSettingform.value.checkPhone,
      "is_email": this.supportSettingform.value.checkMail,
      "is_live_chat": this.supportSettingform.value.checkLiveChat,
    }
    this.service.postApi('api/support-setting', object, 1).subscribe(res => {
      if (res.status == 201) {
        this.service.showSuccess("Support settings submitted successfully")
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
    // jdhsfsdfdshfgdsfhdfghfghsdfdshfhdfhsfhjdfh
  }
  generate(value){
    this.suportValue=value
    if(this.suportValue=='suport'){
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
        this.seting()
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


