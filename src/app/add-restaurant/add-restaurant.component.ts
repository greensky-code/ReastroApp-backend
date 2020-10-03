import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from '../services/excel.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { RestaurantService } from '../restaurant.service';

declare var $: any;
@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit {
  cousins_list: any = [];
  limit: any = 10;
  page = 1;
  tabView: any = 'companyDetails';
  addcompanyForm: FormGroup;
  showOtpComponent = true;
  varificationCode: any;
  cusin_id: any;
  errorMessage: any;
  exports: any;
  todayDate: any = new Date();
  toMaxDate: any = new Date();
  newDate: any;
  formDate: any;
  disables: boolean = false;
  countries = [];
  countryData = [];
  cityList;
  provinceList;

  registrationCertificate: File;
  companyImage: File;
  fcciCertificate: File;
  verification_id_image: File;
  ownerImage: File;

  constructor(public service: ApiServiceService, private tostr: ToastrService, private router: Router, private restaurantService: RestaurantService,
    private excelService: ExcelService, private spinner: NgxSpinnerService, private formBuilder: FormBuilder, private notify: NotificationsService
  ) { }

  ngOnInit() {
    this.addcompanyForm = this.formBuilder.group({
      name: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
          Validators.pattern(/^[a-z]+(?:['_.\s][a-z]+)*$/i),
        ]),
      ],
      registration_certificate: ["", Validators.required],
      registrationNo: ["", Validators.required],
      company_image: [""],
      fcci_certificate: [""],
      address: this.formBuilder.group({
        street: [""],
        city: [""],
        country: [""],
        province: [""],
        zipcode: [""],
      }),
      mobile: [""],
      countrycode: ["+91"],
      email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.maxLength(255),
          Validators.pattern(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/
          ),
        ]),
      ],
      owner: this.formBuilder.group({
        name: [""],
        image: [""],
        countrycode: ["+91"],
        mobile: [""],
        verification_id: ['passport'],
        verification_id_image: [""],
        verification_id_no: [""]
      })


    });
    if (this.restaurantService.companyFormData) {
      if (this.restaurantService.companyFormData.address.country != "") {
        let provinceData = this.restaurantService.countryMasterData.filter((county) => county.name === this.restaurantService.companyFormData.address.country);
        this.provinceList = [...new Set(provinceData.map(item => item.province))];
      }
      if (this.restaurantService.companyFormData.address.city != "") {
        this.cityList = this.restaurantService.countryMasterData.filter((county) => county.province === this.restaurantService.companyFormData.address.province);
      }
      this.addcompanyForm.patchValue(this.restaurantService.companyFormData);
    }
    this.getCountries();
  }

  resetCompany() {
    this.restaurantService.restaurantdata.delete('company');
    this.restaurantService.restaurantdata.delete('registration_certificate');
    this.restaurantService.restaurantdata.delete('fcci_certificate');
    this.restaurantService.restaurantdata.delete('company_image');
    this.restaurantService.restaurantdata.delete('verification_id_image');
    this.restaurantService.restaurantdata.delete('owner_image');
  }

  getCountries() {
    this.service.getApi(`api/country`, 1).subscribe(
      (res) => {
        if (res.status == 200) {
          this.spinner.hide();
          this.countryData = res.body;
          this.countries = [...new Set(res.body.map(item => item.name))]
        }
      },
      (err) => {
        console.log("erroStaff", err);
        if (err.status == 403 || err.status == 401) {
          this.spinner.hide();
          this.service.logout();
        } else if (err.status == 500) {
          this.spinner.hide();
          this.service.toastErr(err.statusText);
        }
      }
    );
  }

  selectCountry(event) {
    let provinceData = this.countryData.filter((county) => county.name === event.target.value);
    this.provinceList = [...new Set(provinceData.map(item => item.province))];
    this.cityList = []
  }

  selectProvince(event) {
    this.cityList = this.countryData.filter((county) => county.province === event.target.value);
  }

  addCompany() {
    this.restaurantService.companyFormData = this.addcompanyForm.value;
    this.resetCompany();
    this.restaurantService.restaurantdata.append('company', JSON.stringify(this.addcompanyForm.value));
    this.restaurantService.restaurantdata.append('registration_certificate', this.registrationCertificate);
    this.restaurantService.restaurantdata.append('fcci_certificate', this.fcciCertificate);
    this.restaurantService.restaurantdata.append('company_image', this.companyImage);
    this.restaurantService.restaurantdata.append('verification_id_image', this.verification_id_image);
    this.restaurantService.restaurantdata.append('owner_image', this.ownerImage);
    this.router.navigate(['add-restaurant-details']);

  }

  fileUpload(event, uploadType) {
    debugger;
    switch (uploadType) {
      case 'registrationCertificate':
        this.registrationCertificate = <File>event.target.files[0];
        this.addcompanyForm.get('registration_certificate').setValue(this.registrationCertificate.name);
        break;
      case 'companyImage':
        this.companyImage = <File>event.target.files[0];
        this.addcompanyForm.get('company_image').setValue(this.companyImage.name);
        break;
      case 'fcciCertificate':
        this.fcciCertificate = <File>event.target.files[0];
        this.addcompanyForm.get('fcci_certificate').setValue(this.fcciCertificate.name);
        break;
      case 'verification_id_image':
        this.verification_id_image = <File>event.target.files[0];
        this.addcompanyForm.get('owner').get('verification_id_image').setValue(this.verification_id_image.name);
        break;
      case 'ownerImage':
        this.ownerImage = <File>event.target.files[0];
        this.addcompanyForm.get('owner').get('image').setValue(this.ownerImage.name);
        break;


    }
  }

  // view tab (patient or plasma-donated-patient)
  viewTab(tab) {
    this.addCompany();
    this.tabView = tab;
    if (tab === 'restaurentDetails') {
    }
    else if (tab === 'itemDetails') {
      this.router.navigate(['/add-restaurent-item-details'])
    }
    else if (tab === 'bankDetails') {
      this.router.navigate(['/add-restaurant-bank-details'])
    }
  }

  // -------------------- date validation ---------------------------------- //
  getDate(event) {
    if (event) {
      this.formDate = event;
      this.disables = true
    }
    else {
      this.newDate = ''
    }
  }
  fromMaxDate(event) {
    if (event) {
      this.todayDate = new Date(event)
      this.disables = true
    }
    else {
      this.todayDate = new Date()
    }
  }

  searchcuisineName(searchcuisineName) {
    console.log('cuisine name', searchcuisineName);
  }

  unblock(event, id) {
    console.log('event', event);

  }


  selectStatus(event) {
    console.log('event', event);

  }

  pagination(page) {
    this.page = page
  }
  exportAsXLSX(): void {
    this.service.getApi(`api/cuisines?pagination=false`, 1).subscribe(res => {
      if (res.status == 200) {
        this.exports = res.body
        console.log('exports', this.exports)
        let dataArr = [];

        this.exports.forEach((element => {
          let d = new Date(element.created_at);
          let creation = `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
          new Date(element.updated_at);
          let creations = `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
          dataArr.push({
            "ID	": element.id ? element.id : '--',
            "Cusine Name": element.name ? element.name : '--',
            "Status": element.is_active == true ? 'Active' : 'Inactive',
            "Created At": element.created_at ? creation : '--',
            "Updated At": element.created_at ? creations : '--',
            "Created By": element.created_by ? element.created_by.first_name : '--'



          })
        }))
        this.excelService.exportAsExcelFile(dataArr, 'Cusine List');

      }
    })



  }

  // -------------------------Driver Delete Api-----------------------//
  openModal(id) {
    this.cusin_id = id
    console.log('cusin_id', this.cusin_id)
    // $('#comanModal').modal('hide')

    $('#comanModal').modal({ backdrop: 'static', keyboard: false })
  }
  // ----------------------Close modal -----------------------------//
  modal() {
    $('#comanModal').modal('hide')
    $('#googleauth').modal({ backdrop: 'static', keyboard: false })

  }

  // -----------------------Google Authentication -------------------//
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

  verify() {
    // this.deleteCuisin()
    let data = {

      "code": this.varificationCode

    }

    this.service.postApi('api/google-auth-step-verification', data, 1).subscribe((res) => {

      if (res.status == 200) {

        this.onConfigChange()
        this.deleteCuisin()

        $('#googleauth').modal('hide')

      }

    }, err => {

      if (err.status == 403 || err.status == 401) {

        this.onConfigChange()

        this.service.logout();

      }
      else if (err.status == 400) {

        this.onConfigChange()

        this.errorMessage = err.error.message


      }

    })

  }
  reset() {
    this.errorMessage = '';
    this.onConfigChange()
  }
  // ---------------------Delete Driver------------------------//

  deleteCuisin() {

    this.service.delete('api/cuisines/', this.cusin_id, 1).subscribe(res => {
      if (res.status == 204) {
        // this.deletedata=res
        this.service.showSuccess("Cuisine deleted successfully")

      }
    }, err => {
      if (err.status == 403 || err.status == 401) {
        this.service.logout();
      }
      else if (err.status == 400) {
        this.service.toastErr(err.error.message)
        // this.tostr.error(err.error.message)
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

}
