import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from '../services/excel.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-restaurant-report-details',
  templateUrl: './restaurant-report-details.component.html',
  styleUrls: ['./restaurant-report-details.component.css']
})
export class RestaurantReportDetailsComponent implements OnInit {

  reataurant_id: any;

  retRastaurant: any;

  constructor(private service: ApiServiceService, private tostr: ToastrService, private excelService: ExcelService, private router: Router, private spinner: NgxSpinnerService, private activate: ActivatedRoute) { }


  ngOnInit() {

    this.activate.params.subscribe(res => {

      this.reataurant_id = res.id

      console.log('reataurant_id', this.reataurant_id)

    })

    this.getRetRestaurant()

  }

  getRetRestaurant() {

    this.service.getApi(`api/reported-restaurants/${this.reataurant_id}`, 1).subscribe(res => {

      if (res.status == 200) {

        this.retRastaurant = res.body

        console.log('retRastaurant', this.retRastaurant)

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
      else if (err.status == 500) {

        this.spinner.hide()

        this.tostr.error(err.error.response_message)

      }

        this.spinner.hide()

    })
  }

}
