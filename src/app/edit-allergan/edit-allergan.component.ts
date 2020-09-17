import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any;
@Component({
  selector: 'app-edit-allergan',
  templateUrl: './edit-allergan.component.html',
  styleUrls: ['./edit-allergan.component.css']
})
export class EditAllerganComponent implements OnInit {

  allergan: any;
  allerganForm: FormGroup;
  allergan_id: any;
  language="en";
  showOtpComponent=true;
  varificationCode: any;
  allerganValue: any;
  errorMessage: any;
  constructor(private activateRouter:ActivatedRoute,private service: ApiServiceService, private router: Router,private tostr:ToastrService,private fb:FormBuilder,private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.activateRouter.params.subscribe(res=>{
      this.allergan_id=res.id 
       this.language=res.language
    })
    // this.viewAllergan();
    this.details()
    this.getAllAllergan()
  }


  getAllAllergan(){
    if(this.language === 'th'){
      this.getAllergans()
    }else {
      this.viewAllergan()
    }
  }

  updateAllergan(){
    if(this.language === 'th'){
      this.tranclateAllergans()
    }else {
      this.updatetAllergan()
    }
  }

  details(){
    // this.allerganForm=new FormGroup({
    //   'allergan': new FormControl('',Validators.required),
    //   'ingredients': new FormControl('',Validators.required)
    // })
    this.allerganForm = this.fb.group({
      allergan  : ['',Validators.compose([Validators.required, Validators.maxLength(256)])],
      ingredients     : ['',Validators.compose([Validators.required])]
     
    });
  }

  viewAllergan(){
    this.service.getApi('merchant/allergans/'+this.allergan_id,1).subscribe((res)=>{
      if(res.status == 200){
        this.allergan=res.body
       this.allerganForm.patchValue({
         'allergan'   : this.allergan.allergan_name?this.allergan.allergan_name:'',
         'ingredients'   : this.allergan.ingredients
       })
      }
    })
  }

  patchValue(){
    this.allerganForm.patchValue({
      allergan: this.allergan.allergan_name,
      ingredients:this.allergan.ingredients
    })
  }

  updatetAllergan() {
    var data = {
      "Item": 1,
      "allergan_name": this.allerganForm.value.allergan,
      "ingredients": this.allerganForm.value.ingredients
    }
    this.service.putApi('merchant/allergans/'+this.allergan_id,data,1).subscribe((res)=>{
      if(res.status == 200){
        this.router.navigate(['/manage-allergen'])
        this.service.showSuccess('Allergan updated successfully')
      }
  }, err=>{
    if(err.status == 403 || err.status == 401){
      this.service.logout();
    }
    else if (err.status == 400){
      this.tostr.error(err.error.response_message)
    }
  })
  }


  // -------------------------Get Allergan-----------------------//
    // api/cuisines/${this.cusine_ids}?lang=
  getAllergans(){
    this.spinner.show()
    this.service.getApi(`merchant/allergans/${this.allergan_id}?lang=${this.language}`,1).subscribe((res)=>{
      if(res.status == 200){
        this.spinner.hide()
        this.allergan=res.body
       this.allerganForm.patchValue({
         'allergan'   : this.allergan.allergan_name?this.allergan.allergan_name:'',
         'ingredients'   : this.allergan.ingredients
       })
      }
    },err=>{
      if(err.status == 500){
        this.spinner.hide()
        this.service.toastErr('Internal server error')
      }
      if(err.status == 401 || err.status == 403){
        this.spinner.hide()
        this.service.logout()
      }
    })

  }

  // -------------------------Trancelate Allergan-----------------------//
  tranclateAllergans(){
    this.spinner.show()
    var data = {
      "ingredients": this.allerganForm.value.ingredients,
      "allergan_name": this.allerganForm.value.allergan,
      "language": this.language,
      "allergan": this.allergan_id,
    }
    this.service.postApi('merchant/allergan-translate',data,1).subscribe((res)=>{
      if(res.status == 200){
        this.spinner.hide()
        this.service.showSuccess('Allergan translated successfully.')
        this.router.navigate(['/manage-allergen'])
      }
  }, err=>{
    if(err.status == 403 || err.status == 401){
      this.spinner.hide()
      this.service.logout();
    }
    else if (err.status == 400){
      this.spinner.hide()
      this.tostr.error(err.error.response_message)
    }
  })
  }

  omit_special_char(event)
{   
   var k;  
   k = event.charCode;  //         k = event.keyCode;  (Both can be used)
   return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
}



   // ----------------Router Link---------------------------------//
   generate(value){
    this.allerganValue=value
    if(this.allerganValue=='allergan'){
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

        if(this.allerganValue == 'allergan'){
          this.onConfigChange()
          this.updateAllergan()
          }
        // this.addcusine()
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
  
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
