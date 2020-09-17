import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any;

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {
  offerform: FormGroup;
  offer = {
    search: '',
    status: '',
    fromDate: '',
    toDate: ''
  }
  todayDate: any;

  toMaxDate: any = new Date();

  newDate: any;
  formDate: any;
  offerType: any;
  place: string;
  day: Date;
  errorMessage: any;
  offerValue: string;
  varificationCode: any;
  showOtpComponent=true;
  constructor(private service: ApiServiceService, private router: Router, private tostr: ToastrService, private forrmBuilder: FormBuilder, private translate: TranslateService,private spinner:NgxSpinnerService) { }
  ngOnInit() {

    this.offerform = this.forrmBuilder.group({
      offername: ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      offercode: ['', Validators.compose([Validators.required,Validators.maxLength(10)])],
      number: ['', Validators.required],
      // fromDate: ['', Validators.required],
      offertype: ['', Validators.required],
      // toDate: ['', Validators.required],
      maxoffer: [''],
      minoffer: ['']
    })
    this.offerType='PERCENTAGE';
    this.place='';

  }



  getDate(event) {



    if (event) {

      this.formDate = event;
      

      this.formDate='';

    }

    else {

      this.newDate = ''

    }

  }

  fromMaxDate(event) {
 

    if (event) {


      // this.todayDate = new Date(event)
      this.todayDate = this.offer.toDate
      // now.format("dd/MM/yyyy hh:mm TT");
      

      // this.day = new Date(this.todayDate)

    }

    else {

      this.todayDate = new Date()


    }

  }

  selsec(value){
    this.offerType=value
    if(this.offerType =='PERCENTAGE'){
      this.place='0 %'
    }else if(this.offerType =='FLAT THB'){
      this.place='0 THB'

    }

  }


  // //////////Add Staff Api/////////
  addoffer() {
    this.spinner.show()

    let object = {
      "name": this.offerform.value.offername,
      "code": this.offerform.value.offercode,
      "value": this.offerform.value.number,
      "start_date": this.offer.toDate,
      "end_date": this.offer.fromDate,
      "offer_type": this.offerform.value.offertype,
      "min_order_value": this.offerform.value.minoffer==''?'0':this.offerform.value.minoffer,
      "max_offer_value": this.offerform.value.maxoffer==''?'0':this.offerform.value.maxoffer

    }

    // if (this.offerform.value.minoffer >= this.offerform.value.maxoffer) {
    //   return this.tostr.error("Max offer value should be greater than min offer value.")
    // }
  //  if (this.offerform.value.minoffer < this.offerform.value.maxoffer) {
      this.service.postApi('api/offers', object, 1).subscribe(res => {
        if (res.status == 201) {
          this.spinner.hide()
          this.tostr.success("Offer Added Successfully.")
          this.router.navigate(['manage-offer'])
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

    // }
  }
  // to check space 
  checkSpace(event) {
    if (event.keyCode == 32) {
      event.preventDefault();
    }
  }
  isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) || (evt.charCode == 48 && !evt.target.value)) {
      return false;
    }
    return true;
  }




  generate(value){
    this.offerValue=value
    if(this.offerValue=='offer'){
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
        this.addoffer()
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
