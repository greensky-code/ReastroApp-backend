import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any;
@Component({
  selector: 'app-static-content',
  templateUrl: './static-content.component.html',
  styleUrls: ['./static-content.component.css']
})
export class StaticContentComponent implements OnInit {

  language: any="en";
  ekeditorForm:FormGroup;
  terms: any;
  type: any;
  editorValue:any;
  data:any;
  terms_id: any;
  Translate_id: any;
  errorMessage: any;
  varificationCode: any;
  showOtpComponent=true;
  values: any;
  constructor(private activatedRoute: ActivatedRoute,private service:ApiServiceService,private router: Router,private formBuilder:FormBuilder,private spinner:NgxSpinnerService) { }

  ngOnInit() {
  
    this.ekeditorForm=this.formBuilder.group({
      'editror'       : ["",Validators.maxLength(256)]
    })
    this.activatedRoute.params.subscribe(res=>{
      this.language=res.language
      this.Translate_id=res.id
      this.type = res.type;
      console.log('resss==>>',this.Translate_id)
      console.log('response==>>',res)
    })
    
    // this.language=localStorage.getItem('language') 
    if(this.language == 'en'){
      this.language = 'en'
    }
    else if(this.language == 'th'){
      this.language = 'th'
    }
    else if(this.language == null){
    this.language = 'en'
    }
    // this.getContent();
    if(this.language=='th'){

 if(this.type == 'Customer' || this.type == 'Merchant' || this.type == 'Driver'){
      this.gettranslatTerms()
    }else if (this.type == 'privacypolicy'){
      this.getPrivacyPolicy()
      
    }
    else if(this.type == 'refund'){
      this.getTranslatRefundPolicy()
    }else if( this.type == 'aboutus'){
      this.gettranslatAboutUs()
    }else if( this.type == 'availability'){
      this.gettranslatAvailability()
    }
  } 
  else {
    if(this.type == 'Customer' || this.type == 'Merchant' || this.type == 'Driver'){
      this.getTerms()
    }
    else if (this.type == 'privacypolicy'){
      this.getPrivacy()
    }
    else if(this.type == 'refund'){
      this.getRefund()
    }
    else if( this.type == 'aboutus'){
      this.getAboutUs()
    }
    else if( this.type == 'availability'){
      this.getAvailability()
    } 
  }
  
  }


  // getContent() {
  //   this.activatedRoute.params.subscribe((res) => {
  //     this.type = res.type;
  //     window.scrollTo(0, 0);
  //   })
  // }

  getTerms(){
    this.spinner.show()
    this.service.getApi('content/terms-and-condition?user='+this.type+'&lang='+this.language,1).subscribe((res)=>{
      if(res.status == 200 ){
        this.spinner.hide()
        // setTimeout(() => {
          this.editorValue=res.body.content
          this.terms_id=res.body.id
          console.log('terms_id==>>',this.terms_id)

        // }, 1000);
        this.ekeditorForm.patchValue({
          'editror'   :   this.editorValue
        })
      }
    },err=>{
      this.spinner.hide()
    })
  }

  getPrivacy() {
    this.spinner.show()
    this.service.getApi('content/privacy-policy?lang=' + this.language, 1).subscribe((res) => {
      if (res.status == 200) {
        this.spinner.hide()
        this.editorValue = res.body.content
        this.ekeditorForm.patchValue({
          'editror'   :   this.editorValue
        })
      }
    },err=>{
      this.spinner.hide()
    })
  }

  getRefund() {
    this.spinner.show()
    this.service.getApi('content/refund-cancellation?lang=' + this.language, 1).subscribe((res) => {
      if (res.status == 200) {
        this.spinner.hide()
        this.editorValue = res.body.description
        console.log('refundeditorValue',this.editorValue)
        this.ekeditorForm.patchValue({
          'editror'   :   this.editorValue
        })
      }
    },err=>{
      this.spinner.hide()
    })
  }

  getAboutUs(){
    this.spinner.show()
    this.service.getApi('content/about-us?lang='+this.language,1).subscribe((res)=>{
      if(res.status == 200){
        this.spinner.hide()
        this.editorValue = res.body.description
        this.ekeditorForm.patchValue({
          'editror'   :   this.editorValue
        })
      }
    },err=>{
      this.spinner.hide()
    })
  }

  getAvailability(){
    this.spinner.show()
    this.service.getApi('content/availability-information?lang='+this.language,1).subscribe((res)=>{
      if(res.status == 200){
        this.spinner.hide()
        this.editorValue = res.body[0].description
        console.log('descriptionavailability',this.editorValue)
        this.ekeditorForm.patchValue({
          'editror'   :   this.editorValue
        })
   
      }
    },err=>{
      this.spinner.hide()
    })
  }



