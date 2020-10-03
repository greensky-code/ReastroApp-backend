import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from '../services/excel.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { RestaurantService } from '../restaurant.service';
declare var $: any;
@Component({
  selector: 'app-add-restaurent-item-details',
  templateUrl: './add-restaurent-item-details.component.html',
  styleUrls: ['./add-restaurent-item-details.component.css']
})
export class AddRestaurentItemDetailsComponent implements OnInit {
  cousins_list: any = [];
  limit: any = 10;
  page = 1;
  tabView: any = 'itemDetails';
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
  optionName: boolean = false;
  addItemDetailsForm: FormGroup;
  item_image: File;
  menuList;

  constructor(public service: ApiServiceService, private tostr: ToastrService, private router: Router,
    private excelService: ExcelService, private spinner: NgxSpinnerService, private restaurantService: RestaurantService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = new FormGroup({
      'category': new FormControl('')
    })
    this.addItemDetailsForm = this.formBuilder.group({
      menu_category: [""],
      item_image: [""],
      item_name: [""],
      item_type: ["food"],
      food_type: ["veg"],
      options: [""],
      option_name: [""],
      price: [""],
      quantity: [""],
      special_price: [""],
      suggested_items: [""]
    });
    if (this.restaurantService.menuItemFormData) {
      if (this.restaurantService.menuItemFormData.options) {
        this.optionName = true
      }
      if (this.restaurantService.menuItemFormData.menu_category != "") {
        this.menuList = this.restaurantService.menuMasterData;
      }
      this.addItemDetailsForm.patchValue(this.restaurantService.menuItemFormData);
    }
    this.getcuisine();
    if (!this.restaurantService.menuMasterData)
      this.getMenu();
  }

  getMenu() {
    this.service.getApi(`api/menu`, 1).subscribe(
      (res) => {
        if (res.status == 200) {
          this.spinner.hide();
          this.restaurantService.menuMasterData = res.body;
          this.menuList = res.body;
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

  fileUpload(event) {
    this.item_image = <File>event.target.files[0];
    this.addItemDetailsForm.get('item_image').setValue(this.item_image.name);
  }

  resetItem() {
    this.restaurantService.restaurantdata.delete('item_image');
    this.restaurantService.restaurantdata.delete('menu_item');
  }

  addItemDetail(route?) {
    this.restaurantService.menuItemFormData = this.addItemDetailsForm.value;
    this.resetItem();
    this.restaurantService.restaurantdata.append('menu_item', JSON.stringify(this.addItemDetailsForm.value));
    this.restaurantService.restaurantdata.append('item_image', this.item_image);
    if (route) {
      this.router.navigate([route]);
    }
  }

  getcuisine() {
    this.spinner.show()
    this.service.getApi('api/cuisines', 1).subscribe((res) => {
      if (res.status == 200) {
        this.spinner.hide()
        this.cousins_list = res.body.results
        console.log('cuisines==>>', this.cousins_list)
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
    this.addItemDetail();
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
    this.getcuisine()
  }

  optionEvent(event) {
    this.optionName = event.target.checked;
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
        this.getcuisine()

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
        this.getcuisine()
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
