import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password-verification',
  templateUrl: './change-password-verification.component.html',
  styleUrls: ['./change-password-verification.component.css']
})
export class ChangePasswordVerificationComponent implements OnInit {

  changeVarificationForm:FormGroup;
  qrcode: any;
  conformpassword: string;
  varificationCode: any;
  constructor(private router:Router, private service:ApiServiceService, private fb:FormBuilder, private activateRouter:ActivatedRoute, private tostr:ToastrService) { }

  ngOnInit() {
    this.conformpassword=localStorage.getItem('conformpassword')
    this.changeVarificationForm=this.fb.group({
    'varification' : ["",Validators.compose([Validators.required])]
    })
    }

////// Change Password Verification ////////
onOtpChange(value){
 this.varificationCode=value
}

    vefify(){

     let object={
      "password" : localStorage.getItem('conformpassword'),
      "code":this.varificationCode
    }
       this.service.postApi('api/password-code-verify',object,1).subscribe((data:any)=>{
      
    this.service.showSuccess(data.body.message)
    this.router.navigate(['dashboard'])
    localStorage.removeItem('conformpassword');
    this.router.navigate(['login'])
    },err=>{
      if(err.status == 403 || err.status == 401){
        this.service.logout();
      }
      else if (err.status == 400){
        this.tostr.error(err.error.message)
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
