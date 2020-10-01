import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from '../services/excel.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationsService } from 'angular2-notifications';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';

declare var $: any;
@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent implements OnInit {
  status: any;
  searchRole: string;
  total: any;
  managecategory: any;
  disabled: boolean;
  searchRoleName: any;
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
  form: FormGroup;
  selectState = '';
  selectdate = '';
  selectend = ''

  constructor(private fb: FormBuilder, private router: Router, private activateRouter: ActivatedRoute, private notify: NotificationsService, private service: ApiServiceService, private tostr: ToastrService, private excelService: ExcelService, private spinner: NgxSpinnerService) {

  }

  ngOnInit() {
    this.getcategory()
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
    this.service.getApi('api/category?search=' + seracname, 1).subscribe(res => {
      if (res.status == 200) {
        this.managecategory = res.body.results
        this.total = res.body.count;
      }

    })
  }

  // ####################### Reset Function ################//
  reset() {
    this.searchRole = '';
    this.selectState = '';
    this.selectdate = '';
    this.selectend = ''
    this.disabled = true
    this.getcategory();
  }

  // ####################### ViewAllRecords ################//
  viewAllRecords() {
    this.getcategory();
  }

  // ###################### Manage Role Api#################//
  filter() {
    this.spinner.show()
    let object = {
      "status": this.status,
      "start": this.formDate,
      "end": this.todayDate
    }
    console.log(object)
    this.service.postApi(`api/filtercategory?page=${this.page}`, object, 1).subscribe((res) => {
      console.log(res)
      if (res.status == 200) {
        this.spinner.hide()
        this.managecategory = res.body.results
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

  getcategory() {
    this.spinner.show()
    this.service.getApi(`api/category?page=${this.page}`, 1).subscribe((res) => {
      console.log(res)
      if (res.status == 200) {
        this.spinner.hide()
        this.managecategory = res.body.results
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
      this.getcategory();
    }
  }

  searchWithPagination() {
    this.service.getApi(`api/category?search=${this.searchRoleName}&page=${this.page}`, 1).subscribe(res => {
      if (res.status == 200) {
        this.managecategory = res.body.results
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
  // -------------------- date validation ---------------------------------- //
  getDate(event) {
    console.log(event)
    if (event) {
      this.formDate = new Date(event);
      this.disables = true
    }
    else {
      this.newDate = ''
    }
  }
  fromMaxDate(event) {
    console.log(event)
    if (event) {
      this.todayDate = new Date(event)
      this.disables = true
    }
    else {
      this.todayDate =''
    }
  }



  unblock(event, id) {
    console.log('event', event);

  }


  selectStatus(event) {
    console.log('event', event);
    this.status = event
    this.disables = true
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
    this.deleteCategory()
    //  $('#comanModal').modal('hide')
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
        //  this.deleteCuisin()
        //  this.getcousins()

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
  // ---------------------Delete Category------------------------//

  deleteCategory() {

    this.service.delete('api/category/', this.cusin_id, 1).subscribe(res => {
      console.log(res.status)
      if (res.status == 200) {
        this.getcategory()
        // this.deletedata=res
        $('#comanModal').modal('hide')
        this.notify.success('', "Category deleted successfully", {
          timeOut: 5000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
          maxLength: 50
        })

      }
    }, err => {
      if (err.status == 403 || err.status == 401) {
        this.service.logout();
      }
      else if (err.status == 400) {
        this.notify.error('', err.error.message, {
          timeOut: 5000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
          maxLength: 50
        })
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
