import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { ApiServiceService } from '../api-service.service';

// import { ToastrManager } from 'ng6-toastr-notifications';

import { NgxSpinnerService } from 'ngx-spinner';

import { ToastrService } from 'ngx-toastr';

import { ExcelService } from '../services/excel.service';

declare var $: any;

// import { ToastrService } from 'ngx-toastr';

@Component({

  selector: 'app-manage-merchant',

  templateUrl: './manage-merchant.component.html',

  styleUrls: ['./manage-merchant.component.css']

})

export class ManageMerchantComponent implements OnInit {

  marchantdata: any = [];

  user = { 'searchField': '', 'kycRole': '' }

  value: any;

  pageNo: any;

  total: Number;

  page = 1;

  limit: Number

  driver = {

    search: '',

    status: '',

    fromDate: '',

    toDate: ''

  }

  todayDate: any;

  toMaxDate: any = new Date();

  newDate: any;

  id: any;

  search: any = ''

  dataArr: any[];

  formDate: any;

  registerMerchant: any;


  varificationCode: any;

  registerMerchant_id: any;

  export: any = [];

  merchantExportdata: any=[];

  disabled=false

  searchField: any;

  statesFilter='';
  url: string;


  constructor(private router: Router, private service: ApiServiceService, public toastr: ToastrService, private spinner: NgxSpinnerService, private excelService: ExcelService) { }

  ngOnInit() {

    this.disabled=false

    this.getmarchantdetail(1)

  }
  // -------------------Google Authentication--------------//





