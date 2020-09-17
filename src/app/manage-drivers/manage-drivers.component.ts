import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from '../services/excel.service';
import { element } from 'protractor';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
declare var $: any;
@Component({
  selector: 'app-manage-drivers',
  templateUrl: './manage-drivers.component.html',
  styleUrls: ['./manage-drivers.component.css']
})
export class ManageDriversComponent implements OnInit {
  driverData: any = [];
  driver = {
    searchField: '',
    status: '',
    fromDate: '',
    toDate: ''
  }

  todayDate: any = new Date();
  toMaxDate: any = new Date();
  newDate: any;

  // pagination 
  pageNo: any;
  total: Number;
  page = 1;
  limit: Number
  formDate: any;
  driver_kyc: any;
  driver_kyc_update: any;
  comanValue: any;
  comanValue_id: any;
  driver_id: any;
  showOtpComponent = true;
  varificationCode: any;
  errorMessage: any;
  driverExportdata: any;
  disables=false
  searchField: any;
  driverstatus='';
  constructor(private service: ApiServiceService, public toastr: ToastrService, private spinner: NgxSpinnerService, private excelService: ExcelService) { }

  ngOnInit() {
    this.disables=false
    // this.getDriverDetail();
    this.getDriverDetail(1);

  }



  // ---------------------------- get driver for pagination data -------------------------- //
  getDriverDetail(page) {
    this.page=page
    this.spinner.show()

    this.service.getApi(`driver/detail?page=${this.page}&status=${this.driverstatus}`, 1).subscribe(res => {
      if (res.status == 200) {
        this.spinner.hide()
        this.driverData = res.body.results
        this.total = res.body.count
        this.page = page;
        this.limit = 10
      }
      else {
      }
    }, err => {
      console.log('error',err)
      if (err.status == 403 || err.status == 401) {
        this.spinner.hide()
        this.service.logout();
      }
      else if (err.status == 400) {
        this.spinner.hide()
        this.toastr.error(err.error.response_message)
      } else if (err.status == 500) {
        this.spinner.hide()
        this.toastr.error(err.statusText)
      }
    })
  }

  // -------------------- date validation ---------------------------------- //
  getDate(event) {
    if (event) {
      this.formDate = event;
      this.disables=true
    }
    else {
      this.newDate = ''
    }
  }
  fromMaxDate(event) {
    if (event) {
      this.todayDate = new Date(event)
      this.disables=true
    }
    else {
      this.todayDate = new Date()
    }
  }

  // --------------------------Google Authentication ----------------//
  // comanFuntion(id,value){
  //   this.comanValue=value
  //   this.comanValue_id=id
  //   console.log('comanValue_id',this.comanValue_id)
  //   console.log('comanValue',this.comanValue)
  //   if(this.comanValue==''){

  //   }else if(this.comanValue==''){

  //   }

  // }
  searchDrivername(value){

    this.searchField=value

    if(this.searchField!=''){

      this.disables=true

    }else if(this.searchField==''){

      this.disables=false

    }
  }


  selectStatus(value){

    this.driverstatus=value
    
    console.log('driverstatus',this.driverstatus)

    if(this.driverstatus!=''){

      this.disables=true

    }else if(this.driverstatus==''){

      this.disables=false

    }
  }
  // ---------------------------- search driver with specific data ------------------------- //
  searchDriver() {
    this.spinner.show()
    let value = {
      // "search": this.searchField,
      // "userRole": this.driverstatus,
      "date": this.driver.fromDate,
      "created_at_before": this.driver.toDate
    }
    let data, url = '', count = 0;
    // to validate date 
    if (this.driver.fromDate) {
      count++;
    }
    if (this.driver.toDate) {
      count++;
    }
    if (count == 1) {
      this.toastr.error('Please select from and to date.');
      return;
    }

    if (this.driverstatus) {
      url = `?status=${this.driverstatus}`

    }
    if (this.searchField) {
      if (url.includes('?')) {
        url = url + '&' + `search=${this.searchField}`
      } else {
        url = '?' + `search=${this.searchField}`
      }
    }

    if (this.driver.fromDate && this.driver.toDate) {
      if (url.includes('?')) {
        url = url + `&created_at_after=${this.driver.fromDate}&created_at_before=${this.driver.toDate}`
      } else {
        url = `?created_at_after=${this.driver.fromDate}&created_at_before=${this.driver.toDate}`
      }
    }

    this.service.getApi(`driver/detail${url}`, 1).subscribe(res => {
      if (res.status == 200) {
        this.spinner.hide()
        this.total = res.body.count
        this.driverData = res.body.results

      }
    }, err => {
      if (err.status == 403 || err.status == 401) {
        this.spinner.hide()
        this.service.logout();
      }
      else if (err.status == 400) {
        this.spinner.hide()
        this.toastr.error(err.error.response_message)
      } else if (err.status == 500) {
        this.spinner.hide()
        this.service.toastErr("Internal server error.")
      }
    })
  }

