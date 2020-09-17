import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any;
@Component({
  selector: 'app-change-delivery-charges',
  templateUrl: './change-delivery-charges.component.html',
  styleUrls: ['./change-delivery-charges.component.css']
})
export class ChangeDeliveryChargesComponent implements OnInit {
  formData: FormGroup;

  values: any;
  fixCharge: any;
  data=[]


  radiusData: any;
  id: any;
  row:any=[];
  rowArry: any=[];
  errorMessage: any;
  varificationCode: any;
  showOtpComponent=true;
  deliveryValue: string;

  constructor(private fb: FormBuilder,private activaRouter:ActivatedRoute,private service:ApiServiceService,private router:Router, private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.formData = this.fb.group({
      deliveryCharge  : [''],
      OrderUpto       : [''],
      uptoKm          : [''],
      deliveryUpto    : [''],
      active          : [false]
      });
      this.activaRouter.params.subscribe(res=>{
      this.values=res.value
      this.id=res.id
      })
      this.getRadius()
      this.array() 
  }

  array(){
    this.rowArry = [
      {
        deliveryCharge:'',
        OrderUpto:'',
      }
    ];
  }
  deleteRow(x){
    this.rowArry.splice(x, 1 );   
  } 
   

  addTable() {
    let row={
      "deliveryCharge":'',
        "OrderUpto":''
    }
    this.rowArry.push(row)
  
    

  }
  select(e,i){
    let name=e.target.name;
    let value=e.target.value;
    this.rowArry[i][name]=value;

  }



getRadius(){
this.service.getApi(`api/delivery-charges/${this.id}`,1).subscribe(res=>{
  if(res.status == 200){
    this.radiusData=res.body
    this.rowArry=this.radiusData.charges
    this.formData.patchValue({
      'deliveryUpto'      :    this.radiusData.free_delivery_upto,
      'active'            :    this.radiusData.is_active
    })
  }
})
}

updateCharge(){
  let object={
    "type": this.values,
    "free_delivery_upto": this.formData.value.deliveryUpto,
    "is_active":this.formData.value.active,
    "charges":this.rowArry
}
this.service.postApi('api/delivery-charges',object,1).subscribe(res=>{
    if(res.status == 200 ){
     
      this.service.showSuccess(res.body.message)

      this.spinner.hide()

      this.router.navigate(['delivery-charge'])

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



    // ----------------Router Link---------------------------------//
    generate(value){
      this.deliveryValue=value
      if(this.deliveryValue=='fixCharge' || this.deliveryValue=='Radius'){
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
          this.updateCharge()
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
