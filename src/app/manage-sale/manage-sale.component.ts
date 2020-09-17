import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelService } from '../services/excel.service';
declare var $: any
@Component({
  selector: 'app-manage-sale',
  templateUrl: './manage-sale.component.html',
  styleUrls: ['./manage-sale.component.css']
})
export class ManageSaleComponent implements OnInit {
  serachbyName: any;
  managerole: any;
  date: any;
  data: any;
  is_active: boolean = true;
  value: any;
  id: number;
  modal: any;
  loading: boolean;
  blockId: any;
  blockIdlist: any;
  unblockId: any;
  unblockIdlist: any;
  searchkey: any = '';
  sale_data: any = [];
  unblokData: any;
  searchName: any;
  searchRole: any = [];
  total: any;
  page = 1;
  limit: number;
  showOtpComponent = true;
  status: any;
  varificationCode: any;
  otpResetField: boolean = true;
  errorMessage: any;
  delete_id: any;
  deletedata: any;
  exports: any;
  exportsdata: any = [];
  disabled = false;
  // private spinner: NgxSpinnerService
  constructor(private router: Router, private service: ApiServiceService, private tostr: ToastrService, private spinner: NgxSpinnerService, private excelService: ExcelService) { }
  ngOnInit() {
    this.disabled = false;
    this.sale_list(1);
  }


  // ##################### Search by name , email , mobileno ##################################//
  searchSubmit() {

    this.service.getApi('sales/admin/sale-get?search=' + this.searchName, 1).subscribe(res => {
      if (res.status == 200) {
        this.sale_data = res.body.results
        // this.total = res.body.count;
      }
    }, err => {
      if (err.status == 403 || err.status == 401) {
        this.service.logout();
      }
      else if (err.status == 400) {
        this.tostr.error(err.error.message)
      } else if (err.status == 500) {

        this.spinner.hide()

        this.service.toastErr(err.statusText)
      }
    })
  }

  enterValue() {
    this.searchName

    if (this.searchName != '') {

      this.disabled = true

    } else if (this.searchName == '') {

      this.disabled = false

    }
  }
  // ####################### Reset Function ################//
  reset() {
    this.searchName = '';
    this.disabled = false
    this.sale_list(1)
  }


