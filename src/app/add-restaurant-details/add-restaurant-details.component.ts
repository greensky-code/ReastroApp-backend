import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from '../services/excel.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { RestaurantService } from '../restaurant.service';
declare var $: any;
@Component({
  selector: 'app-add-restaurant-details',
  templateUrl: './add-restaurant-details.component.html',
  styleUrls: ['./add-restaurant-details.component.css']
})
export class AddRestaurantDetailsComponent implements OnInit {
  cuisineList: any = [];
  limit: any = 10;
  page = 1;
  tabView: any = 'restaurentDetails';
  form: FormGroup;

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
  addRestaurantForm: FormGroup;

  menu_image: File;
  restaurant_image: File;

  countries = [];
  countryData = [];
  cityList;
  provinceList;



  constructor(public service: ApiServiceService, private tostr: ToastrService, private router: Router,
    private excelService: ExcelService, private restaurantService: RestaurantService, private spinner: NgxSpinnerService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    debugger;
    this.addRestaurantForm = this.formBuilder.group({
      name: [""],
      restaurant_image: [""],
      cuisine: [""],
      category: new FormControl(''),
      cost_per_person: [""],
      deliver_time: [""],
      aboutUs: [""],
      menu_image: [""],
      mobile: [""],
      countrycode: ["+91"],
      address: this.formBuilder.group({
        street: [""],
        city: [""],
        country: [""],
        province: [""],
        zipcode: [""],
        zone: [""],
      }),
      operation_hours: this.formBuilder.group({
        mon: this.formBuilder.group({
          from: [""],
          to: [""],
        }),
        tue: this.formBuilder.group({
          from: [""],
          to: [""],
        }),
        wed: this.formBuilder.group({
          from: [""],
          to: [""],
        }),
        thu: this.formBuilder.group({
          from: [""],
          to: [""],
        }),
        fri: this.formBuilder.group({
          from: [""],
          to: [""],
        }),
        sat: this.formBuilder.group({
          from: [""],
          to: [""],
        }),
        sun: this.formBuilder.group({
          from: [""],
          to: [""],
        }),
      }),
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
    })
    if (this.restaurantService.restaurantFormData) {
      if (this.restaurantService.restaurantFormData.address.country != "") {
        let provinceData = this.restaurantService.countryMasterData.filter((county) => county.name === this.restaurantService.restaurantFormData.address.country);
        this.provinceList = [...new Set(provinceData.map(item => item.province))];
      }
      if (this.restaurantService.restaurantFormData.address.city != "") {
        this.cityList = this.restaurantService.countryMasterData.filter((county) => county.province === this.restaurantService.restaurantFormData.address.province);
      }
      this.addRestaurantForm.patchValue(this.restaurantService.restaurantFormData);
    }
    this.getcuisines();
    this.getCountries();
  }

  getCountries() {
    this.service.getApi(`api/country`, 1).subscribe(
      (res) => {
        if (res.status == 200) {
          this.spinner.hide();
          this.restaurantService.countryMasterData = res.body;
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
    let provinceData = this.restaurantService.countryMasterData.filter((county) => county.name === event.target.value);
    this.provinceList = [...new Set(provinceData.map(item => item.province))];
    this.cityList = []
  }

  selectProvince(event) {
    this.cityList = this.restaurantService.countryMasterData.filter((county) => county.province === event.target.value);
  }

  fileUpload(event, uploadType) {
    switch (uploadType) {
      case 'restaurant_image':
        this.restaurant_image = <File>event.target.files[0];
        this.addRestaurantForm.get('restaurant_image').setValue(this.restaurant_image.name);
        break;
      case 'menu_image':
        this.menu_image = <File>event.target.files[0];
        this.addRestaurantForm.get('menu_image').setValue(this.menu_image.name);
        break
    }

  }

  resetRestaurant() {
    this.restaurantService.restaurantdata.delete('restaurant');
    this.restaurantService.restaurantdata.delete('restaurant_image');
    this.restaurantService.restaurantdata.delete('menu_image');
  }

  addRestauarant(route?) {
    this.restaurantService.restaurantFormData = this.addRestaurantForm.value;
    this.resetRestaurant();
    this.restaurantService.restaurantdata.append('restaurant', JSON.stringify(this.addRestaurantForm.value));
    this.restaurantService.restaurantdata.append('restaurant_image', this.restaurant_image);
    this.restaurantService.restaurantdata.append('menu_image', this.menu_image);
    if (route) {
      this.router.navigate([route]);
    }

  }

  getcuisines() {
    this.spinner.show()
    this.service.getApi('api/cuisines', 1).subscribe((res) => {
      if (res.status == 200) {
        this.spinner.hide()
        this.cuisineList = res.body.results;
        console.log('cuisines==>>', this.cuisineList)
      }

    }, err => {
      console.log('erroStaff', err)
      if (err.status == 403 || err.status == 401) {

        this.spinner.hide()
        this.service.logout();
      } else if (err.status == 500) {
        this.spinner.hide()
        this.service.toastErr(err.statusText)

      }

    })
  }

  // view tab (patient or plasma-donated-patient)
  viewTab(tab) {
    this.tabView = tab;
    this.addRestauarant();
    if (tab === 'restaurentDetails') {
      this.router.navigate(['/add-restaurant-details'])
    }
    else if (tab === 'companyDetails') {
      this.router.navigate(['/add-restaurant'])
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
    this.getcuisines()
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
        this.getcuisines()

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
        this.getcuisines()
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
