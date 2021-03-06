import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from '../services/excel.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationsService } from 'angular2-notifications';
declare var $: any;

@Component({
  selector: 'app-restaurant-management',
  templateUrl: './restaurant-management.component.html',
  styleUrls: ['./restaurant-management.component.css']
})
export class RestaurantManagementComponent implements OnInit {
  cousins_list: any = [];
  limit: any = 10;
  page = 1;

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
  manageRestaurant;
  total;
  delete_id;


  constructor(private service: ApiServiceService, private notify: NotificationsService, private tostr: ToastrService, private excelService: ExcelService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getRestaurant(1);
  }

  getRestaurant(page) {
    this.page = page;
    this.spinner.show();
    this.service.getApi(`api/restaurant?page=${this.page}`, 1).subscribe(
      (res) => {
        if (res.status == 200) {
          this.spinner.hide();
          this.manageRestaurant = res.body.data;
          this.total = res.body.count;
          this.limit = 10;
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
  // =========modal========//
  delete(id) {
    this.delete_id = id;
    $('#delete').modal('show');
  }

  deletemodal() {
    $('#delete').modal('hide');
    this.service.delete("api/restaurant/", this.delete_id, 1).subscribe(
      (res) => {
        if (res.status == 200) {
          this.tostr.success("Restaurant deleted successfully.");
          this.notify.success('', "Restaurant deleted successfully.", {
            timeOut: 5000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            maxLength: 50
          })
          this.getRestaurant(1);
        }
      },
      (err) => {
        if (err.status == 403 || err.status == 401) {
          this.service.logout();
        } else if (err.status == 400) {
          this.tostr.error(err.error.message);
        }
      }
    );
  }

  terminate() {
    $('#terminate').modal('show')
  }
  terminatemodal() {
    $('#terminate').modal('hide')
  }
  publish() {
    $('#publish').modal('show')
  }
  publishmodal() {
    $('#publish').modal('hide')
  }


}
