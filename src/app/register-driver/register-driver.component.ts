import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any;
@Component({
  selector: 'app-register-driver',
  templateUrl: './register-driver.component.html',
  styleUrls: ['./register-driver.component.css']
})
export class RegisterDriverComponent implements OnInit {
  model_phone_number: '';
  email: '';
  isValidNumber: any;
  myCode: string;
  // phoneForm: any;
  data: any;
  phoneForm: FormGroup;
  addDrivers: any;
  driverValue: any;
  showOtpComponent=true;
  varificationCode: any;
  errorMessage: any;
  constructor(private router: Router, private fb: FormBuilder, private service: ApiServiceService, public toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  
      this.phoneForm = this.fb.group({
        number  : ['',Validators.compose([Validators.required])]
        // email : ['',[Validators.required]]
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

  


  addDriver() {
    this.spinner.show()
      if(this.isValidNumber == true){
        let data = {
          mobile: this.myCode + this.phoneForm.value.number,
          // email: this.email
        }
        this.service.postApi('driver/sign-up',data,1).subscribe(res=>{
           if(res.status == 201){
             this.spinner.hide()
             this.toastr.success(res.body.message)
             this.router.navigate(['manage-drivers'])
            //  sucessfully
           }
        },err=>{
          this.spinner.hide()
          if(err.status == 403 || err.status == 401){
            this.service.logout();
          }
          else if (err.status == 400){
            this.toastr.error(err.error.message)
          }
        })
      
       
    
       
      }
      }
// --------------------------------allow number input--------------------------------//
isNumber(evt) {
  evt = (evt) ? evt : window.event;
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
  }
  return true;
} 

 // ----------------Router Link---------------------------------//
 generate(value){
  this.driverValue=value
  if(this.driverValue=='driver'){
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
  let data = {
    "code": this.varificationCode
  }
  this.service.postApi('api/google-auth-step-verification',data,1).subscribe((res)=>{
    if(res.status == 200){
      this.onConfigChange()
      this.addDriver()
     $('#googleauth').modal('hide')
  

    }
   
  } ,err=>{
    console.log('error',err)
   if(err.status == 403 || err.status == 401){
     this.onConfigChange()
     this.service.logout();
   }
   else if (err.status == 400){
     this.onConfigChange()
     this.errorMessage=err.error.message
    //  this.service.toastErr(err.error.message)
   }
   else if(err.status == 500){
    this.onConfigChange()
      this.service.toastErr(err.statusText)
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
