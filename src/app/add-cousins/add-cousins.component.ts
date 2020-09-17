import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';

declare var $:any;

@Component({
  selector: 'app-add-cousins',
  templateUrl: './add-cousins.component.html',
  styleUrls: ['./add-cousins.component.css']
})
export class AddCousinsComponent implements OnInit {
  cusineform: FormGroup;
  showOtpComponent=true;
  varificationCode: any;
  cusinsValue: any;
  two_food_delivery :boolean = false;
  errorMessage: any;
  constructor(private router: Router, private fb: FormBuilder, public service: ApiServiceService, public toastr: ToastrService) { }

  ngOnInit() {
    this.cusineform = this.fb.group({
      cusine: ['', Validators.compose([Validators.required, Validators.maxLength(256)])],
      desc: ['', Validators.required]

    });
  }
  addcusine() {
    let data = {
      name: this.cusineform.value.cusine.replace(/\s\s+/g, ' '),
      description: this.cusineform.value.desc

    }
    this.service.postApi('api/cuisines', data, 1).subscribe((res) => {
      if (res.status == 201) {
        this.router.navigate(['/manage-cuisine'])
        this.service.showSuccess('cuisines added successfully.')
      }
    }, err => {
      this.service.toastErr('cuisines with this name already exists.')
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
  this.cusinsValue=value
  if(this.cusinsValue=='cusins'){
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
      this.addcusine()
     $('#googleauth').modal('hide')
  

    }
   
  } ,err=>{
   if(err.status == 403 || err.status == 401){
     this.onConfigChange()
     this.service.logout();
   }
   else if (err.status == 400){
     this.onConfigChange()
    //  this.service.toastErr(err.error.message)
     this.errorMessage=err.error.message
   }
 })
}

back(){
  this.router.navigate(['manage-cuisine'])
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
