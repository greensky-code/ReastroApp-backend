import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any;
@Component({
  selector: 'app-add-allergn',
  templateUrl: './add-allergn.component.html',
  styleUrls: ['./add-allergn.component.css']
})
export class AddAllergnComponent implements OnInit {
  allergenform: FormGroup;
  showOtpComponent=true;
  allergnValue: any;
  varificationCode: any;
  errorMessage: any;
  constructor(private router: Router, private fb: FormBuilder, private service: ApiServiceService, public toastr: ToastrService,private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.allergenform = this.fb.group({
      allergen: ['', Validators.compose([Validators.required, Validators.maxLength(256)])],
      desc: ['', Validators.required]

    });
  }
  addallergan() {
    this.spinner.show()
    let data = {
      allergan_name: this.allergenform.value.allergen,
      ingredients: this.allergenform.value.desc

    }
    this.service.postApi('merchant/allergans', data, 1).subscribe((res) => {
      if (res.status == 201) {
        this.router.navigate(['/manage-allergen'])
        this.service.showSuccess('Allergan added successfully.')
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


  // ------------------------restrict special character---------------//

  omit_special_char(event) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }


     // ----------------Router Link---------------------------------//
generate(value){
  this.allergnValue=value
  if(this.allergnValue=='allergn'){
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
      this.addallergan()
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

   // only number Allowed
 numberOnly(event): boolean {

  const charCode = (event.which) ? event.which : event.keyCode;

  if (charCode > 31 && (charCode < 48 || charCode > 57)) {

    return false;

  }

  return true;

}
  
}