  // reset search driver fields
  resetSearch() {
    this.newDate = Date;
    this.formDate = '';
    this.fromMaxDate(0)
    this.driverstatus='';
    this.searchField='';
    this.driver = {
      searchField: '',
      status: '',
      fromDate: '',
      toDate: ''
    }
    this.disables=false
    this.getDriverDetail(1); //recal pagination data after reset search
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

  exportAsXLSX(): void {
    this.service.getApi(`driver/detail?pagination=false`,1).subscribe(res=>{
      if(res.status == 200 ){
        this.driverExportdata=res.body
        console.log('driverExportdata',this.driverExportdata)
        let dataArr = [];
        this.driverExportdata.forEach((element => {
          let d = new Date(element.created_at);
          let creation = `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`    
          dataArr.push({
            "Driver ID": element.id ? element.id : '--',
            "Driver Name": element.driver != null ? element.driver.first_name : '--',
            "Phone": element.mobile ? element.mobile : '--',
            "Created At": element.created_at && creation ? creation : '--',
            "Created By": element.created_by ? element.created_by : '--',
            "Status": element.is_active == true ? 'Active' : 'Inactive',
            "KYC Status": element.kyc_status ? element.kyc_status : '--',
            "KYC Submit Date": element.driver != null ? element.driver.driver_kyc.updated_at.slice(0, 10) : '--',
            "Approved By/Rejected": element.kyc_status ? element.kyc_status : '--',
            "Online Status": element.is_online == true ? 'Active' : 'Inactive',
    
    
          })
        }))
        this.excelService.exportAsExcelFile(dataArr, 'Manage Driver');

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

  // -------------------------Driver Delete Api-----------------------//
  openModal(id) {
    this.driver_id = id
    console.log('driver_id', this.driver_id)
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

    let data = {

      "code": this.varificationCode

    }

    this.service.postApi('api/google-auth-step-verification', data, 1).subscribe((res) => {

      if (res.status == 200) {

        this.onConfigChange()
        this.deleteDriver()

        $('#googleauth').modal('hide')

      }

    }, err => {

      if (err.status == 403 || err.status == 401) {

        this.onConfigChange()

        this.service.logout();

      }
      else if (err.status == 400) {

        this.onConfigChange()
        this.errorMessage=err.error.message

        // this.service.toastErr(err.error.message) 

      }

    })

  }
  reset(){
    this.errorMessage='';
    this.onConfigChange()
  }

  // ---------------------Delete Driver------------------------//

  deleteDriver() {
    this.spinner.show()

    this.service.delete('driver/detail/', this.driver_id, 1).subscribe(res => {
      if (res.status == 200) {
        this.spinner.hide()

        // this.deletedata=res
        this.service.showSuccess(res.body.message)
        this.getDriverDetail(1);
      }
    }, err => {
      this.spinner.hide()

      if (err.status == 403 || err.status == 401) {
        this.spinner.hide()

        this.service.logout();
      }
      else if (err.status == 400) {
        this.service.toastErr(err.error.message)
        // this.tostr.error(err.error.message)
      }
      else if (err.status == 500) {
        this.spinner.hide()

        this.service.toastErr(err.statusText)
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