  // only number Allowed
  numberOnly(event): boolean {

    const charCode = (event.which) ? event.which : event.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57)) {

      return false;

    }

    return true;

  }


  getDate(event) {
    if (event) {
      this.formDate = event;
      console.log('formDate',this.formDate)
      this.disabled=true
    }
    else {
      this.newDate = ''
    }
  }

  fromMaxDate(event){
    if(event){
      this.todayDate = new Date(event)
      console.log('todayDate===>>',this.todayDate)

      this.disabled=true
    }
    else{
      this.todayDate = new Date()
    }
  }

  getmarchantdetail(page) {

    this.page = page
    

    console.log('pagepage==>>>', this.page)

    this.spinner.show()
    // merchant/admin/merchant-list?page=${this.page}&status=${this.statesFilter}
    this.service.getApi(`merchant/admin/merchant-list?page=${this.page}&status=${this.statesFilter}`, 1).subscribe(res => {

      console.log('response', res)

      if (res.status == 200) {

        this.spinner.hide()

        this.total = res.body.count

        console.log('total', this.total)

        this.page = page;

        this.limit = 10

        this.marchantdata = res.body.results

        console.log('marchantdatamarchantdata', res)

      }

    }, err => {

      if (err.status == 403 || err.status == 401) {

        this.spinner.hide()

        this.service.logout();

      }

      else if (err.status == 400) {

        this.spinner.hide()

        this.toastr.error(err.error.message)

      }
      else if (err.status == 500) {

        this.spinner.hide()

        this.toastr.error(err.statusText)

      }
    }
    )
  }

    searchUser(value){

    this.searchField=value

   
    if(this.searchField!=''){

      this.disabled=true

    }else if(this.searchField==''){

      this.disabled=false

    }

    console.log('searchField',this.searchField)

  }


  selectState(value){

    this.statesFilter=value

    if(this.statesFilter!=''){

      this.disabled=true

    }else if(this.statesFilter==''){

      this.disabled=false

    }

    console.log('statesFilter',this.statesFilter)

  }


  getUserList() {

    this.spinner.show()

    // let value = {

    //   // "search": this.searchField,

    //   // "userRole": this.statesFilter,

    //   "date": this.driver.fromDate,

    //   "created_at_before": this.driver.toDate

    // }

    this.disabled=false

    // let data, url = '', count = 0;

    // to validate date 
    // if (this.driver.fromDate) {

    //   count++;

    // }

    // if (this.driver.toDate) {

    //   count++;

    // }

    // if (count == 1) {

    //   this.toastr.error('Please select from and to date.');

    //   return;

    // }
    // if (this.statesFilter) {

    //   this.url = `?page=${page}&status=${this.statesFilter}`

    // }

    // if (this.searchField) {

    //   if (url.includes('?')) {

    //     url = url + '&' + `search=${this.searchField}`

    //   } else {

    //     url = '?page=' + page + '&' + `search=${this.searchField}`

    //   }

    // }


    // if (this.driver.fromDate && this.driver.toDate) {

    //   if (url.includes('?')) {

    //     url = url + `&created_at_after=${this.driver.fromDate}&created_at_before=${this.driver.toDate}`

    //   } else {

    //     url = `?page=${page}&created_at_after=${this.driver.fromDate}&created_at_before=${this.driver.toDate}`

    //   }

    // }

    if(this.statesFilter && this.driver.toDate && this.driver.fromDate && this.searchField){
      // this.url=`merchant/admin/merchant-list?is_active=${this.user.kycRole}&role=${this.statesFilter }&created_at_after=${this.driver.fromDate}&created_at_before=${this.driver.toDate}&search=${this.searchField}`
      this.url=`merchant/admin/merchant-list?&search=${this.searchField}&status=${this.statesFilter}&created_at_after=${this.driver.fromDate}&created_at_before=${this.driver.toDate}`
      }
      else if(this.searchField){
       this.url=`merchant/admin/merchant-list?search=`+this.searchField
      }
      
       else if(this.statesFilter){
        this.url=`merchant/admin/merchant-list?&status=`+this.statesFilter
       }else
       if(this.driver.fromDate && this.driver.toDate){
         this.url=`merchant/admin/merchant-list?created_at_after=`+this.driver.fromDate+'&created_at_before='+this.driver.toDate
       }
       if(this.driver.fromDate=='' && this.driver.toDate){
        this.spinner.hide()
      this.service.toastErr('Please enter from date.')
      }else if(this.driver.fromDate && this.driver.toDate==''){
        this.spinner.hide()
      this.service.toastErr('Please enter to date.')
      }

    this.service.getApi(this.url, 1).subscribe(res => {

      if (res.status == 200) {

        this.spinner.hide()

        this.total = res.body.count

        this.marchantdata = res.body.results

      }

    }, error => {

      this.spinner.hide()

      this.toastr.error(error.error.message)

    })

  }

  reset() {

    this.newDate = "";

    this.todayDate = "";

    this.driver = {

      search: '',

      status: '',

      fromDate: '',

      toDate: ''

      

    }
    this.searchField = '',

    this.statesFilter = '',

    this.driver.fromDate = '',

    this.driver.toDate = '',

    this.disabled=false

    this.getmarchantdetail(1)

   

  }


  exportAsXLSX(): void {
    this.spinner.show()
    // console.log('eawewewewaeewwe') dshjdsfgdhjdfgjasdasdsadsdssa

    this.service.getApi(`merchant/admin/merchant-list?pagination=false`, 1).subscribe(res => {
      if (res.status == 200) {
        this.spinner.hide()
        this.merchantExportdata = res.body
        console.log("merchantExportdata",this.merchantExportdata)
        let dataArrs = [];
        this.merchantExportdata.forEach((element, ind) => {

          let d = new Date(element.created_at);
          let creation = `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
          let b=new Date(element.kyc_submit_date)

          let subDate=`${b.toLocaleDateString()} ${b.toLocaleDateString()}`

          dataArrs.push({

            // "S no": ind + 1,

            "Merchant ID": element.id ? element.id : '',

            "Business": element.business != null ? element.business.business_name : '--',

            "Email": element.email ? element.email : '--',

            "Phone": element.mobile ? element.mobile : '--',

            "Created By": element.created_by ? element.created_by : '--',

            "Created At": element.created_at && creation ? creation : '--',

            "Status": element.is_active == true ? 'Active' : 'Inactive',

            "KYC Status": element.kyc_status ? element.kyc_status : '--',

            "KYC Submit date": element.kyc_submit_date && subDate ? subDate : '--',

            "Approved By": element.approved_or_rejected_by != null ? element.approved_or_rejected_by : '--',

          })
        

        })

        this.excelService.exportAsExcelFile(dataArrs, 'Manage Merchant Data');
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

}
