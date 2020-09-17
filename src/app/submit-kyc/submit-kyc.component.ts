import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
@Component({
  selector: 'app-submit-kyc',
  templateUrl: './submit-kyc.component.html',
  styleUrls: ['./submit-kyc.component.css']
})
export class SubmitKycComponent implements OnInit {
  data1: any;
  data: any = [];

  model_phone_number: '';
  signupPhoneNumber
  submitFormKyc: FormGroup;
  country: Event;
  businessOwnerNationality: Event;
  urls: any;
  fileToUpload: File = null;
  businessImage: File = null;
  OwnerSelfi: File = null;
  InputIDImage: File;
  fileName1: any;
  appC: any;
  authObj: any;
  fileData1: string;
  front: string;
  fileName2: any;
  fileName3: any;
  fileName4: any;
  fileName5: any;
  registrsImage: any;
  ownerSelfi: any;
  nationalIdimage: any;
  passportImage: any;
  merchantId: any;
  marchantdata: any;
  businessId: any;
  image: any;
  nationalImage: any;
  data2: any;
  nationality: any;
  countriesList: any = [];
  states: any;
  statesList: any = [];
  nationalitys: any;
  thai: any;
  values: any;
  thaidata: any;
  isValidNumber: any;
  myCode: string;
  isValidNumbers: any;
  myCodes: string;
  isValidNumber1: any;
  country_data: any;
  state_id: any;
  statelist: any;
  showOtpComponent = true;
  varificationCode: any;
  merchantValue: any;
  language: any;
  errorMessage: any;
  passportImages: any;

  object:any=[]
  constructor(private router: Router, private service: ApiServiceService, private fb: FormBuilder, private activatedRoute: ActivatedRoute, private tostr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getCountry();
    this.activatedRoute.params.subscribe((res) => {

      this.merchantId = res.id
    })
    this.formOne();
    setInterval(() => {
      this.language=localStorage.getItem('language')
      // console.log('language==>>',this.language) 
      },50);

    this.getNationalitys();

  }