  // ###################### Manage Role Api#################//
  sale_list(page) {
    this.spinner.show()
    this.service.getApi(`sales/admin/sale-get?page=${page}`, 1).subscribe((res) => {
      if (res.status == 200) {
        this.spinner.hide()
        this.sale_data = res.body.results
        console.log('sale_data==>>', this.sale_data)
        this.page = page
        this.total = res.body.count
        console.log('total==>>', this.total)
        this.limit = 10
      }
    }, err => {
      if (err.status == 403 || err.status == 401) {
        this.service.logout();
      }
      else if (err.status == 400) {
        this.tostr.error(err.error.response_message)
      } else if (err.status == 500) {

        this.spinner.hide()

        this.service.toastErr(err.statusText)
      }
    })
  }
  // pagination(page){
  //   this.page=page
  //   if (this.searchName) {
  //     this.searchWithPagination();
  //   } else {
  //     this.sale_list();
  //   }
  // }
  searchWithPagination() {
    this.service.getApi(`sales/admin/sale-get?search=${this.searchName}&page=${this.page}`, 1).subscribe(res => {
      if (res.status == 200) {
        this.sale_data = res.body.results
        // this.sale_list();
        this.total = res.body.count;
      }
    }, err => {
      if (err.status == 403 || err.status == 401) {
        this.service.logout();
      }
      else if (err.status == 400) {
        this.tostr.error(err.error.response_message)
      }
    })
  }
  // ########################## Block Api ######################//
  block(id, is_active) {
    this.is_active = is_active;
    this.blockId = id
    this.status = "block"
    $('#blockmodal').modal({ backdrop: 'static', keyboard: false })
  }
  blockFunction() {
    var request = {
      "sales": [this.blockId]

    }
    this.service.postApi('api/block', request, 1).subscribe((data: any) => {
      if (data.status == 200) {
        this.tostr.success(data.body.message)

        this.sale_list(1);
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
  //   // ############################### Unblock Api #####################//
  unblock(id, is_active) {
    this.unblockId = id
    this.is_active = is_active;
    this.status = "unblock"
    $('#unblockmodal').modal({ backdrop: 'static', keyboard: false })
  }
  unblockFunction() {

    var requests = {
      "sales": [this.unblockId]
    }
    this.service.putApi('api/block', requests, 1).subscribe((data: any) => {
      if (data.status == 200) {
        this.tostr.success(data.body.message)
        this.sale_list(1);
      }
      this.unblokData = data
      // this.spiners();
    }, err => {
      if (err.status == 403 || err.status == 401) {
        this.service.logout();
      }
      else if (err.status == 400) {
        this.tostr.error(err.error.message)
      }
    })
  }
  blockmodal() {
    $('#blockmodal').modal('hide')
    $('#googleauth').modal({ backdrop: 'static', keyboard: false })

  }
  unblockmodal() {
    $('#unblockmodal').modal('hide')

    $('#googleauth').modal({ backdrop: 'static', keyboard: false })

  }


  export(): void {
    this.spinner.show()
    this.service.getApi('sales/admin/sale-get?pagination', 1).subscribe(res => {
      if (res.status == 200) {
        this.spinner.hide()
        this.exportsdata = res.body.results
        console.log('Export', this.exportsdata)
        let dataArry = [];
        this.exportsdata.forEach((element, ind) => {
          let d = new Date(element.created_at);
          let creation = `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
          dataArry.push({
            "ID": element.id ? element.id : '--',
            "First Name": element.first_name ? element.first_name : '--',
            "Last Name": element.last_name ? element.last_name : '--',
            "Email": element.email ? element.email : '--',
            "Phone": element.mobile ? element.mobile : '--',
            "Created At": element.created_at && creation ? creation : '--',
            "Status": element.is_active == true ? 'Active' : 'Inactive',
            "Reference Code": element.reference_code ? element.reference_code : '--',
            "Total Reference": element.total_refrence ? element.total_refrence : '0',

          })
        })
        this.excelService.exportAsExcelFile(dataArry, 'Sale Representative Data');
      }
    }, err => {
      if (err.status == 500) {
        this.spinner.hide()
        this.service.toastErr('Internal server error.')
      } else if (err.status == 403 || err.status == 401) {
        this.spinner.hide()
        this.service.logout()
        this.service.toastErr(err.message)
      } else if (err.status == 400) {
        this.spinner.hide()
        this.service.toastErr(err.message)
      }
      this.spinner.hide()
    })


  }

  // ---------------------Delete Api-----------------------------//

  deleteFunction(id) {
    this.delete_id = id
    this.status = 'delete'
    console.log('DeleteStatus', this.status)
    $('#blockmodal').modal({ backdrop: 'static', keyboard: false })
  }
  deleteFunctions() {

    this.service.delete('sales/admin/detail/', this.delete_id, 1).subscribe(res => {
      if (res.status == 200) {
        this.deletedata = res
        this.tostr.success(res.body.message)
        this.sale_list(1);
      }
    }, err => {
      if (err.status == 403 || err.status == 401) {
        this.service.logout();
      }
      else if (err.status == 400) {
        this.tostr.error(err.error.message)
      }
      else if (err.status == 500) {
        this.tostr.error(err.statusText)
      }
    })
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
  verify() {
    let data = {
      "code": this.varificationCode
    }
    this.service.postApi('api/google-auth-step-verification', data, 1).subscribe((res) => {
      if (res.status == 200) {
        this.onConfigChange()
        if (this.status == "block") {
          this.onConfigChange()
          this.blockFunction();
        }
        else if (this.status == "unblock") {
          this.onConfigChange()
          this.unblockFunction();
        }
        else if (this.status = "delete") {
          this.onConfigChange()
          this.deleteFunctions()
        }
        this.otpResetField = false
        setTimeout(() => {
          this.otpResetField = true
        }, 100)
        $('#googleauth').modal('hide')

      }
      else {
        this.tostr.error()
      }
    }, err => {
      if (err.status == 403 || err.status == 401) {
        this.service.logout();
        this.onConfigChange()

      }
      else if (err.status == 400) {
        this.onConfigChange()
        this.errorMessage = err.error.message
        // this.tostr.error(err.error.message) 
      }
    })
  }
  resets() {
    this.errorMessage = '';
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