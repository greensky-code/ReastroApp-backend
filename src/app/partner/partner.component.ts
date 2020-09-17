import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { element } from 'protractor';
declare var $:any;
@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit {

  bannerForm: FormGroup;

  partnerForm: FormGroup;

  valueTo: any;

  language: any;

  value: string;

  values: any;

  bannerText: any;

  types: any;

  errorMessage: any;

  showOtpComponent = true;

  varificationCode: any;

  bannerValue: string;

  howWork: any;

  arr: any = [];

  createBin: any;

  pushValus = [];

  partnerData: any;
  partnerWithusData: any;
  partnerValue: any;

  constructor(private service: ApiServiceService, private router: Router, private fb: FormBuilder, private activateRouter: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.activateRouter.params.subscribe(res => {

      console.log('res', res)

      this.values = res.valueTo

      this.language = res.language

      this.types = res.type

      console.log('types', this.types)


    })

    if (this.language == 'th') {

      if(this.values == 'banner-text'){

        this.getPartnerTranslate()

      }else if(this.values == 'Partner-with-us-from-text'){

        this.getPartnerWithusTranslate()

      }


    } else {

      this.getpartner()

      this. getpartnerWithUs()
    }

    this.getForms()




  }



  // ----------------------Forms-----------------------------------//

  getForms() {

    if (this.values == 'banner-text') {

      this.bannerForm = this.fb.group({

        bannerTitle: ['', Validators.required],

        bannerDescription: ['', Validators.required],

      })

    } else if(this.values == 'Partner-with-us-from-text'){
      this.partnerForm = this.fb.group({

        bannerTitle: ['', Validators.required],

        bannerDescription: ['', Validators.required],

      })
    }

  }

  


  update() {

    if (this.language == 'th') {

      if(this.values == 'banner-text'){

        this.updateTranalate() 
      } else if(this.values == 'Partner-with-us-from-text'){

        this.updatePartnetTranslate()
      }

      // this.updateTranalate()

    } else {

      if(this.values == 'Partner-with-us-from-text'){

        this.updatepartnerWithUs()
        // this.updatepartner()

      }else if('banner-text'){

                this.updatepartner()

      }

    }
  }


  // --------------------Get Api of Partner with us----------------//


  getpartner() {

    this.service.getApi(`master/banner-content/${this.types}`, 1).subscribe(res => {

      if (res.status == 200) {

        this.partnerData = res.body

        console.log('partnerData', this.partnerData)

        this.bannerForm.patchValue({

          'bannerTitle': this.partnerData.title,

          'bannerDescription': this.partnerData.description

        })

      }
    })
  }


  // --------------------Update partner Api------------------------//

  updatepartner() {

    this.spinner.show()

    let object = {

      "title": this.bannerForm.value.bannerTitle,

      "description": this.bannerForm.value.bannerDescription,

      "web_type": this.partnerData.web_type

    }

    this.service.postApi(`master/banner-content`, object, 1).subscribe(res => {
 console.log('wdeqwjhehjqwe',res)
      if (res.status == 200) {

        this.service.showSuccess(res.body.message)

        this.spinner.hide()

        this.router.navigate(['partner-with-us'])

      }


    }, err => {


      if (err.status == 403 || err.status == 401) {

        this.spinner.hide()

        this.service.logout();

      }

      else if (err.status == 400) {

        this.spinner.hide()

        this.service.toastErr(err.error.message)

      }
      else if (err.status == 500) {

        this.spinner.hide()

        this.service.toastErr(err.statusText)

      }

      this.spinner.hide()

    })

  }



  // -------------------Partner translate ----------------------//

  getPartnerTranslate(){

    this.service.getApi(`master/banner-content/${this.types}/${this.language}`, 1).subscribe(res => {

      if (res.status == 200) {

        this.partnerData = res.body

        this.bannerForm.patchValue({

          'bannerTitle': this.partnerData.title,

          'bannerDescription': this.partnerData.description

        })

      }

    })

  }

  // --------------------Translate Api------------------------//

  updateTranalate() {

    this.spinner.show()

    let object = {

      "partner": this.partnerData.partner,

      "title": this.bannerForm.value.bannerTitle,

      "description": this.bannerForm.value.bannerDescription,

    }

    this.service.putApi(`master/banner-content-translate/${this.types}`, object, 1).subscribe(res => {

      console.log('errroe',res)

      if (res.status == 200) {

        this.spinner.hide()

        this.service.showSuccess(res.body.message)

        this.router.navigate(['partner-with-us'])

      }

    }, err => {

      console.log('errroe',err)
      if (err.status == 403 || err.status == 401) {

        this.spinner.hide()

        this.service.logout();

      }

      else if (err.status == 400) {

        this.spinner.hide()

        this.service.toastErr(err.error.partner[0])

      }
      else if (err.status == 500) {

        this.spinner.hide()

        this.service.toastErr(err.statusText)

      }

      this.spinner.hide()

    })

  }


// ------------------------
  getpartnerWithUs(){

    this.service.getApi(`master/partner-with-us`, 1).subscribe(res => {

      if (res.status == 200) {

        this.partnerWithusData = res.body

        console.log('partnerWithusData',this.partnerWithusData)

        this.partnerForm.patchValue({

          'bannerTitle': this.partnerWithusData.title,

          'bannerDescription': this.partnerWithusData.description

        })

      }

    })

  }



  updatepartnerWithUs(){

    this.spinner.show()

    let object = {


      "title": this.partnerForm.value.bannerTitle,

      "description": this.partnerForm.value.bannerDescription,

    }

    this.service.postApi(`master/partner-with-us`, object, 1).subscribe(res => {

      console.log('errroe',res)

      if (res.status == 200) {

        this.spinner.hide()

        this.service.showSuccess(res.body.message)

        this.router.navigate(['partner-with-us'])

      }

    }, err => {

      console.log('errroe',err)
      if (err.status == 403 || err.status == 401) {

        this.spinner.hide()

        this.service.logout();

      }

      else if (err.status == 400) {

        this.spinner.hide()

        this.service.toastErr(err.error.partner[0])

      }
      else if (err.status == 500) {

        this.spinner.hide()

        this.service.toastErr(err.statusText)

      }

      this.spinner.hide()

    })

  }


  getPartnerWithusTranslate(){

    this.service.getApi(`master/partner-with-us/${this.language}`, 1).subscribe(res => {

      if (res.status == 200) {

        this.partnerWithusData = res.body

        console.log('partnerWithusData',this.partnerWithusData)

        this.partnerForm.patchValue({

          'bannerTitle': this.partnerWithusData.title,

          'bannerDescription': this.partnerWithusData.description

        })

      }

    })

  }


  updatePartnetTranslate(){

    this.spinner.show()

    let object = {

      "partner": this.partnerWithusData.partner,

      "title": this.partnerForm.value.bannerTitle,

      "description": this.partnerForm.value.bannerDescription,

    }

    this.service.postApi(`master/partner-with-us-translate`, object, 1).subscribe(res => {

      console.log('errroe',res)

      if (res.status == 200) {

        this.spinner.hide()

        this.service.showSuccess(res.body.message)

        this.router.navigate(['partner-with-us'])

      }

    }, err => {

      console.log('errroe',err)
      if (err.status == 403 || err.status == 401) {

        this.spinner.hide()

        this.service.logout();

      }

      else if (err.status == 400) {

        this.spinner.hide()

        this.service.toastErr(err.error.partner[0])

      }
      else if (err.status == 500) {

        this.spinner.hide()

        this.service.toastErr(err.statusText)

      }

      this.spinner.hide()

    })

  }


   // ----------------Router Link---------------------------------//
   generate(value){
    this.partnerValue=value
    console.log('bannersValue',this.partnerValue)
    if(this.partnerValue=='banner' || this.partnerValue=='partnerWith'){
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

  verify(){
    this.spinner.show()
    let data = {
      "code": this.varificationCode
    }
    this.service.postApi('api/google-auth-step-verification',data,1).subscribe((res)=>{
      if(res.status == 200){
        this.spinner.hide()
        this.onConfigChange()

        this.updatePartnaer()
   
       $('#googleauth').modal('hide')
      //  this.router.navigate(['website-home-page'])
    
  
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
     else if (err.status == 500){
      this.spinner.hide()
     this.onConfigChange()
   this.service.toastErr(err.statusText)
    }
    this.spinner.hide()
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



  updatePartnaer(){
  
    if(this.language == 'th' ){
  
      if(this.values == 'banner-text'){
  
        this.updateTranalate()
  
      } else if(this.values == 'Partner-with-us-from-text'){
  
        this.updatePartnetTranslate()
      }
     
  
  
  
    }else {
  
      if(this.values == 'banner-text'){
  
        this.updatepartner()
  
      }else if(this.values == 'Partner-with-us-from-text'){
  
        this.updatepartnerWithUs()
  
      } 
  
  
    }
  
  
  
  }

}
