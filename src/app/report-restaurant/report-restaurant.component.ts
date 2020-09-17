import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelService } from '../services/excel.service';

@Component({
  selector: 'app-report-restaurant',
  templateUrl: './report-restaurant.component.html',
  styleUrls: ['./report-restaurant.component.css']
})
export class ReportRestaurantComponent implements OnInit {
  todayDate: any;
  driver = {
    search: '',
    status: '',
    fromDate: '',
    toDate: ''
  }

  toMaxDate: any = new Date();

  newDate: any;
  formDate: any;
  payout_data: any=[];
  reataurantList: any = [];
  searchrestaurant: any;
  disabled = false
  url: string;
  total: any;
  limit: number;
  page=1;

  constructor(private router: Router, private service: ApiServiceService, private tostr: ToastrService, private spinner: NgxSpinnerService, private excelService: ExcelService) { }

  ngOnInit() {

    this.disabled = false

    this.payout_driver_list(1)

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


  payout_driver_list(page) {

    this.spinner.show()

    this.service.getApi(`api/reported-restaurants?.page=${this.page}`, 1).subscribe((res) => {

      if (res.status == 200) {

        this.spinner.hide()

        this.payout_data = res.body.results

        this.total=res.body.count
        
        this.limit=10

        console.log('payout_data',this.payout_data )


      }
    }, err => {

      this.spinner.hide()

      if (err.status == 403 || err.status == 401) {

        this.spinner.hide()

        this.service.logout();
      }

      else if (err.status == 400) {

        this.spinner.hide()

        this.tostr.error(err.error.response_message)

      }

    })

  }

  // ---------------------Search Api -----------------//
  select(value) {

    this.searchrestaurant = value

 
    if(this.searchrestaurant!=''){

      this.disabled=true

    }else if(this.searchrestaurant==''){

      this.disabled=false

    }


  }

  // ----------------Sumint Api------------------//

  submit() {

    if(this.searchrestaurant){

      this.url=`api/reported-restaurants?restaurant_name=${this.searchrestaurant}`

    }else

    if(this.driver.fromDate && this.driver.toDate){

      this.url=`api/reported-restaurants?created_at_after=`+this.driver.fromDate+'&created_at_before='+this.driver.toDate

    }

    if(this.driver.fromDate=='' && this.driver.toDate){

     this.spinner.hide()

   this.service.toastErr('Please enter from date.')

   }else if(this.driver.fromDate && this.driver.toDate==''){

     this.spinner.hide()

   this.service.toastErr('Please enter to date.')

   }

    this.spinner.show()

    this.service.getApi(this.url, 1).subscribe(res => {

      if (res.status == 200) {

        this.spinner.hide()

        this.payout_data = res.body.results

        console.log('restauranat', this.reataurantList)
      }
    }, err => {
      if (err.status == 403 || err.status == 401) {

        this.spinner.hide()

        this.service.logout();
      }
      else if (err.status == 400) {

        this.spinner.hide()

        this.tostr.error(err.error.message)
      }
      else if (err.status == 500) {

        this.spinner.hide()

        this.tostr.error(err.error.message)
      }
      this.spinner.hide()

    })

  }

  // ----------------Reset method---------------//

  reset() {

    this.disabled = false

    this.searchrestaurant = '';
  }


}
