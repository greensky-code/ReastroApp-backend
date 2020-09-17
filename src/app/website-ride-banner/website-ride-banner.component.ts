import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any;
@Component({
  selector: 'app-website-ride-banner',
  templateUrl: './website-ride-banner.component.html',
  styleUrls: ['./website-ride-banner.component.css']
})
export class WebsiteRideBannerComponent implements OnInit {

  bannerForm: FormGroup;

  howForm: FormGroup;

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

  url: string;

  restaurantBanner: any;

  object: any;
  ridebannersValue: any;

  constructor(private service: ApiServiceService, private router: Router, private fb: FormBuilder, private activateRouter: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.activateRouter.params.subscribe(res => {

      console.log('res', res)

      this.values = res.valueTo

      this.language = res.language

      this.types = res.type

      console.log('types', this.language)


    })

    this.getForms()


  }



  // ----------------------Forms-----------------------------------//

  getForms() {


    if (this.values == 'website-ride-banner') {

      this.bannerForm = this.fb.group({

        'bannerTitle': [''],

        'bannerDescription': [''],


      })

    } else if (this.values == 'food delivery') {

      this.bannerForm = this.fb.group({

        'threeStepTitle1': [''],

        'threeStepDescription1': [''],

        'threeStepTitle2': [''],

        'threeStepDescription2': [''],

        'threeStepTitle3': [''],

        'threeStepDescription3': [''],

      })
    }

    this.getdata()

  }


  getdata() {
    if (this.language == 'th') {

      if (this.values == 'website-ride-banner') {

        this.url = `master/banner-content/${this.types}/${this.language}`

        this.getallApi() 

      }else if(this.values == 'food delivery'){

        this.url = `master/why-food/${this.language}`

        this.getallApi() 

      }

    } else {

      if (this.values == 'website-ride-banner') {

        this.url = `master/banner-content/${this.types}`

        this.getallApi()


      } else if (this.values == 'food delivery') {

        this.url = `master/why-food`

        this.getallApi()

      }
    }
  }


  update() {
    if (this.language == 'th') {

      if (this.values == 'website-ride-banner') {

        this.url=`master/banner-content-translate/${this.types}`

        this.updateAllput()

      }else if(this.values == 'food delivery'){

        this.url=`master/why-food-translate`

        this.updaAll() 

      }

    } else {

      if (this.values == 'website-ride-banner') {

        this.url = `master/banner-content`

        this.updaAll()


      }
      else if (this.values == 'food delivery') {

        this.url = `master/why-food`

        this.updaAll()

      }
    }
  }

  getallApi() {

    this.service.getApi(this.url, 1).subscribe(res => {

      if (res.status == 200) {

        this.restaurantBanner = res.body

        console.log('restaurantBanner', this.restaurantBanner)

        if (this.values == 'website-ride-banner') {
          this.bannerForm.patchValue({

            'bannerTitle': this.restaurantBanner.title,

            'bannerDescription': this.restaurantBanner.description,

          })

        }

        else if (this.values == 'food delivery') {


          this.bannerForm.patchValue({

            'threeStepTitle1': this.restaurantBanner[0].title,

            'threeStepDescription1': this.restaurantBanner[0].description,

            'threeStepTitle2': this.restaurantBanner[1].title,

            'threeStepDescription2': this.restaurantBanner[1].description,

            'threeStepTitle3': this.restaurantBanner[2].title,

            'threeStepDescription3': this.restaurantBanner[2].description,


          })

        }

      }
    })

  }

  // if(this.language == 'th'){

  //   this.object = {

  //     "banner": this.restaurantBanner.banner,

  //     "language":  this.restaurantBanner.language,

  //     "title": this.bannerForm.value.bannerTitle,

  //     "description": this.bannerForm.value.bannerDescription,

  //     // "web_type": this.restaurantBanner.web_type
  //   }

  // }




  updaAll() {

    this.spinner.show()

    if (this.values == 'website-ride-banner') {

      this.object = {

        "title": this.bannerForm.value.bannerTitle,

        "description": this.bannerForm.value.bannerDescription,

        "web_type": this.restaurantBanner.web_type
      }
    

    }
    else if (this.values == 'food delivery') {


      if(this.language == 'th'){

        this.object = {

          "why_food_thai": [
            {
              "title": this.bannerForm.value.threeStepTitle1,
  
              "description": this.bannerForm.value.threeStepDescription1,

              "ride": this.restaurantBanner[0].ride
            },
            {
              "title": this.bannerForm.value.threeStepTitle2,
  
              "description": this.bannerForm.value.threeStepDescription2,

              "ride": this.restaurantBanner[1].ride
            },
            {
              "title": this.bannerForm.value.threeStepTitle3,
  
              "description": this.bannerForm.value.threeStepDescription3,

              "ride": this.restaurantBanner[2].ride
            }
          ]
        }

      }else {

      this.object = {

        "why_food": [
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

            "description": this.bannerForm.value.threeStepDescription3,
          }
        ]
      }
    }


    }


    this.service.postApi(this.url, this.object, 1).subscribe(res => {

      if (res.status == 201) {

        this.spinner.hide()

        console.log('resss', res)

        this.service.showSuccess('banner updated successfully.')

        this.router.navigate(['website-ride-page'])

      } else if (res.status == 200) {

        this.spinner.hide()

        console.log('resss', res)

        this.service.showSuccess(' Data submitted successfully.')

        this.router.navigate(['website-ride-page'])

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

updateAllput(){

  this.spinner.show()

  if (this.values == 'website-ride-banner') {

      if(this.language == 'th'){

    this.object = {

      "banner": this.restaurantBanner.banner, 

      "language":  this.restaurantBanner.language,

      "title": this.bannerForm.value.bannerTitle,

      "description": this.bannerForm.value.bannerDescription,

      // "web_type": this.restaurantBanner.web_type
    }

  } else {

    this.object = {

      "title": this.bannerForm.value.bannerTitle,

      "description": this.bannerForm.value.bannerDescription,

      "web_type": this.restaurantBanner.web_type
    }

  }
  

  }
  else if (this.values == 'food delivery') {

    this.object = {

      "why_food": [
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

          "description": this.bannerForm.value.threeStepDescription3,
        }
      ]
    }


  }


  this.service.putApi(this.url, this.object, 1).subscribe(res => {

    if (res.status == 201) {

      this.spinner.hide()

      console.log('resss', res)

      this.service.showSuccess('banner updated successfully.')

      this.router.navigate(['website-ride-page'])

    } else if (res.status == 200) {

      this.spinner.hide()

      console.log('resss', res)

      this.service.showSuccess(' Data submitted successfully.')

      this.router.navigate(['website-ride-page'])

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
  this.ridebannersValue=value
  console.log('ridebannersValue',this.ridebannersValue)
  if(this.ridebannersValue=='banner' || this.ridebannersValue=='foodDelivery'){
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
