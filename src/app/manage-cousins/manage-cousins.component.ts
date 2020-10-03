import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from '../services/excel.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationsService } from 'angular2-notifications';

declare var $: any;
@Component({
  selector: 'app-manage-cousins',
  templateUrl: './manage-cousins.component.html',
  styleUrls: ['./manage-cousins.component.css']
})
export class ManageCousinsComponent implements OnInit {
  unblockId: any;
  blockId: any;
  is_active: any;
  status: any;
  searchRole: string;
  disabled: boolean;
  searchRoleName: any;
  total: any;
  cousins_list: any = [];
  limit: any = 10;
  page = 1;
  two_food_delivery: boolean = false;

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
  selectState: any = ''
  selectdate: any = ''
  selectend: any = ''


  constructor(private notify: NotificationsService, private service: ApiServiceService, private tostr: ToastrService, private excelService: ExcelService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getcousins()
  }
  getcousins() {
    this.spinner.show()
    this.service.getApi(`api/cuisines?page=${this.page}`, 1).subscribe((res) => {
      if (res.status == 200) {
        this.spinner.hide()
        this.cousins_list = res.body.results
        this.total = res.body.count
        this.limit = 10
        console.log('cuisines==>>', this.cousins_list)
      } else {
        this.spinner.hide()
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

  // ######################### Search field value  ######################//
  searchcuisineName(value) {
    console.log(value)
    this.searchRoleName = value
    this.searchSubmit(value)
    this.disabled = false
  }

  // ##################### Search Role ##################################//

  searchSubmit(seracname) {
    // let seracname = this.searchRoleName
    this.service.getApi('api/cuisines?search=' + seracname, 1).subscribe(res => {
      if (res.status == 200) {
        this.cousins_list = res.body.results
        this.total = res.body.count;
      }

    })
  }
  // -------------------- date validation ---------------------------------- //
  getDate(event) {
    if (event) {
      this.formDate = new Date(event);
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
      this.todayDate = ''
    }
  }

  reset() {
    this.searchRole = '';
    this.selectState = '';
    this.selectdate = '';
    this.selectend = ''
    this.disables = true
    this.getcousins()
  }

  // unblock(event, id) {
  //   console.log('event', event);

  // }


  selectStatus(event) {
    console.log('event', event);
    if (event == "Active") {
      this.status = true
    }
    else {
      this.status = false
    }
    this.disables = true

  }

  pagination(page) {
    console.log(page)
    this.page = page
    if (this.searchRoleName) {
      this.searchWithPagination();
    } else if (this.status || this.formDate || this.todayDate) {
      console.log("here")
      this.filter()
    }
    else {
      this.getcousins()
    }

  }

  searchWithPagination() {
    this.service.getApi(`api/cuisines?search=${this.searchRoleName}&page=${this.page}`, 1).subscribe(res => {
      if (res.status == 200) {
        this.cousins_list = res.body.results
        // this.manageRole();
        this.total = res.body.count;
      }

    }, err => {
      if (err.status == 403 || err.status == 401) {
        this.service.logout();
      }
      else if (err.status == 400) {
        // this.tostr.error(err.error.response_message)
        this.notify.error('', err.error.message,
          {
            timeOut: 5000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
    })
  }
  filter() {
    this.spinner.show()
    let object = {
      "status": this.status,
      "start": this.formDate,
      "end": this.todayDate
    }
    console.log(object)
    this.service.postApi(`api/filtercuisines?page=${this.page}`, object, 1).subscribe((res) => {
      console.log(res)
      if (res.status == 200) {
        this.spinner.hide()
        this.cousins_list = res.body.results
        this.total = res.body.count
        this.limit = 10
      }
    }, err => {

      if (err.status == 403 || err.status == 401) {
        this.spinner.hide()
        this.notify.error('', err.error.message,
          {
            timeOut: 5000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            maxLength: 50
          }
        )
        this.service.logout();
      }
      else if (err.status == 400) {
        this.spinner.hide()
        // this.tostr.error(err.error.response_message)
        this.notify.error('', err.error.message,
          {
            timeOut: 5000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            maxLength: 50
          }
        )
      } else if (err.status == 500) {
        this.spinner.hide()
        // this.service.toastErr('Internal server error.')
        this.notify.error('', 'Internal server error.',
          {
            timeOut: 5000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
    })
  }
  exportAsXLSX(): void {
    this.service.getApi(`api/cuisines?pagination=false`, 1).subscribe(res => {
      if (res.status == 200) {
        this.exports = res.body.results
        console.log('exports', this.exports)
        let dataArr = [];

        this.exports.forEach((element => {
          let d = new Date(element.created_at);
          let creation = `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
          new Date(element.updated_at);
          let creations = `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
          dataArr.push({
            "ID	": element.cuisine_id ? element.cuisine_id : '--',
            "Cusine Name": element.cuisine_name ? element.cuisine_name : '--',
            "Status": element.is_active == true ? 'Active' : 'Inactive',
            "Created At": element.created_at ? creation : '--',
            "Updated At": element.created_at ? creations : '--',
            "Created By": element.created_by ? element.created_by[0].first_name : '--'



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
    this.deleteCuisin()
    // $('#googleauth').modal({ backdrop: 'static', keyboard: false })

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
        this.getcousins()

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
  // reset() {
  //   this.errorMessage = '';
  //   this.onConfigChange()
  // }
  // ---------------------Delete Driver------------------------//

  deleteCuisin() {

    this.service.delete('api/cuisines/', this.cusin_id, 1).subscribe(res => {
      if (res.status == 200) {
        this.getcousins()
        // this.deletedata=res
        // this.service.showSuccess("Cuisine deleted successfully")
        this.notify.success('', "Cuisine deleted successfully",
          {
            timeOut: 5000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
    }, err => {
      if (err.status == 403 || err.status == 401) {
        this.service.logout();
      }
      else if (err.status == 400) {
        //this.service.toastErr(err.error.message)
        this.notify.success('', err.error.message,
          {
            timeOut: 5000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            maxLength: 50
          }
        )
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



  block(id, is_active) {
    console.log(id, is_active)
    this.is_active = is_active;
    this.blockId = id
    this.status = "block"
    $('#blockmodal').modal({ backdrop: 'static', keyboard: false })

  }

  blockFunction() {
    $('#blockmodal').modal('hide')
    var request = {
      "block": false
    }
    this.service.postApi('api/blockcuisine/' + this.blockId, request, 1).subscribe((data: any) => {
      if (data.status == 200) {
        this.notify.success('', data.body.message,
          {
            timeOut: 5000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            maxLength: 50
          }
        )
        // this.tostr.success(data.body.message)
        // this.manageroles=
        this.getcousins()
      }

    }, err => {
      if (err.status == 403 || err.status == 401) {
        this.service.logout();
      }
      else if (err.status == 400) {
        this.tostr.error(err.error.message)
        this.notify.error('', err.error.message,
          {
            timeOut: 5000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            maxLength: 50
          }
        )

      }
    })
  }


  //   // ############################### Unblock Api #####################//


  unblock(id, is_active) {
    this.unblockId = id
    this.is_active = is_active;
    this.status = "unblock"
    $('#unblockmodal').modal({ backdrop: 'static', keyboard: false })
  }


  unblockFunction() {
    $('#unblockmodal').modal('hide')
    var requests = {
      "block": true
    }
    this.service.postApi('api/blockcuisine/' + this.unblockId, requests, 1).subscribe((data: any) => {
      if (data.status == 200) {
        // this.tostr.success(data.body.message)
        this.notify.success('', data.body.message,
          {
            timeOut: 5000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            maxLength: 50
          }
        )
        this.getcousins();
      }
      // this.unblokData = data
      // this.spiners();

    }, err => {
      if (err.status == 403 || err.status == 401) {
        this.service.logout();
      }
      else if (err.status == 400) {
        this.tostr.error(err.error.message)
        this.notify.error('', err.error.message,
          {
            timeOut: 5000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
    })


  }
}