  updateTerms(){
    this.spinner.show()
    console.log('thai_Language==>>',this.language)
    if(this.language=='th'){
      if(this.values ==='Customer' || this.values ==='Merchant' || this.values=='Driver'){
        this.spinner.hide()
        this.translatTerms()
      }else if(this.values ==='Privacypolicy'){
        this.translatPrivacyPolicy()
        this.spinner.hide()
      }else if(this.values ==='RefundPolicy'){
        this.spinner.hide()
        this.translatRefundPolicy()
      }else if(this.values ==='aboutus'){
        this.translatAboutUs()
        this.spinner.hide()
      }else if(this.values ==='AvailabilityInformation'){
        this.spinner.hide()
        this.translatAvailability()
        
      }
    }else{
    // || this.values ==='Merchant' || this.values=='Driver' || this.values==='Privacypolicy' || this.values==='RefundPolicy' || this.values==='aboutus' || this.values=='AvailabilityInformation'
    if(this.values ==='Customer' || this.values ==='Merchant' || this.values=='Driver'){
      this.spinner.hide()
      this.submitTerms()
    }else if(this.values ==='Privacypolicy'){
      this.submitPrivacy()
      this.spinner.hide()
    }else if(this.values ==='RefundPolicy'){
      this.submitRefund()
      this.spinner.hide()
    }else if(this.values ==='aboutus'){
      this.submitAbout()
      this.spinner.hide()
    }else if(this.values ==='AvailabilityInformation'){
      this.submitAvailability()
      this.spinner.hide()
    }
  }

  }

  submitTerms() {
    this.spinner.show()
    var data = {
      "content": this.ekeditorForm.value.editror,
      "for_user": this.type,
      "language": this.language
    }
    console.log('dataEdit==>>',data)
    this.service.postApi('content/terms-and-condition',data,1).subscribe((res)=>{
      if(res.status == 200 ){
        this.spinner.hide()
        this.service.showSuccess(res.body.message)
        this.router.navigate(['legal-terms'])
      }
    },err=>{
      this.spinner.hide()
      if(err.status == 400){
        this.spinner.hide()
        this.service.toastErr(err.message)
      }else if(err.status == 403 || err.status == 401){
        this.spinner.hide()
        this.service.toastErr(err.message)
      }
    })
  }

  submitPrivacy() {
    this.spinner.show()
    // var dataEdit = this.editorValue.replace(/<[^>]*>/g, '')
    var data = {
      "content": this.ekeditorForm.value.editror,
      "language": this.language
    }
    this.service.postApi('content/privacy-policy',data,1).subscribe((res)=>{
      if(res.status == 200 ){
        this.spinner.hide()
        this.service.showSuccess(res.body.message)
        this.router.navigate(['legal-terms'])
      }
    },err=>{
      this.spinner.hide()
    })
  }

  submitRefund() {
    this.spinner.show()
    // var dataEdit = this.editorValue.replace(/<[^>]*>/g, '')
    var data = {
      "description": this.ekeditorForm.value.editror,
      "language": this.language
    }
    this.service.postApi('content/refund-cancellation',data,1).subscribe((res)=>{
      if(res.status == 200 ){
        this.service.showSuccess(res.body.message)
        this.spinner.hide()
        this.router.navigate(['legal-terms'])
      }
    },err=>{

    })
  }

  submitAbout() {
    this.spinner.show()
    // var dataEdit = this.editorValue.replace(/<[^>]*>/g, '')
    var data = {
      "description": this.ekeditorForm.value.editror,
      "language": this.language
    }
    this.service.postApi('content/about-us',data,1).subscribe((res)=>{
      if(res.status == 200 ){
        this.service.showSuccess(res.body.message)
        this.spinner.hide()
        this.router.navigate(['legal-terms'])
      }
    },err=>{
      this.spinner.hide()
    })
  }