  formOne() {
    // Validators.pattern(/^[a-z0-9]+$/i)
    this.submitFormKyc = this.fb.group({
      // 'businessName'                  : ["", Validators.compose([Validators.required,Validators.minLength(2),Validators.pattern(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)])],
      businessName: ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      registrationNumber: ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.pattern(/^[A-Z0-9.,/ $@()]+$/)])],
      street: ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      zipeCode: ['', Validators.compose([Validators.required, Validators.maxLength(255), Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
      businessOwnerName: ['', Validators.compose([Validators.required, Validators.maxLength(70)])],
      businessOwnerPhoneNumber: ['', Validators.compose([Validators.required, Validators.maxLength(18)])],
      // passportNumber: [''],
      nationalId: ['',],
      city: ['', Validators.compose([Validators.required, Validators.maxLength(255), Validators.pattern(/^[a-z]+(?:['_.\s][a-z]+)*$/i)])],
      contactEmail: ['', Validators.compose([Validators.required, Validators.maxLength(255), Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)])],
      country: ['', Validators.required],
      province: ['', Validators.required],
      businessOwnerNationality: ['', Validators.required],
      certificateDbd: ['', Validators.required],
      businessImage: ['', Validators.compose([Validators.required])],
      ownerSelfie: ['', Validators.compose([Validators.required])],
      // passportImage: [''],
      passportImageNationalimage: ['', Validators.compose([Validators.required])],
      number: ['', Validators.compose([Validators.required])]

    })
    // compose([Validators.required,Validators.maxLength(30),Validators.pattern(/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)])
    this.phoneCheckCountry();
    this.phoneCheckCountrys();
  }


  phoneCheckCountry() {
    $("#phoneNumber").intlTelInput({
      autoPlaceholder: false,
      autoFormat: false,
      autoHideDialCode: false,
      initialCountry: 'th',
      nationalMode: false,
      onlyCountries: [],
      // preferredCountries: ["us"],
      formatOnInit: true,
      separateDialCode: true,
      formatOnDisplay: false
    });
  }
  toCheckSpaceChar() {
    this.isValidNumber = $('#phoneNumber').intlTelInput('isValidNumber');
    const countryData = $('#phoneNumber').intlTelInput('getSelectedCountryData');
    this.myCode = "+" + countryData.dialCode;

  }

  phoneCheckCountrys() {
    $("#phoneNumber1").intlTelInput({
      autoPlaceholder: false,
      autoFormat: false,
      autoHideDialCode: false,
      initialCountry: 'th',
      nationalMode: false,
      onlyCountries: [],
      // preferredCountries: ["us"],
      formatOnInit: true,
      separateDialCode: true,
      formatOnDisplay: false
    });
  }
  toCheckSpaceChars() {
    this.isValidNumbers = $('#phoneNumber1').intlTelInput('isValidNumber');
    const countryData = $('#phoneNumber1').intlTelInput('getSelectedCountryData');
    this.myCode = "+" + countryData.dialCode;
  }

  refresh(): void {
    window.location.reload();
  }

  change(event) {
    this.country = event;
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


  // -----------------Get Nationality Api----------------//
  getNationalitys(){
    this.service.getApi('api/nationality', 1).subscribe((res) => {
      this.nationalitys = res.body 
      console.log('nationalitys',this.nationalitys)
    })
  }
  getstates() {
    var data = {
      "country_id": this.state_id
    }
    this.service.postApi('api/state-list', data, 1).subscribe((res) => {
      this.statelist = res.body
      console.log('statelist',this.statelist)
    })
  }



  handleFileInputFrontCertificatDBD(event) {
    var self = this;
    let formData = new FormData();
    if (event.target.files && event.target.files[0]) {
      var type = event.target.files[0].type;
      var size = event.target.files[0].size;
      let count = 0;

      if (size < 2000000) {
        this.spinner.show()
        if (type === 'image/png' || type === 'image/jpg' || type === 'image/jpeg') {
          //self.authObj.docFile1 = event.target.files[0].name;
          this.fileName1 = event.target.files[0];

          count++;
        }
        else if (type === 'image/png') {

          this.fileName1 = event.target.files[0];
          // formData.append('file', this.fileName1);
          count++;
        }
        else if (type === 'image/jpeg') {

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
        this.submitFormKyc.patchValue({
          certificateDbd: this.fileName1.name,
        })
        // this.submitFormKyc.patchValue({'registrationImage': this.fileName1.name})      
      }
      else {
        this.tostr.error("Size should be less than 2 MB.");
      }
      formData.append('image', this.fileName1);
      this.service.postApi('merchant/image', formData, 2).subscribe((data: any) => {
        if (data.status == 200) {
          this.spinner.hide()
          this.registrsImage = data.body.file_name;
        }
      }, error => {

        this.tostr.error("Something went wrong.")

      })
    }
  }
  handleFileInputFrontbusinessImage(event) {
    var self = this;
    let formData = new FormData();
    //formData.append('file', this.image);
    if (event.target.files && event.target.files[0]) {
      var type = event.target.files[0].type;
      var size = event.target.files[0].size;
      let count = 0;
      if (size < 2000000) {
        this.spinner.show()
        if (type === 'image/png' || type === 'image/jpg' || type === 'image/jpeg') {
          //self.authObj.docFile1 = event.target.files[0].name;
          this.fileName2 = event.target.files[0];
          formData.append('file', this.fileName2);
          count++;
        } else if (type === 'image/png') {
          this.fileName2 = event.target.files[0];
          formData.append('file', this.fileName2);
          count++;
        } else if (type === 'image/jpeg') {
          this.fileName2 = event.target.files[0];
          formData.append('image', this.fileName2);

          count++;
        } else if (type === 'image/jpg') {
          this.fileName2 = event.target.files[0];

          count++;
        } else {
          this.tostr.error("This type is not acceptable!");
          return;
        }
        this.submitFormKyc.patchValue({
          businessImage: this.fileName2.name
        })
        // this.submitFormKyc.patchValue({'businessImage1':this.fileName2.name})
      }
      else {
        this.tostr.error("Size should be less than 2 MB.");
      }
      formData.append('image', this.fileName2);
      this.service.postApi('merchant/image', formData, 2).subscribe((data: any) => {
        if (data.status == 200) {
          this.spinner.hide()
          this.businessImage = data.body.file_name;
        }
      }, error => {

        this.tostr.error("Something went wrong.")

      })
    }
  }





  handleFileInputFrontOwnerSelfi(event) {
    var self = this;
    let formData = new FormData();
    //formData.append('file', this.image);
    if (event.target.files && event.target.files[0]) {
      var type = event.target.files[0].type;
      var size = event.target.files[0].size;
      let count = 0;
      if (size < 2000000) {
        this.spinner.show()
        if (type === 'image/png' || type === 'image/jpg' || type === 'image/jpeg') {
          //self.authObj.docFile1 = event.target.files[0].name;
          this.fileName3 = event.target.files[0];
          formData.append('image', this.fileName3);
          count++;
        } else if (type === 'image/png') {
          this.fileName3 = event.target.files[0];
          formData.append('image', this.fileName3);
          count++;
        } else if (type === 'image/jpeg') {
          this.fileName3 = event.target.files[0];
          // formData.append('image',  this.fileName3);

          count++;
        } else if (type === 'image/jpg') {
          this.fileName3 = event.target.files[0];

          count++;
        } else {
          this.tostr.error("This type is not acceptable!");
          return;
        }
        this.submitFormKyc.patchValue({
          ownerSelfie: this.fileName3.name,
        })
        // this.submitFormKyc.patchValue({'businessOwner': this.fileName3.name})
      }
      else {
        this.tostr.error("Size should be less than 2 MB.");
      }
      formData.append('image', this.fileName3);
      this.service.postApi('merchant/image', formData, 2).subscribe((data: any) => {
        if (data.status == 200) {
          this.spinner.hide()
          this.ownerSelfi = data.body.file_name;
        }
      }, error => {

        this.tostr.error("Something went wrong.")

      })
    }
  }





  handleFileInputFrontIDImage(event) {
    var self = this;
    let formData = new FormData();
    //formData.append('file', this.image);
    if (event.target.files && event.target.files[0]) {
      var type = event.target.files[0].type;
      var size = event.target.files[0].size;
      let count = 0;
      if (size < 2000000) {
        this.spinner.show()
        if (type === 'image/png' || type === 'image/jpg' || type === 'image/jpeg') {
          //self.authObj.docFile1 = event.target.files[0].name;
          this.fileName4 = event.target.files[0];
          formData.append('image', this.fileName4);
          count++;
        } else if (type === 'image/png') {
          this.fileName4 = event.target.files[0];
          formData.append('image', this.fileName4);
          count++;
        } else if (type === 'image/jpeg') {
          this.fileName4 = event.target.files[0];
          formData.append('image', this.fileName4);

          count++;
        } else if (type === 'image/jpg') {
          this.fileName4 = event.target.files[0];

          count++;
        } else {
          this.tostr.error("This type is not acceptable!");
          return;
        }
        this.submitFormKyc.patchValue({
          passportImageNationalimage: this.fileName4.name
        })
        // this.submitFormKyc.patchValue({'nationalImage': this.fileName4.name})
      }
      else {
        this.tostr.error("Size should be less than 2 MB.");
      }
      formData.append('image', this.fileName4);
      this.service.postApi('merchant/image', formData, 2).subscribe((data: any) => {
        if (data.status == 200) {
          this.spinner.hide()
          this.nationalIdimage = data.body.file_name;
        }
      }, error => {

        this.tostr.error("Something went wrong.")

      })
    }
  }



  // *****************passport image code*****************//

  handleFileInputFrontpassportImage(event) {
    var self = this;
    let formData = new FormData();
    //formData.append('file', this.image);
    if (event.target.files && event.target.files[0]) {
      var type = event.target.files[0].type;
      var size = event.target.files[0].size;
      let count = 0;
      if (size < 2000000) {
        this.spinner.show()
        if (type === 'image/png' || type === 'image/jpg' || type === 'image/jpeg') {
          //self.authObj.docFile1 = event.target.files[0].name;
          this.fileName5 = event.target.files[0];
          formData.append('image', this.fileName5);
          count++;
        } else if (type === 'image/png') {

          this.fileName5 = event.target.files[0];
          formData.append('image', this.fileName5);
          count++;
        } else if (type === 'image/jpeg') {
          this.fileName5 = event.target.files[0];
          formData.append('image', this.fileName5);

          count++;
        } else if (type === 'image/jpg') {
          this.fileName5 = event.target.files[0];


          count++;
        } else {
          this.tostr.error("This type is not acceptable!");
          return;
        }
        this.submitFormKyc.patchValue({
          passportImageNationalimage: this.fileName5.name,
        })
        // this.submitFormKyc.patchValue({'passport': this.fileName5.name})
      }
      else {
        this.tostr.error("Size should be less than 2 MB.");
      }
      formData.append('image', this.fileName5);

      this.service.postApi('merchant/image', formData, 2).subscribe((data: any) => {
        if (data.status == 200) {
          this.spinner.hide()
          this.passportImages = data.body.file_name;
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
  }



  submitKyc() {
    // this.spinner.show()

    // if (this.submitFormKyc.value.nationalId != '' || this.submitFormKyc.value.passportNumber) {
      if(this.thaidata == 93){
      this.object = {
        "merchant": this.merchantId,
        "business_name": this.submitFormKyc.value.businessName,
        "registration_number": this.submitFormKyc.value.registrationNumber,
        "contact_phone": this.submitFormKyc.value.number,
        "certificate": this.registrsImage,
        "business_image": this.businessImage,



        "business_address":
        {
          "street": this.submitFormKyc.value.street,
          "city": this.submitFormKyc.value.city,
          "country": this.submitFormKyc.value.country,
          "province": this.submitFormKyc.value.province,
          "zip_code": this.submitFormKyc.value.zipeCode,
          "contact_email": this.submitFormKyc.value.contactEmail,
          "contact_phone": this.myCode + this.submitFormKyc.value.number,
        },


        // business_owner_details//
        "business_owner_details":
        {
          "owner_name": this.submitFormKyc.value.businessOwnerName,
          "phone_number": this.myCode + this.submitFormKyc.value.businessOwnerPhoneNumber,
          "nationality": this.submitFormKyc.value.businessOwnerNationality,
          "national_id": this.submitFormKyc.value.nationalId,
          
          "passport_number": "",
          "selfi": this.ownerSelfi,
          "national_id_image": this.nationalIdimage,
          "passport_image": "",
        }
      }
    }else {

      this.object = {
        "merchant": this.merchantId,
        "business_name": this.submitFormKyc.value.businessName,
        "registration_number": this.submitFormKyc.value.registrationNumber,
        "contact_phone": this.submitFormKyc.value.number,
        "certificate": this.registrsImage,
        "business_image": this.businessImage,



        "business_address":
        {
          "street": this.submitFormKyc.value.street,
          "city": this.submitFormKyc.value.city,
          "country": this.submitFormKyc.value.country,
          "province": this.submitFormKyc.value.province,
          "zip_code": this.submitFormKyc.value.zipeCode,
          "contact_email": this.submitFormKyc.value.contactEmail,
          "contact_phone": this.myCode + this.submitFormKyc.value.number,
        },


        // business_owner_details//
        "business_owner_details":
        {
          "owner_name": this.submitFormKyc.value.businessOwnerName,
          "phone_number": this.myCode + this.submitFormKyc.value.businessOwnerPhoneNumber,
          "nationality": this.submitFormKyc.value.businessOwnerNationality,
          "national_id": "",
          
          "passport_number": this.submitFormKyc.value.nationalId,
          "selfi": this.ownerSelfi,
          "national_id_image": "",
          "passport_image": this.passportImages,
        }
      }


    }

      console.log('SubmitKycObject',this.object)
      console.log('SubmitKycObject==>',this.submitFormKyc.valid) 
      this.service.postApi('merchant/business-kyc', this.object, 1).subscribe((data: any) => {
        console.log('resKyc',data)
        if (data.status == 200) {

          this.spinner.hide()

          this.tostr.success('Your business KYC successfully completed.')
          this.router.navigate(['manage-merchant'])
        }
      }, err => {
        console.log('erros', err)
        if (err.status == 403 || err.status == 401) {
          this.spinner.hide()

          this.service.logout();
        }
        else if (err.status == 400) {
          this.spinner.hide()

          this.tostr.error(err.error.message)
        }
        else if (err.status == 500) {
          this.spinner.hide()

          this.service.toastErr(err.statusText)
        }
      })
    }
    

  

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  // ***************this code patchvalue re-submit kyc********************//


  // +++++++++++++++++This code for get country state++++++++++++++++++++//



  onSelects(event) {
    this.thaidata=Number(this.submitFormKyc.value.businessOwnerNationality)


    console.log('businessOwnerNationality', this.thaidata)
    console.log('nationality', this.thaidata)
    if (this.thaidata == 93) {

      this.submitFormKyc.patchValue({
        nationalId:'',
        passportImageNationalimage:''
      })
   this.submitFormKyc.get('nationalId').setValidators([Validators.required, Validators.maxLength(13), Validators.pattern(/^[0-9A-Za-z]{1}[0-9A-Za-z]{4}[0-9A-Za-z]{5}[0-9A-Za-z]{2}[0-9A-Za-z]{1}$/)])

    } else if(this.thaidata != 93){
      this.submitFormKyc.patchValue({
        nationalId:'',
        passportImageNationalimage:''
      })
      this.submitFormKyc.get('nationalId').setValidators([Validators.required, Validators.maxLength(20), Validators.pattern(/^[A-Z0-9.,/ $@()]+$/)])
 
   
    }

  }



  // ----------------Router Link---------------------------------//
  generate(value) {
    this.merchantValue = value
    if (this.merchantValue == 'merchant') {
      $('#googleauth').modal({ backdrop: 'static', keyboard: false })

    }

  }

  // google auth
  onOtpChange(value) {
    this.varificationCode = value
  }

  onConfigChange() {
    this.showOtpComponent = false;
    this.varificationCode = null;
    setTimeout(() => {
      this.showOtpComponent = true;
    }, 0);
  }
  // modal() {
  //   $('#comanModal').modal('hide')
  //   $('#googleauth').modal({ backdrop: 'static', keyboard: false })
  // }

  verify() {
    let data = {
      "code": this.varificationCode
    }
    this.service.postApi('api/google-auth-step-verification', data, 1).subscribe((res) => {
      if (res.status == 200) {
        this.onConfigChange()
        this.submitKyc()
        $('#googleauth').modal('hide')


      }

    }, err => {
      if (err.status == 403 || err.status == 401) {
        this.onConfigChange()
        this.service.logout();
      }
      else if (err.status == 400) {
        this.onConfigChange()
        // this.service.toastErr(err.error.message) 
        this.errorMessage=err.error.message
      }
    })
  }
  reset(){
    this.errorMessage='';
    this.onConfigChange();

  }

}

