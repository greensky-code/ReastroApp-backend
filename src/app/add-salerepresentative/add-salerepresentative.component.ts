import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { collectExternalReferences } from '@angular/compiler';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $ :any
@Component({
  selector: 'app-add-salerepresentative',
  templateUrl: './add-salerepresentative.component.html',
  styleUrls: ['./add-salerepresentative.component.css']
})
export class AddSalerepresentativeComponent implements OnInit {
  isValidNumber: any;
  myCode: string;
  submitFormKyc: FormGroup;
  fileName1: any;
  image: any;
  image1: any;
  image2: any;
  image3: any;
  image4: any;
  image5: any;
  countriesList: any;
  data2: any;
  thaidata: any;
  agencyChecked: boolean = false;
   object:any={};
  bank_list: any;
  state_id: any;
  statelist: any;
  user: string;
  language: string;
  varificationCode: any;
  showOtpComponent=true;
  saleValue: any;
  errorMessage: any;
  nationalitys: any;
 
  constructor(private router:Router, private service: ApiServiceService, private fb:FormBuilder,private activatedRoute:ActivatedRoute, private tostr:ToastrService,private spinner:NgxSpinnerService) { 
    setInterval(() => {
      this.language=localStorage.getItem('language')
      },50);
     

  }
  ngOnInit() {
    
    this.formOne();
    this.getCountry();
    this.getNationalitys();
    this.phoneCheckCountry();
    this.banklist();
 
  }

 