  submitAvailability() {
    this.spinner.show()
    // var dataEdit = this.editorValue.replace(/<[^>]*>/g, '')
    var data = {
      "description": this.ekeditorForm.value.editror,
      "language": this.language
    }
    console.log('submitAvailability==>>',data)
    this.service.postApi('content/availability-information',data,1).subscribe((res)=>{
      console.log('availability==>>',res)
      if(res.status == 200 ){
        this.service.showSuccess(res.body.message)
        this.spinner.hide()
        this.router.navigate(['legal-terms'])
      }
    },err=>{
      this.spinner.hide()
    })
  }


// ---------------------------------Trancslate Apis-------------------------------------//

// ---------------------------------translatTerms Api-------------------------------------//
  translatTerms(){
    this.spinner.show()
    let object={
      "content": this.ekeditorForm.value.editror,
      "for_user": this.type,
      "language": this.language,
      "terms_conditions": this.Translate_id
    }
    console.log('objectterms_conditions==>>',object)
    this.service.postApi('content/created-translated-terms-condition',object,1).subscribe(res=>{
      console.log('Thai_res',res)
      if(res.status ==200){
        this.spinner.hide()
        this.service.showSuccess(res.body.message)
        this.router.navigate(['legal-terms'])
      }
    },err=>{
      this.spinner.hide()
      if(err.status == 400){
        this.spinner.hide()
        this.service.toastErr("Incorrect type")
      }
      if(err.status ==  403 ||  err.status  ==  401){
        this.spinner.hide()
        this.service.logout()
      }
    })
  }

// ---------------------------------Get translatTerms Api-------------------------------------//
//
// content/terms-and-condition?user=customer&lang=thai 

gettranslatTerms(){
  this.spinner.show()
  this.service.getApi(`content/terms-and-condition?user=${this.type}&lang=${this.language}`,1).subscribe(res=>{
    console.log('Get_Thai_res',res)
    if(res.status ==200){
      this.spinner.hide()
      this.editorValue=res.body.content
      this.ekeditorForm.patchValue({
        'editror'   :   this.editorValue
      })
    }
  },err=>{
    this.spinner.hide()
    if(err.status == 400){
      this.spinner.hide()
      this.service.showSuccess("Incorrect type")
    }
    if(err.status ==  403 ||  err.status  ==  401){
      this.spinner.hide()
      this.service.logout()
    }
  })
}


// ---------------------------------Get privacy policy Api-------------------------------------//

  
translatPrivacyPolicy(){
  this.spinner.show()
  let object={
    "content": this.ekeditorForm.value.editror,
    // "for_user": this.type,
    "language": this.language,
    "privacy_policy": this.Translate_id
  }
  this.service.postApi('content/created-translated-privacy-policy',object,1).subscribe(res=>{
    console.log('Thai_res',res)
    if(res.status ==200){
      this.spinner.hide()
      this.service.showSuccess(res.body.message)
      this.router.navigate(['legal-terms'])
    }
  },err=>{
    this.spinner.hide()
    if(err.status == 400){
      this.spinner.hide()
      this.service.toastErr("Incorrect type")
    }
    if(err.status ==  403 ||  err.status  ==  401){
      this.spinner.hide()
      this.service.logout()
    }
  })
}



// ---------------------------------Get translatTerms Api-------------------------------------//
//
// content/terms-and-condition?user=customer&lang=thai 

getPrivacyPolicy(){
  this.spinner.show()
  this.service.getApi(`content/privacy-policy?lang=${this.language}`,1).subscribe(res=>{
    console.log('getPrivacyPolicy',res)
    if(res.status ==200){
      this.spinner.hide()
      this.editorValue=res.body.content
      this.ekeditorForm.patchValue({
        'editror'   :   this.editorValue
      })
    }
  },err=>{
    this.spinner.hide()
    if(err.status == 400){
      this.spinner.hide()
      this.service.toastErr("Incorrect type")
    }
    if(err.status ==  403 ||  err.status  ==  401){
      this.spinner.hide()
      this.service.logout()
    }
  })
}



// ---------------------------------TranslatRefundPolicy Api-------------------------------------//

  
translatRefundPolicy(){
  this.spinner.show()
  let object={
    "description": this.ekeditorForm.value.editror,
    // "for_user": this.type,
    "language": this.language,
    "refund": this.Translate_id
  }
  this.service.postApi('content/created-translated-refund-text',object,1).subscribe(res=>{
    console.log('translatRefundPolicy',res)
    if(res.status ==200){
      this.spinner.hide()
      this.service.showSuccess(res.body.message)
      this.router.navigate(['legal-terms'])
    }
  },err=>{
    this.spinner.hide()
    if(err.status == 400){
      this.spinner.hide()
      this.service.toastErr("Incorrect type")
    }
    if(err.status ==  403 ||  err.status  ==  401){
      this.spinner.hide()
      this.service.logout()
    }
  })
}




// ---------------------------------Get TranslatRefundPolicy Api-------------------------------------//

  
getTranslatRefundPolicy(){
 
  this.service.getApi(`content/refund-cancellation?lang=${this.language}`,1).subscribe(res=>{
    console.log('translatRefundPolicy',res)
    if(res.status ==200){
      this.spinner.hide()
      this.editorValue=res.body.description
      // this.service.showSuccess(res.body.message)
      this.ekeditorForm.patchValue({
        'editror'   :   this.editorValue
      })
    }
  },err=>{
    this.spinner.hide()
    if(err.status == 400){
      this.spinner.hide()
      this.service.toastErr("Incorrect type")
    }
    if(err.status ==  403 ||  err.status  ==  401){
      this.spinner.hide()
      this.service.logout()
    }
  })
}



// ---------------------------------TranslatRefundPolicy Api-------------------------------------//

  
translatAboutUs(){
  this.spinner.show()
  let object={
    "description": this.ekeditorForm.value.editror,
    // "for_user": this.type,
    "language": this.language,
    "about_us": this.Translate_id
  }
  this.service.postApi('content/created-translated-about-us',object,1).subscribe(res=>{
    console.log('translatAboutUs',res)
    if(res.status ==200){
      this.spinner.hide()
      this.service.showSuccess(res.body.message)
      this.router.navigate(['legal-terms'])
    }
  },err=>{
    this.spinner.hide()
    if(err.status == 400){
      this.spinner.hide()
      this.service.toastErr("Incorrect type")
    }
    if(err.status ==  403 ||  err.status  ==  401){
      this.spinner.hide()
      this.service.logout()
    }
  })
}


gettranslatAboutUs(){
 
  this.service.getApi(`content/about-us?lang=${this.language}`,1).subscribe(res=>{
    console.log('gettranslatAboutUs',res)
    if(res.status ==200){
      this.spinner.hide()
      this.editorValue=res.body.description
      this.ekeditorForm.patchValue({
        'editror'   :   this.editorValue
      })
    }
  },err=>{
    this.spinner.hide()
    if(err.status == 400){
      this.spinner.hide()
      this.service.toastErr(err.message)
    }
    if(err.status ==  403 ||  err.status  ==  401){
      this.spinner.hide()
      this.service.logout()
    }
  })
}





// ---------------------------------TranslatRefundPolicy Api-------------------------------------//

  
translatAvailability(){
  this.spinner.show()
  let object={
    "description": this.ekeditorForm.value.editror,
    // "for_user": this.type,
    "language": this.language,
    "availability_information": Number(this.Translate_id)
  }
  this.service.postApi('content/translated-availability-information',object,1).subscribe(res=>{
    console.log('translatAboutUs',res)
    if(res.status ==200){
    
      this.spinner.hide()
      this.service.showSuccess("Availability Information submitted successfully.")
      this.router.navigate(['legal-terms'])
    }
  },err=>{
    this.spinner.hide()
    if(err.status == 400){
      this.spinner.hide()
      this.service.toastErr("Incorrect type")
    }
    if(err.status ==  403 ||  err.status  ==  401){
      this.spinner.hide()
      this.service.logout()
    }
  })
}

// ---------------------------------Get translatAvailability Api-------------------------------------//

gettranslatAvailability(){
 
  this.service.getApi(`content/availability-information?lang=${this.language}`,1).subscribe(res=>{
    console.log('gettranslatAvailability',res)
    if(res.status ==200){
      this.spinner.hide()
      this.editorValue=res.body[0].description
      this.ekeditorForm.patchValue({
        'editror'   :   this.editorValue
      })
    }
  },err=>{
    this.spinner.hide()
    if(err.status == 400){
      this.spinner.hide()
      this.service.toastErr(err.message)
    }
    if(err.status ==  403 ||  err.status  ==  401){
      this.spinner.hide()
      this.service.logout()
    }
  })
}



