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
  selector: 'app-add-restaurant-bank-details',
  templateUrl: './add-restaurant-bank-details.component.html',
  styleUrls: ['./add-restaurant-bank-details.component.css']
})
export class AddRestaurantBankDetailsComponent implements OnInit {
  cousins_list: any = [];
  limit: any = 10;
  page = 1;
  tabView: any = 'bankDetails';
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

  addBankForm: FormGroup;
  document_image: File;
  bankList;
  constructor(public service: ApiServiceService, private tostr: ToastrService, private router: Router,
    private excelService: ExcelService, private restaurantService: RestaurantService, private spinner: NgxSpinnerService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.addBankForm = this.formBuilder.group({
      name: [""],
      account_number: [""],
      ifsc_code: [""],
      account_holder_name: [""],
      document: [""],
      document_image: [""]

    })
    if (this.restaurantService.bankFormData) {
      this.addBankForm.patchValue(this.restaurantService.bankFormData);
    }
    if (!this.restaurantService.bankMasterData)
      this.getBank();
  }

  getBank() {
    this.service.getApi(`api/bank`, 1).subscribe(
      (res) => {
        if (res.status == 200) {
          this.spinner.hide();
          this.restaurantService.bankMasterData = res.body;
          this.bankList = res.body;
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
    this.document_image = <File>event.target.files[0];
    this.addBankForm.get('document_image').setValue(this.document_image.name);
  }

  resetBank() {
    this.restaurantService.restaurantdata.delete('bank');
    this.restaurantService.restaurantdata.delete('document_image');
  }

  addBank(route?) {
    this.restaurantService.bankFormData = this.addBankForm.value;
    this.resetBank();
    this.restaurantService.restaurantdata.append('bank', JSON.stringify(this.addBankForm.value));
    this.restaurantService.restaurantdata.append('document_image', this.document_image);
    if (route) {
      this.router.navigate([route]);
    }
    this.postRestaurant();
    console.log(this.addBankForm.value)
  }

  postRestaurant() {
    if (this.restaurantService.validateData()) {

      this.service.postApi("api/restaurant", this.restaurantService.restaurantdata, 3).subscribe(
        (res) => {
          if (res.message_code == 200) {
            this.spinner.hide();
            this.tostr.success(res.body.message);
            // this.notify.success('', "Staff added successfully.", {
            //   timeOut: 5000,
            //   showProgressBar: true,
            //   pauseOnHover: true,
            //   clickToClose: true,
            //   maxLength: 50
            // })
            this.router.navigate(['restaurant-management']);
          }
        },
        (err) => {
          this.spinner.hide();
          // this.notify.error('', 'Internal Server Error', {
          //   timeOut: 5000,
          //   showProgressBar: true,
          //   pauseOnHover: true,
          //   clickToClose: true,
          //   maxLength: 50
          // })
          if (err.status == 403 || err.status == 401) {
            this.spinner.hide();
            this.service.logout();
          } else if (err.status == 400) {
            this.spinner.hide();
            this.tostr.error(err.error.message);
          } else if (err.status == 500) {
            this.service.toastErr("Internal server error.");
          }
        }
      );
    }

  }

  // view tab (patient or plasma-donated-patient)
  viewTab(tab) {
    this.tabView = tab;
    this.addBank();
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