  formOne(){
    this.submitFormKyc=this.fb.group({
      titel                                :['Mr.',Validators.required],
      FirstName                            :['', Validators.compose([Validators.required, Validators.maxLength(255), Validators.pattern(/^[a-z]+(?:['_.\s][a-z]+)*$/i)])],
      MiddleName                           :['', Validators.compose([Validators.required, Validators.maxLength(255), Validators.pattern(/^[a-z]+(?:['_.\s][a-z]+)*$/i)])],
      lastName                             :['', Validators.compose([Validators.required, Validators.maxLength(255), Validators.pattern(/^[a-z]+(?:['_.\s][a-z]+)*$/i)])],
      gender                               :['',Validators.required],
      email                                :['',Validators.compose([Validators.maxLength(255),Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)])],
      number                               :['',Validators.compose([Validators.required])],
      street                               :['',Validators.compose([Validators.required,Validators.maxLength(255)])],
      city                                 :['',Validators.compose([Validators.required,Validators.maxLength(255),Validators.pattern("^[a-zA-Z ]+$")])],
      country                              :['',Validators.required],
      province                             :['',Validators.compose( [Validators.required])],
      zipCode                              :['',Validators.compose([Validators.required,Validators.pattern(/^[1-9][0-9]{4,5}$/)])],
      nationality                          :['',Validators.required],
      passPortNationalId                   :[''],
      NationalidPassportImage              :['',Validators.required],
      selfi                                :['',Validators.required],
      bankname                             :['',Validators.required],
      accountholdername                     :['',Validators.compose([Validators.required,Validators.maxLength(255)])],
      accountnumber                        :['',Validators.compose([Validators.required,Validators.maxLength(20),Validators.pattern(/^[1-9][0-9]{9,25}$/)])],
      vehicleImage                         :['',Validators.required],
      agencyChecked                        : [''],
      agencyname                           :['']
    })
  }
 
  addsale() {
    this.spinner.show()
    if (this.submitFormKyc.value.email != '') {
      if (this.submitFormKyc.value.nationality != 'Thai') {
        this.object = {
          "email": this.submitFormKyc.value.email,
           "title": this.submitFormKyc.value.titel,
          "first_name": this.submitFormKyc.value.FirstName,
          "last_name": this.submitFormKyc.value.lastName,
          "middle_name": this.submitFormKyc.value.MiddleName,
          "mobile": this.myCode + this.submitFormKyc.value.number,
          "gender": this.submitFormKyc.value.gender,
          "sales_address": {
            "street": this.submitFormKyc.value.street,
            "city": this.submitFormKyc.value.city,
            "country": this.submitFormKyc.value.country,
            "province": this.submitFormKyc.value.province,
            "zip_code": this.submitFormKyc.value.zipCode,
          },
          "sales_details": {
            "nationality": this.submitFormKyc.value.nationality,
            "passport_id": this.submitFormKyc.value.passPortNationalId,
            "passport_image": this.image,
            "agency": this.agencyChecked,
            "agency_name": this.submitFormKyc.value.agencyname,
            "selfie": this.image,
          },
          "sales_bank": {
            "bank_name": this.submitFormKyc.value.bankname,
            "account_holder_name": this.submitFormKyc.value.accountholdername,
            "account_number": this.submitFormKyc.value.accountnumber,
            "passbook": this.image
          }
        }
      }
      else if (this.submitFormKyc.value.nationality == 'Thai') {
        this.object = {
          "email": this.submitFormKyc.value.email,
          "title": this.submitFormKyc.value.titel,
          "first_name": this.submitFormKyc.value.FirstName,
          "last_name": this.submitFormKyc.value.lastName,
          "middle_name": this.submitFormKyc.value.MiddleName,
          "mobile": this.myCode + this.submitFormKyc.value.number,
          "gender": this.submitFormKyc.value.gender,
          "sales_address": {
            "street": this.submitFormKyc.value.street.replace(/\s\s+/g, ' '),
            "city": this.submitFormKyc.value.city.replace(/\s\s+/g, ' '),
            "country": this.submitFormKyc.value.country,
            "province": this.submitFormKyc.value.province,
            "zip_code": this.submitFormKyc.value.zipCode,
          },
          "sales_details": {
            "nationality": this.submitFormKyc.value.nationality,
            "national_id": this.submitFormKyc.value.passPortNationalId,
            "national_id_image": this.image,
            "agency": this.agencyChecked,
            "agency_name": this.submitFormKyc.value.agencyname.replace(/\s\s+/g, ' '),
            "selfie": this.image,
          },
          "sales_bank": {
            "bank_name": this.submitFormKyc.value.bankname,
            "account_holder_name": this.submitFormKyc.value.accountholdername.replace(/\s\s+/g, ' '),
            "account_number": this.submitFormKyc.value.accountnumber,
            "passbook": this.image
          }
        }
      }
      
      this.service.postApi('sales/admin/detail', this.object, 1).subscribe(res => {
        if (res.status == 201) {
          this.spinner.hide()
          this.tostr.success('Account created successfully.')
          this.router.navigate(['manage-sale'])
        }
        else if (res.status == 400) {
          this.spinner.hide()
          this.tostr.error(res.body.message)
        }
      }, err => {
        this.spinner.hide()
        this.tostr.error(err.error.message)
      })
    }
    if (this.submitFormKyc.value.email == '') {
      if (this.submitFormKyc.value.nationality == 'Thai') {
        this.object = {
           "title" : this.submitFormKyc.value.titel,
          "first_name": this.submitFormKyc.value.FirstName,
          "last_name": this.submitFormKyc.value.lastName,
          "middle_name": this.submitFormKyc.value.MiddleName,
          "mobile": this.myCode + this.submitFormKyc.value.number,
          "gender": this.submitFormKyc.value.gender,
          "sales_address": {
            "street": this.submitFormKyc.value.street,
            "city": this.submitFormKyc.value.city,
            "country": this.submitFormKyc.value.country,
            "province": this.submitFormKyc.value.province,
            "zip_code": this.submitFormKyc.value.zipCode,
          },
          "sales_details": {
            "nationality": this.submitFormKyc.value.nationality,
            "national_id": this.submitFormKyc.value.passPortNationalId,
            "national_id_image": this.image,
            "agency": this.agencyChecked,
            "agency_name": this.submitFormKyc.value.agencyname,
            "selfie": this.image,
          },
          "sales_bank": {
            "bank_name": this.submitFormKyc.value.bankname,
            "account_holder_name": this.submitFormKyc.value.accountholdername,
            "account_number": this.submitFormKyc.value.accountnumber,
            "passbook": this.image
          }
        }
      }
      else if (this.submitFormKyc.value.nationality != 'Thai') {
        this.object = {
           "title" : this.submitFormKyc.value.titel,
          "first_name": this.submitFormKyc.value.FirstName,
          "last_name": this.submitFormKyc.value.lastName,
          "middle_name": this.submitFormKyc.value.MiddleName,
          "mobile": this.myCode + this.submitFormKyc.value.number,
          "gender": this.submitFormKyc.value.gender,
          "sales_address": {
            "street": this.submitFormKyc.value.street,
            "city": this.submitFormKyc.value.city,
            "country": this.submitFormKyc.value.country,
            "province": this.submitFormKyc.value.province,
            "zip_code": this.submitFormKyc.value.zipCode,
          },
          "sales_details": {
            "nationality": this.submitFormKyc.value.nationality,
            "passport_id": this.submitFormKyc.value.passPortNationalId,
            "passport_image": this.image,
            "agency": this.agencyChecked,
            "agency_name": this.submitFormKyc.value.agencyname,
            "selfie": this.image,
          },
          "sales_bank": {
            "bank_name": this.submitFormKyc.value.bankname,
            "account_holder_name": this.submitFormKyc.value.accountholdername,
            "account_number": this.submitFormKyc.value.accountnumber,
            "passbook": this.image
          }
        }
      }
      this.service.postApi('sales/admin/detail', this.object, 1).subscribe(res => {
        if (res.status == 201) {
          this.spinner.hide()
          this.tostr.success('Account created successfully.')
          this.router.navigate(['manage-sale'])
        }
        else if (res.status == 400) {
          this.spinner.hide()
          this.tostr.error(res.body.message)
        }
      }, err => {
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
          this.tostr.error(err.message)  
        }
        this.spinner.hide()
      }

      )
    }
  }
  getCountry() {
    this.service.getApi('api/country-list', 1).subscribe((res) => {
      this.countriesList = res.body
    })
  }
  onSelect(event) {
    this.state_id;
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
  onSelects(event) {
    this.thaidata = this.submitFormKyc.value.nationality
    if ( this.submitFormKyc.value.nationality == "93") {
      this.submitFormKyc.get('passPortNationalId').setValidators([Validators.required,Validators.maxLength(13),Validators.pattern(/^[0-9A-Za-z]{1}[0-9A-Za-z]{4}[0-9A-Za-z]{5}[0-9A-Za-z]{2}[0-9A-Za-z]{1}$/)])    
    }else{
      
      this.submitFormKyc.get('passPortNationalId').setValidators([Validators.required,Validators.maxLength(20), Validators.pattern(/^[A-Z0-9.,/ $@()]+$/)])         
    }
    this.submitFormKyc.patchValue({
      passPortNationalId:'',
      NationalidPassportImage:''
    })
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
    // this.spinner.show()
    var self = this;
    let formData = new FormData();
    if (event.target.files && event.target.files[0]) {
    var type = event.target.files[0].type;
    var size = event.target.files[0].size;
    let count = 0;
    
    if (size < 2000000) {
    if (type === 'image/png' || type === 'image/jpg' || type === 'image/jpeg' ) {
    //self.authObj.docFile1 = event.target.files[0].name;
    this.fileName1 = event.target.files[0];
   
    count++;
    } else if (type === 'image/png') {
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
      if(image === "nationalId"){
            this.spinner.show()
        this.image1=this.fileName1.name
        this.submitFormKyc.patchValue({
          NationalidPassportImage   : this.image1,
        })
      }
      
      if(image === "vehicleimage"){
        this.spinner.show()

        this.image2=this.fileName1.name
        this.submitFormKyc.patchValue({
           vehicleImage   : this.image2,
        })
      }
      if(image === "selfiimage"){
        this.spinner.show()

        this.image5=this.fileName1.name
        this.submitFormKyc.patchValue({
          selfi       : this.image5,
        })
      }
      let data={
        'image1'  : this.image1,
        'image2'  : this.image2,
        'image3'  : this.image3,
        'image4'  : this.image4,
        'image5'  : this.image5,
      }    
    }
     else {
    this.tostr.error("Size should be less than 2 MB.");
    }
    formData.append('image', this.fileName1);
    this.service.postApi('merchant/image',formData,2).subscribe((data:any)=>{
      if(data.status == 200 ){
        this.spinner.hide()
        this.image=data.body.file_name;


      }
     
    },error=>{
    
      this.tostr.error("Something went wrong.")
      
    })
    }
    }
    phoneCheckCountry() {
      $("#phoneNumber2").intlTelInput({
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
   
  
  agencyCheckBox(){
    this.agencyChecked = this.submitFormKyc.value.agencyChecked
    if(this.submitFormKyc.value.agencyChecked == true){
      this.submitFormKyc.get('agencyname').setValidators([Validators.compose([Validators.required,Validators.maxLength(250),Validators.pattern(/^[a-z0-9]+$/i)])])    
    }else{
      this.submitFormKyc.get('agencyname').clearValidators();
    }
  }
  // -----------------bank list--------------//
  banklist(){
this.service.getApi('api/bank-list',1).subscribe((res)=>{
  this.bank_list = res.body;
 
})
  }
// ------------------------restrict special character---------------//
omit_special_char(event)
{   
   var k;  
   k = event.charCode;  //         k = event.keyCode;  (Both can be used)
   return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
}
   // --------------------------------allow only numbe input-----------------------//
   isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
} 
toCheckSpaceChar() {
  this.isValidNumber = $('#phoneNumber2').intlTelInput('isValidNumber');
  const countryData = $('#phoneNumber2').intlTelInput('getSelectedCountryData');
  this.myCode = "+" + countryData.dialCode;
}
// ------------------------retrict number input------------------------------------//
nonumber(event){
  var keyCode = event.charCode;
  if (!(keyCode < 48 || keyCode > 57) ) { 
    return false;
  }
  return(( keyCode> 64 && keyCode< 91) || (keyCode > 96 && keyCode < 123) || keyCode == 8 || keyCode == 32 || (keyCode >= 48 && keyCode <= 57));
}

      // ----------------Router Link---------------------------------//
      generate(value){
        this.saleValue=value
        if(this.saleValue=='sale'){
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
            this.addsale()
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