     // ----------------Router Link---------------------------------//
     generate(value){
       this.values=value
      if(this.language=='th'){
        if(this.values ==='Customer' || this.values ==='Merchant' || this.values=='Driver'){
          $('#googleauth').modal({ backdrop: 'static', keyboard: false })
        }else if(this.values ==='Privacypolicy'){
          $('#googleauth').modal({ backdrop: 'static', keyboard: false })
        }else if(this.values ==='RefundPolicy'){
          $('#googleauth').modal({ backdrop: 'static', keyboard: false })
        }else if(this.values ==='aboutus'){
          $('#googleauth').modal({ backdrop: 'static', keyboard: false })
        }else if(this.values ==='AvailabilityInformation'){
          $('#googleauth').modal({ backdrop: 'static', keyboard: false })
        }
      }else{
      if(this.values ==='Customer' || this.values ==='Merchant' || this.values=='Driver'){
        $('#googleauth').modal({ backdrop: 'static', keyboard: false })
      }else if(this.values ==='Privacypolicy'){
        $('#googleauth').modal({ backdrop: 'static', keyboard: false })
      }else if(this.values ==='RefundPolicy'){
        $('#googleauth').modal({ backdrop: 'static', keyboard: false })
      }else if(this.values ==='aboutus'){
        $('#googleauth').modal({ backdrop: 'static', keyboard: false })
      }else if(this.values ==='AvailabilityInformation'){
        $('#googleauth').modal({ backdrop: 'static', keyboard: false })
      }
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
          this.updateTerms()
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
