import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
// import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TokenizeResult } from '@angular/compiler/src/ml_parser/lexer';
import { TranslateService } from '@ngx-translate/core';
// import { ToastrService } from 'ngx-toastr';
declare var $:any;

@Component({
  selector: 'app-login-verification',
  templateUrl: './login-verification.component.html',
  styleUrls: ['./login-verification.component.css']
})
export class LoginVerificationComponent implements OnInit {
  // LoginVarificationForm: FormGroup;
  qr_code: any;
  qrCode: any;
  data: any;
  code: string;
  qrCodeDisplay: any;
  page: string;
  otpCode: number;
  key: string;
  keys: string;
  local:any;
  varificationCode: any;
  showOtpComponent=true;
  errorMessage: any;
  constructor(private router: Router, private fb: FormBuilder,private toster:ToastrService, private service: ApiServiceService, private translate : TranslateService, private activatedRoute: ActivatedRoute,private spinner:NgxSpinnerService) { }
  // this.spinner.show()
  ngOnInit() {
    if(localStorage.getItem('tokens')==null){
      this.router.navigate(['dashboard'])
    }
   
    this.activatedRoute.queryParams.subscribe((params => {
      this.qrCode = JSON.parse(params.qrCode)
    }))
   this.qrCodeDisplay = 'http://182.74.213.163:8008/' + this.qrCode
  // this.qrCodeDisplay = 'http://ec2-13-250-224-209.ap-southeast-1.compute.amazonaws.com:8008/v1/' + this.qrCode
  this.keys=localStorage.getItem('keys')
  this.local='http://192.168.0.101:4204/'
}

  // verify user by QR Code
  // dasdsadsadasdasdasqweqweqwe
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



  verifyUser() {
    this.spinner.show()
    // this.router.navigate(['dashboard']);  
    if (!this.varificationCode) {
      return this.toster.error("Please enter google authentication code");
    }
    else {
      var object = {
        'code': this.varificationCode,
      }
      console.log("codeGoogle",this.varificationCode)
      this.service.postApi('api/google-auth-step-verification', object, 1).subscribe(res => {
        if (res.status == 200) {
          this.spinner.hide()
           this.toster.success("Login successfully.");
          this.router.navigate(['dashboard']);
        }
        else {
          this.spinner.hide()
          this.toster.error("Invalid authentication code.");
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
  }
 
  reset2FA() {
    // this.spinner.show()
    this.spinner.show();
    let data = {
      // OWVjOGYxYmUtNzU0Ni00ZmExLWI1ZGQtYmVhZDExMjZiYzIy&time=MjAxOS0xMC0xOCAwNTozMDo0MS43NzExODY
      url: this.service.websiteUrls,      
    }
    this.service.postApi('api/reset-google-auth', data, 1).subscribe(res => {
      if (res['status'] == 200) {
        this.spinner.hide();
        this.toster.success("An email has been send on your registered email id");
        this.router.navigate(['login']);
      }
      else {
        this.spinner.hide();
        this.toster.error("Something went wrong");
      }
    }, err => {
      this.spinner.hide();
      this.toster.error("Internal server error");
    })
  }

  //.......................  only number Allowed...................................//


  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  Token(){
    if(localStorage.getItem('token')){
      this.router.navigate([''])
    }
  }

  selectlang(event){
    let value = event.target.value
    this.translate.use(value)
  }

  reset(){
    this.errorMessage='';
  }

}

