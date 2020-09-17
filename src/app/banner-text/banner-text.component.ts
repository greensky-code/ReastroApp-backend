import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { isBuffer } from 'util';
import { DOCUMENT } from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-banner-text',
  templateUrl: './banner-text.component.html',
  styleUrls: ['./banner-text.component.css']
})
export class BannerTextComponent implements OnInit {


  howForm:FormGroup;

  bannerForm:FormGroup;

  restaurantForm:FormGroup;

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

  howList:any=[];

  howWorkdata: any;

  bannerTYranslateList: any=[];

  bannerList: any;
  restaurantData: any;
  restaurantTranslateData: any;
  bannersValue: any;

  constructor(private service: ApiServiceService, private router: Router, private fb: FormBuilder, private activateRouter: ActivatedRoute, private spinner: NgxSpinnerService,
    @Inject(DOCUMENT) private _document: Document) {

    this.getAllapis()

   }
  

  ngOnInit() {
   
   
  }

  getAllapis(){

   

    this.activateRouter.params.subscribe(res => {


      this.values = res.valueTo

      this.language = res.language

      this.types = res.type



    })




    if(this,this.language == 'th'){

      if(this.values == 'banner-text'){

        this.getBannetTranslate()
        // this.getHowitWorkTranslate()

      }else if(this.values == 'how-it-work'){

        // this.getBannetTranslate() 
        this.getHowitWorkTranslate()

      }else if(this.values == 'Restaurant-in-your-hand'){

        this.getRestaurantTranslate()

      }

 

    }else {

      if(this.values == 'banner-text'){


      
        this.getBanner()

      }else if(this.values == 'how-it-work'){


        this.getDataItwork()

      }

      else if(this.values == 'Restaurant-in-your-hand'){

        this.getRestaurant()

      }
    }

    if(this.values == 'how-it-work'){
    
      this.howForm=this.fb.group({
  
        'howTitle1'             :     [''],
  
        'howDescription1'       :     [''],
  
        'howTitle2'             :     [''],
  
        'howDescription2'       :     [''],
  
        'howTitle3'             :     [''],
  
        'howDescription3'       :     [''],
  
      })
  
    }else if(this.values == 'banner-text'){
  
      this.bannerForm=this.fb.group({
  
        'bannertitle'             :     [''],
  
        'bannerDescription'       :     [''],
      })
    }
  
    else if(this.values == 'Restaurant-in-your-hand'){
  
  
      this.restaurantForm=this.fb.group({
  
        'restaurantTitle'             :     [''],
  
        'restaurantDescription'       :     [''],
      })
  
    }
  
    
  }



getDataItwork(){
  

  this.spinner.show()

  this.service.getApi(`master/how-it-works`,1).subscribe((data)=>{
 
    if(data.status == 200 ){
      // window.location.reload(false);

      this.spinner.hide()
      // setTimeout(function(){
     
      //   window.location.reload();
      // }, 1000);

    this.howList=data.body;


    this.howForm.patchValue({

      'howTitle1'             :     this.howList[0].title,

      'howDescription1'       :     this.howList[0].description,

      'howTitle2'             :     this.howList[1].title,

      'howDescription2'       :     this.howList[1].description,

      'howTitle3'             :     this.howList[2].title,

      'howDescription3'       :     this.howList[2].description,
    })

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
    });
}






submitHowIt(){

  this.spinner.show()

  let object={
    "how_it_works": [
        {
            "title": this.howForm.value.howTitle1,
            "description": this.howForm.value.howDescription1
        },
        {
            "title": this.howForm.value.howTitle2,
            "description": this.howForm.value.howDescription2
        },
        {
            "title": this.howForm.value.howTitle3,
            "description": this.howForm.value.howDescription3
        }
    ]
}

  this.service.postApi(`master/how-it-works`,object,1).subscribe(res=>{

    if(res.status == 200 ){

      this.service.showSuccess(res.body.message)

      this.spinner.hide()

      this.router.navigate(['website-home-page'])
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


getHowitWorkTranslate(){


  this.service.getApi(`master/how-it-works/${this.language}`,1).subscribe(res=>{

    if(res.status == 200 ){

      this.bannerTYranslateList=res.body;
      

    this.howForm.patchValue({

      'howTitle1'             :     this.bannerTYranslateList[0].title,

      'howDescription1'       :     this.bannerTYranslateList[0].description,

      'howTitle2'             :     this.bannerTYranslateList[1].title,

      'howDescription2'       :     this.bannerTYranslateList[1].description,

      'howTitle3'             :     this.bannerTYranslateList[2].title,

      'howDescription3'       :     this.bannerTYranslateList[2].description,
    })

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
// -----------------------------------How it work Translate ---------------------------//


updateHowWorkTranslate(){

  this.spinner.show()

  let object={
    "how_it_works_thai":[
    {
        "id": this.bannerTYranslateList[0].id,
        "title": this.howForm.value.howTitle1,
        "description": this.howForm.value.howDescription1,
        "how_it_work": this.bannerTYranslateList[0].how_it_work
    },
    {
        "id": this.bannerTYranslateList[1].id,
        "title": this.howForm.value.howTitle2,
        "description": this.howForm.value.howDescription2,
        "how_it_work":  this.bannerTYranslateList[1].how_it_work
    },
    {
        "id": this.bannerTYranslateList[2].id,
        "title": this.howForm.value.howTitle3,
        "description": this.howForm.value.howDescription3,
        "how_it_work":  this.bannerTYranslateList[2].how_it_work
    }
]
  }


  this.service.postApi(`master/how-it-works-translate`,object,1).subscribe(res=>{

    if(res.status == 200 ){

      this.spinner.hide()


      this.service.showSuccess(res.body.message)

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

// ------------------------------Update methos and Translate Api--------------------------------//

updateWork(){
  
  if(this.language == 'th' ){

    if(this.values == 'how-it-work'){

      this.updateHowWorkTranslate()

    } else if(this.values == 'banner-text'){

      this.updateBannertranslate()
    }
    else if(this.values == 'Restaurant-in-your-hand'){

      this.updateTranslateRestaurants()

    }



  }else {

    if(this.values == 'how-it-work'){

      this.submitHowIt()

    }else if(this.values == 'banner-text'){

      this.updateBanner()

    } else if(this.values == 'Restaurant-in-your-hand'){

      this.updateRestaurant()

    }


  }



}




getBanner(){


  this.spinner.show()

  this.service.getApi(`master/banner-content/${this.types}`,1).subscribe((data)=>{
 
    if(data.status == 200 ){

    this.spinner.hide()

    this.bannerList=data.body;



    this.bannerForm.patchValue({

      'bannertitle'             :     this.bannerList.title,

      'bannerDescription'       :     this.bannerList.description,

    })

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
    });
}


updateBanner(){

  this.spinner.show()

  let object={
    "title": this.bannerForm.value.bannertitle,
    "description": this.bannerForm.value.bannerDescription,
    "web_type": this.bannerList.web_type,
    
  }


  this.service.postApi('master/banner-content',object,1).subscribe(res=>{

    if(res.status == 200 ){

      this.spinner.hide()

      this.service.showSuccess('Banner updated successfully.')

      this.router.navigate(['website-home-page'])

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




// --------------------------------Banner translate Api---------------------//

getBannetTranslate(){
    this.spinner.show()
  
    this.service.getApi(`master/banner-content/${this.types}/${this.language}`,1).subscribe((data)=>{
      if(data.status == 200 ){
  
      this.spinner.hide()
  
      this.bannerList=data.body;
  
  
  
      this.bannerForm.patchValue({
  
        'bannertitle'             :     this.bannerList.title,
  
        'bannerDescription'       :     this.bannerList.description,
  
      })
  
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
      });
  }
  


// ------------------------Restaurant in your hand----------------------------//

getRestaurant(){

  this.spinner.show()

  this.service.getApi(`master/restaurant-in-your-hand`,1).subscribe((data)=>{
 
    if(data.status == 200 ){

      this.spinner.hide()

    this.restaurantData=data.body;


    this.restaurantForm.patchValue({

      'restaurantTitle'             :     this.restaurantData.title,

      'restaurantDescription'       :     this.restaurantData.description,
    
    })



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
    });
}


// -----------------------------Update Restaurant Api----------------------//

updateRestaurant(){

  this.spinner.show()

  let object={
    "title": this.restaurantForm.value.restaurantTitle,
    "description": this.restaurantForm.value.restaurantDescription,
    
  }


  this.service.postApi('master/restaurant-in-your-hand',object,1).subscribe(res=>{

    if(res.status == 200 ){

      this.spinner.hide()

      this.service.showSuccess('Restaurant added successfully.')

      this.router.navigate(['website-home-page'])

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

// -----------------------Restaurant translate--------------------------------------------------//

getRestaurantTranslate(){

  this.spinner.show()

  this.service.getApi(`master/restaurant-in-your-hand/${this.language}`,1).subscribe((data)=>{
 
    if(data.status == 200 ){

      this.spinner.hide()

    this.restaurantTranslateData=data.body;


    this.restaurantForm.patchValue({

      'restaurantTitle'             :     this.restaurantTranslateData.title,

      'restaurantDescription'       :     this.restaurantTranslateData.description,
    
    })



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
    });
}


// -----------------------------Update Restaurant -----------------------------//

updateTranslateRestaurants(){

  this.spinner.show()

  let object={

    "language"      : this.restaurantTranslateData.language,

    "title"         : this.restaurantForm.value.restaurantTitle,

    "description"   : this.restaurantForm.value.restaurantDescription,

    "res"           : this.restaurantTranslateData.res,   
  }


  this.service.postApi('master/restaurant-in-your-hand-translate',object,1).subscribe(res=>{

    if(res.status == 200 ){

      this.spinner.hide()

      this.service.showSuccess('Restaurant added successfully.')

      this.router.navigate(['website-home-page'])

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

updateBannertranslate(){

  this.spinner.show()

  let object={

    "language"      : this.bannerList.language,

    "title"         : this.bannerForm.value.bannertitle,

    "description"   : this.bannerForm.value.bannerDescription,

    "banner"           : this.bannerList.banner,   
  }


  this.service.putApi(`master/banner-content-translate/${this.types}`,object,1).subscribe(res=>{

    if(res.status == 200 ){

      this.spinner.hide()

      this.service.showSuccess(res.body.message)

      this.router.navigate(['website-home-page'])

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
      this.bannersValue=value
      if(this.bannersValue=='banner' || this.bannersValue=='howitwork' || this.bannersValue=='Restaurant'){
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

          this.updateWork()
     
         $('#googleauth').modal('hide')
         this.router.navigate(['website-home-page'])
      
    
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


