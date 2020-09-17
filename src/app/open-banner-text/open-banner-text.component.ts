import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any;
@Component({
  selector: 'app-open-banner-text',
  templateUrl: './open-banner-text.component.html',
  styleUrls: ['./open-banner-text.component.css']
})
export class OpenBannerTextComponent implements OnInit {

  bannerForm: FormGroup;

  howForm:FormGroup;

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

  arr:any=[];

  createBin: any;

  pushValus=[];

  url: string;

  restaurantBanner: any;

  object: any;
  openbannersValue: any;

  constructor(private service: ApiServiceService, private router: Router, private fb: FormBuilder, private activateRouter: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.activateRouter.params.subscribe(res => {

      console.log('res', res)

      this.values = res.valueTo

      this.language = res.language

      this.types = res.type

      console.log('types',  this.types)


    })

    this.getForms()
 

  }



  // ----------------------Forms-----------------------------------//

  getForms() {
    
    
   if(this.values =='banner-text'){

    this.bannerForm = this.fb.group({

      'bannerTitle'       : [''],

      'bannerDescription' : [''],


    })

  }else if(this.values == '3_simple_steps'){

    this.bannerForm = this.fb.group({

      'threeStepTitle1'       : [''],

      'threeStepDescription1' : [''],

      'threeStepTitle2'       : [''],

      'threeStepDescription2' : [''],

      'threeStepTitle3'       : [''],

      'threeStepDescription3' : [''],

    })
  }

  this.getdata()

  }


  getdata(){
    console.log('urljhgdhasgdjhasdhah')
    if(this.language == 'th'){

      if(this.values == 'banner-text'){

        this.url=`master/banner-content/${this.types}/${this.language}`
        console.log('url',this.url)

        this.getallApi()

      }else if(this.values == '3_simple_steps'){

        this.url=`master/three-step-to-start/${this.language}`

        this.getallApi()

      }
    
    }else {

      if(this.values == 'banner-text'){

        this.url=`master/banner-content/${this.types}`

        this.getallApi()


      }else if(this.values == '3_simple_steps'){

        this.url=`master/three-step-to-start`

        this.getallApi()

      }
    }
  }


  update(){
    if(this.language == 'th'){

      if(this.values == 'banner-text'){

        this.url=`master/banner-content-translate/${this.types}`

        this.updaAllput()

      }else if(this.values == '3_simple_steps'){

        this.url=`master/three-step-to-start-translate`

        this.updaAll()
      }
    
    }else {

      if(this.values == 'banner-text'){

        this.url=`master/banner-content`

        this.updaAll()


      }
      else if(this.values == '3_simple_steps'){

        this.url=`master/three-step-to-start`

        this.updaAll()

      }
    }
  }

  getallApi(){

    this.service.getApi(this.url,1).subscribe(res=>{

      if(res.status == 200 ){

        this.restaurantBanner=res.body

        console.log('restaurantBanner',this.restaurantBanner)

        if(this.values == 'banner-text'){
        this.bannerForm.patchValue({
          
          'bannerTitle'       : this.restaurantBanner.title,

          'bannerDescription' : this.restaurantBanner.description,
    
        })

      }

       else  if(this.values == '3_simple_steps'){

          this.bannerForm.patchValue({

            'threeStepTitle1'       : this.restaurantBanner[0].title,

            'threeStepDescription1' : this.restaurantBanner[0].description,
      
            'threeStepTitle2'       : this.restaurantBanner[1].title,
      
            'threeStepDescription2' : this.restaurantBanner[1].description,
      
            'threeStepTitle3'       : this.restaurantBanner[2].title,
      
            'threeStepDescription3' : this.restaurantBanner[2].description,
      

          })

        }
        
      }
    })

  }


  updaAll(){

    this.spinner.show()

    if(this.values == 'banner-text'){
  
    this.object ={

      "title"           : this.bannerForm.value.bannerTitle,

      "description"     :this.bannerForm.value.bannerDescription,

      "web_type"        :this.restaurantBanner.web_type
    }
    } 
    else if(this.values == '3_simple_steps'){

  
    if(this.language == 'th'){

      this.object={

        "three_step_thai": [
            {
               

                "title": this.bannerForm.value.threeStepTitle1,

                "description": this.bannerForm.value.threeStepDescription1,

                "three_step"  : this.restaurantBanner[0].three_step,

                "language": this.restaurantBanner[0].language,
            },
            {
                "title": this.bannerForm.value.threeStepTitle2,

                "description": this.bannerForm.value.threeStepDescription2,


                "three_step"  : this.restaurantBanner[1].three_step,

                "language": this.restaurantBanner[1].language,
                
            },
            {
                "title": this.bannerForm.value.threeStepTitle3,

                "description":this.bannerForm.value.threeStepDescription3,


                "three_step"  : this.restaurantBanner[2].three_step,

                "language": this.restaurantBanner[2].language,
            }
        ]
    }

    } else {

      this.object={

        "three_steps": [
            {
                "title": this.bannerForm.value.threeStepTitle1,

                "description": this.bannerForm.value.threeStepDescription1,
            },
            {
                "title": this.bannerForm.value.threeStepTitle2,

                "description": this.bannerForm.value.threeStepDescription2,
            },
            {
                "title": this.bannerForm.value.threeStepTitle3,

                "description":this.bannerForm.value.threeStepDescription3,
            }
        ]
    }

    }
    


    }

  
        this.service.postApi(this.url,this.object,1).subscribe(res=>{
  
      if(res.status == 201 ){
  
        this.spinner.hide()
  
        console.log('resss',res)

        this.service.showSuccess('banner updated successfully.')
  
        this.router.navigate(['open-restaurant-page']) 
  
      }else if(res.status == 200 ){

        this.spinner.hide()
  
        console.log('resss',res)

        this.service.showSuccess(' Data submitted successfully.')

        this.router.navigate(['open-restaurant-page']) 

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

  updaAllput(){

    this.spinner.show()

    if(this.values == 'banner-text'){
  
    this.object ={

      "language":  this.restaurantBanner.language,

      "title"           : this.bannerForm.value.bannerTitle,

      "description"     :this.bannerForm.value.bannerDescription,

      "res": this.restaurantBanner.res,
    }
    } 
    else if(this.values == '3_simple_steps'){

      this.object={

        "three_steps": [
            {
                "title": this.bannerForm.value.threeStepTitle1,

                "description": this.bannerForm.value.threeStepDescription1,
            },
            {
                "title": this.bannerForm.value.threeStepTitle2,

                "description": this.bannerForm.value.threeStepDescription2,
            },
            {
                "title": this.bannerForm.value.threeStepTitle3,

                "description":this.bannerForm.value.threeStepDescription3,
            }
        ]
    }


    }

  
        this.service.putApi(this.url,this.object,1).subscribe(res=>{
  
      if(res.status == 201 ){
  
        this.spinner.hide()
  
        console.log('resss',res)

        this.service.showSuccess('banner updated successfully.')
  
        this.router.navigate(['open-restaurant-page']) 
  
      }else if(res.status == 200 ){

        this.spinner.hide()
  
        console.log('resss',res)

        this.service.showSuccess(' Data submitted successfully.')

        this.router.navigate(['open-restaurant-page']) 

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

   // ----------------Router Link---------------------------------//
   generate(value){
    this.openbannersValue=value
    console.log('openbannersValue',this.openbannersValue)
    if(this.openbannersValue=='banner' || this.openbannersValue=='simpleSteps'){
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

        this.update()
   
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
}
