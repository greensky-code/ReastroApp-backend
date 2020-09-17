import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any;
@Component({
  selector: 'app-driver-submit-kyc',
  templateUrl: './driver-submit-kyc.component.html',
  styleUrls: ['./driver-submit-kyc.component.css']
})
export class DriverSubmitKycComponent implements OnInit {
  submitFormKyc: FormGroup;
  fileName1: any;
  registrsImage: any;
  fileName2: any;
  image: any;
  image1: any;
  image2: any;
  image3: any;
  image4: any;
  image5: any;
  countriesList: any;
  data1: any;
  data2: any;
  statesList: any;
  merchantId: any;
  gender: any;
  todayDate: any;
  thaidata: any;
  country_data: any;
  state_id: any;
  statelist: any;
  object:any={};
  data= new Date;
  toMaxDate=new  Date();
  todaysDate: Date;
  dateValue: any;
  showOtpComponent=true;
  varificationCode: any;
  driverValue: string;
  nationalitys: any;
  language: any;
  errorMessage: any;
  
  constructor(private router:Router, private service: ApiServiceService, private fb:FormBuilder,private activatedRoute:ActivatedRoute, private tostr:ToastrService,private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((res) => {
      this.merchantId = JSON.parse(res.id)
      // this.starsCount=3
    })
    setInterval(() => {
      this.language=localStorage.getItem('language')
      },50);
    this.formOne();
    this.getCountry();
    this.getNationalitys();
    this.datess();
  }

  
  formOne(){
    this.submitFormKyc=this.fb.group({
      nationality                          :['',Validators.required],
      dateOfBirth                          :['',Validators.required],
      titel                                :['Mr.',Validators.required],
      email                                :['',Validators.compose([Validators.maxLength(255),Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)])],
      gender                               :['',Validators.required],
      FirstName                            :['',Validators.compose([Validators.required,Validators.maxLength(255),Validators.pattern(/^[a-z]+(?:['_.\s][a-z]+)*$/i)])],
      // passPortNationalId                   :['',Validators.compose([Validators.required,Validators.maxLength(50),Validators.pattern(/^[0-9A-Za-z]{1}[-][0-9A-Za-z]{4}[-][0-9A-Za-z]{5}[-][0-9A-Za-z]{2}[-][0-9A-Za-z]{1}$/)])],
      passPortNationalId                    : ['',],
      lastName                             :['',Validators.compose([Validators.required,Validators.maxLength(255),Validators.pattern(/^[a-z]+(?:['_.\s][a-z]+)*$/i)])],
      selfi                                :['',Validators.required],
      street                               :['',Validators.compose([Validators.required,Validators.maxLength(255)])],
      city                                 :['',Validators.compose([Validators.required,Validators.maxLength(255),Validators.pattern(/^[a-z]+(?:['_.\s][a-z]+)*$/i)])],
      country                              :['',Validators.required],
      province                             :['',Validators.required],
      zipCode                              :['',Validators.compose([Validators.required,Validators.maxLength(8),Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
      typeOfVehicle                        :['',Validators.required],
      licensenumber                        :['',Validators.compose([Validators.required,Validators.maxLength(20),Validators.pattern(/^[A-Z0-9.,/ $@()]+$/)])],
      insurancenumber                      :['',Validators.compose([Validators.required,Validators.maxLength(50),Validators.pattern(/^[A-Z0-9.,/ $@()]+$/)])],
      insurancecompany                     :['',Validators.compose([Validators.required,Validators.maxLength(255)])],
      NationalidPassportImage              :['',Validators.required],
      vehicleImage                         :['',Validators.required],
      licenseImage                         :['',Validators.required],
      insuranceImage                       :['',Validators.required],
      MiddleName                           :['',Validators.compose([Validators.maxLength(255),Validators.pattern(/^[a-z]+(?:['_.\s][a-z]+)*$/i)])],
      // plateNumber                       :['',Validators.compose([Validators.required,Validators.maxLength(250),Validators.pattern("'^[a-zA-Z0-9 \'\-]+$'")])/^[A-Z]{2}[0-9]{4}$/)]
      plateNumber                          :['',Validators.compose([Validators.required,Validators.maxLength(15),Validators.pattern(/^[A-Z]{2}[ -][0-9]{4}$/)])],
    })
    // ^[A-Z]{2}([ \-])[0-9]{2}[ ,][A-Z0-9]{1,2}[A-Z]\1[0-9]{4}$  ^[A-Z0-9.,/ $@()]+$
  }
//  fgsfsdfdsfds
  datess(){
    this.todaysDate=new Date()
    const now = new Date();
    this.todaysDate.setFullYear(this.todaysDate.getFullYear() - 18);
    
  this.fromMaxDate(0)
  }
  fromMaxDate(value){
    this.dateValue=value
    this.toMaxDate=this.todaysDate
  }

  driverKyc() {

    // this.data=this.submitFormKyc.value.dateOfBirth

// sdfdsfdfdsfds

//     const now = new Date(this.data);
// now.setFullYear(now.getFullYear() - 1);
    this.spinner.show()
    if(this.thaidata=='Thai'){
    this.object = {
      "driver": this.merchantId,
      "nationality": this.submitFormKyc.value.nationality,
      "title": this.submitFormKyc.value.titel,
      "email": this.submitFormKyc.value.email,
      "first_name": this.submitFormKyc.value.FirstName,
      "last_name": this.submitFormKyc.value.lastName,
      "middle_name": this.submitFormKyc.value.MiddleName,
      "dob": this.dateValue,
      "gender": this.submitFormKyc.value.gender,
      "passport_national_id": this.submitFormKyc.value.passPortNationalId,
      // "passport_national_id":this.submitFormKyc.get('nationalId').setValidators([Validators.required,Validators.pattern(/^[0-9A-Za-z]{1}[-][0-9A-Za-z]{4}[-][0-9A-Za-z]{5}[-][0-9A-Za-z]{2}[-][0-9A-Za-z]{1}$/)]),
      "selfi": this.image5,
      "national_id_image":this.image1,
      "address": {
        "street": this.submitFormKyc.value.street,
        "city": this.submitFormKyc.value.city,
        "country": this.submitFormKyc.value.country,
        "province": this.submitFormKyc.value.province,
        "zip_code": this.submitFormKyc.value.zipCode,
      },
      "vehicle": {
        "type_of_vehicle": this.submitFormKyc.value.typeOfVehicle,
        "plate_number": this.submitFormKyc.value.plateNumber,
        "license_number": this.submitFormKyc.value.licensenumber,
        "insurance_number": this.submitFormKyc.value.insurancenumber,
        "insurance_company": this.submitFormKyc.value.insurancecompany,
        "vehicle_image": this.image2,
        "license_image": this.image3,
        "insurance_image": this.image4,
      }
    }
  } else {
    this.object = {
      "driver": this.merchantId,
      "nationality": this.submitFormKyc.value.nationality,
      "title": this.submitFormKyc.value.titel,
      "email": this.submitFormKyc.value.email,
      "first_name": this.submitFormKyc.value.FirstName,
      "last_name": this.submitFormKyc.value.lastName,
      "middle_name": this.submitFormKyc.value.MiddleName,
      "dob": this.dateValue,
      "gender": this.submitFormKyc.value.gender,
      "passport_national_id": this.submitFormKyc.value.passPortNationalId, 
      // "passport_national_id":this.submitFormKyc.get('nationalId').setValidators([Validators.required,Validators.pattern(/^[0-9A-Za-z]{1}[-][0-9A-Za-z]{4}[-][0-9A-Za-z]{5}[-][0-9A-Za-z]{2}[-][0-9A-Za-z]{1}$/)]),
      "selfi": this.image5,
      "national_id_image":this.image1,
      "address": {
        "street": this.submitFormKyc.value.street,
        "city": this.submitFormKyc.value.city,
        "country": this.submitFormKyc.value.country,
        "province": this.submitFormKyc.value.province,
        "zip_code": this.submitFormKyc.value.zipCode,
      },
      "vehicle": {
        "type_of_vehicle": this.submitFormKyc.value.typeOfVehicle,
        "plate_number": this.submitFormKyc.value.plateNumber,
        "license_number": this.submitFormKyc.value.licensenumber,
        "insurance_number": this.submitFormKyc.value.insurancenumber,
        "insurance_company": this.submitFormKyc.value.insurancecompany,
        "vehicle_image": this.image2,
        "license_image": this.image3,
        "insurance_image": this.image4,
      }
    }
  }

    this.service.postApi('driver/upload-kyc', this.object, 1).subscribe(res => {
      if (res.status == 200) {
        this.spinner.hide()
        this.tostr.success('Kyc uploaded successfully.')
        this.router.navigate(['manage-drivers'])
      }
    }, err => {
      if (err.status == 403 || err.status == 401) {
        this.spinner.hide()
        this.service.logout();
      }
      else if (err.status == 400) {
        this.spinner.hide()
        this.service.toastErr(err.error.message)
        // if(err.error.passport_national_id[0]){
        // this.tostr.error(err.error.passport_national_id[0])
        // }else if(err.error.vehicle[0]){
        // this.tostr.error(err.error.vehicle[0])
        // }else if(err.error.passport_national_id[0] && err.error.vehicle[0]){
        //   this.tostr.error(err.error.vehicle[0])
        // }
      }
    })
  }

  getCountry() {
    this.service.getApi('api/country-list', 1).subscribe((res) => {
      this.countriesList = res.body
    })
  }

  onSelect(event) {
    this.countriesList.forEach(element => {
      if (element.id == this.submitFormKyc.value.country) {
        this.state_id = element.id
        this.getstates()
      }
    });
  }

  getstates() {
    var data = {
      "country_id": this.state_id
    }
    this.service.postApi('api/state-list', data, 1).subscribe((res) => {
      this.statelist = res.body
      
    })
  }

  onSelects(event){
    this.thaidata = this.submitFormKyc.value.nationality
    if(this.thaidata=='93'){
    this.submitFormKyc.get('passPortNationalId').setValidators([Validators.required,Validators.maxLength(13),Validators.pattern(/^[0-9A-Za-z]{1}[0-9A-Za-z]{4}[0-9A-Za-z]{5}[0-9A-Za-z]{2}[0-9A-Za-z]{1}$/)])

    }else {
  this.submitFormKyc.get('passPortNationalId').setValidators([Validators.required,Validators.maxLength(20),Validators.pattern(/^[A-Z0-9.,/ $@()]+$/)])

    }
  }
 
  // getNationalitys() {
  //   fetch('/assets/nationalitys.ts')
  //     .then(response => response.json())
  //     .then(json => {
  //       this.data2 = json;
  //     }
  //     );


  // }
  // -----------------Get Nationality Api----------------//
  getNationalitys(){
    this.service.getApi('api/nationality', 1).subscribe((res) => {
      this.nationalitys = res.body 
    })
  }

  handleFileInputFrontCertificatDBD(event, image) {
    this.spinner.show()
 
    var self = this;
    let formData = new FormData();
    if (event.target.files && event.target.files[0]) {
      var type = event.target.files[0].type;
      var size = event.target.files[0].size;
      let count = 0;
      if (size < 2000000) {
        if (type === 'image/png' || type === 'image/jpg' || type === 'image/jpeg') {
          //self.authObj.docFile1 = event.target.files[0].name;
          this.fileName1 = event.target.files[0];
          count++;
        } else if (type === 'application/pdf') {
          this.fileName1 = event.target.files[0];
          // formData.append('file', this.fileName1);
          count++;
        } else if (type === 'image/jpeg') {
          this.fileName1 = event.target.files[0];
          count++;
        }
        else if (type === 'image/jpg') {
          this.fileName1 = event.target.files[0];
          count++;
        } else {
          this.tostr.error("This type is not acceptable!");
          return;
        }

        //********************************************* nationalId
        if (image === "nationalId") {
          this.spinner.show()
          this.image1 = this.fileName1.name
          this.submitFormKyc.patchValue({
            NationalidPassportImage: this.image1,
          })
          formData.append('image', this.fileName1);
        this.service.postApi('merchant/image', formData, 2).subscribe((data: any) => {
          if(data.status==200){
          this.spinner.hide()
          this.image1 = data.body.file_name;
          }
        }, err => {
          if (err.status == 403 || err.status == 401) {
            this.service.logout();
          }
          else if (err.status == 400) {
            this.tostr.error(err.error.message)
          }
        })
        }
        

        //********************************************** vehicleimage
       if (image === "vehicleimage") {
        this.spinner.show()
          this.image2 = this.fileName1.name
          this.submitFormKyc.patchValue({
            vehicleImage: this.image2,
          })
          formData.append('image', this.fileName1);
        this.service.postApi('merchant/image', formData, 2).subscribe((data: any) => {
          if(data.status==200){
            this.spinner.hide()
          this.image2 = data.body.file_name;
          }
        }, err => {
          if (err.status == 403 || err.status == 401) {
            this.service.logout();
          }
          else if (err.status == 400) {
            this.tostr.error(err.error.message)
          }
        })
        }
        

        //********************************************** licenseImage
        if (image === "licenseimage") {
          this.spinner.show()
          this.image3 = this.fileName1.name
          this.submitFormKyc.patchValue({
            licenseImage: this.image3,
          })
          formData.append('image', this.fileName1);
        this.service.postApi('merchant/image', formData, 2).subscribe((data: any) => {
          if(data.status==200){
            this.spinner.hide()
          this.image3 = data.body.file_name;
          }
        }, err => {
          if (err.status == 403 || err.status == 401) {
            this.service.logout();
          }
          else if (err.status == 400) {
            this.tostr.error(err.error.message)
          }
        })
        }
        

        //*************************************************** insuranceImage
        if (image === "insuranceimage") {
          this.spinner.show()
          this.image4 = this.fileName1.name
          this.submitFormKyc.patchValue({
            insuranceImage: this.image4,
            
          })
          formData.append('image', this.fileName1);
        this.service.postApi('merchant/image', formData, 2).subscribe((data: any) => {
          if(data.status==200){
            this.spinner.hide()
          this.image4 = data.body.file_name;
          }
        }, err => {
          if (err.status == 403 || err.status == 401) {
            this.service.logout();
          }
          else if (err.status == 400) {
            this.tostr.error(err.error.message)
          }
        })
        }
        

        //*************************************************** selfiimage
        if (image === "selfiimage") {
          this.spinner.show()
          this.image5 = this.fileName1.name
          this.submitFormKyc.patchValue({
            selfi: this.image5,
          })
          formData.append('image', this.fileName1);
        this.service.postApi('merchant/image', formData, 2).subscribe((data: any) => {
          if(data.status==200){
            this.spinner.hide()
          this.image5 = data.body.file_name;
          }
        }, err => {
          if (err.status == 403 || err.status == 401) {
            this.service.logout();
          }
          else if (err.status == 400) {
            this.tostr.error(err.error.message)
          }
        })
        }
        
        // let data={
        //   'image1'  : this.image1,
        //   'image2'  : this.image2,
        //   'image3'  : this.image3,
        //   'image4'  : this.image4,
        //   'image5'  : this.image5,
        // }    
      }
      // else {
      //   this.tostr.error("Size should be less than 2 MB.");
      // }
      // formData.append('image', this.fileName1);
      // this.service.postApi('merchant/image', formData, 2).subscribe((data: any) => {
      //   this.image = data.body.file_name;
      // }, err => {
      //   if (err.status == 403 || err.status == 401) {
      //     this.service.logout();
      //   }
      //   else if (err.status == 400) {
      //     this.tostr.error(err.error.message)
      //   }
      // })
    }
  }

  isNumber(e) {
    // evt = (evt) ? evt : window.event;
    // var charCode = (evt.which) ? evt.which : evt.keyCode;
    // if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    //     return false;
    // }
    // return true;
    var k;
    if (e) {
      document.all ? k = e.keyCode : k = e.which;
      return ((k > 47 && k < 58) || k == 8 || (k > 64 && k < 91) || (k > 96 && k < 123));
    }
  }
  // ----------------Router Link---------------------------------//
  generate(value){
    this.driverValue=value
    if(this.driverValue=='driver'){
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
      this.driverKyc()
     $('#googleauth').modal('hide')
  

    }
   
  } ,err=>{
   if(err.status == 403 || err.status == 401){
     this.onConfigChange()
     this.service.logout();
   }
   else if (err.status == 400){
     this.onConfigChange()
     this.errorMessage=err.error.message
   }
   else if(err.status == 500){
      // this.service.toastErr(err)
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
