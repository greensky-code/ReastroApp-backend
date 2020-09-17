import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelService } from '../services/excel.service';

@Component({
  selector: 'app-payout-driver-details',
  templateUrl: './payout-driver-details.component.html',
  styleUrls: ['./payout-driver-details.component.css']
})
export class PayoutDriverDetailsComponent implements OnInit {
  payout_data: any;
  driverPayout_id: any;

  constructor(private router: Router, private service: ApiServiceService, private tostr: ToastrService, private spinner :NgxSpinnerService,private excelService:ExcelService,private activate:ActivatedRoute) { }

  ngOnInit() {
    this.activate.params.subscribe(res=>{
      this.driverPayout_id=res.id
      // console.log('driverPayout_id',this.driverPayout_id)
    })
    this.payout_ret()
  }
  payout_ret() {
    this.spinner.show()
    this.service.getApi(`driver/admin/payout-detail/${this.driverPayout_id}`,1).subscribe((res) => {
      if (res.status == 200) {
        this.spinner.hide()
        this.payout_data =res.body
        console.log('payout_data',this.payout_data)
       
      }
    },err=>{
      this.spinner.hide()
      if(err.status == 403 || err.status == 401){
        this.spinner.hide()
        this.service.logout();
      }
      else if (err.status == 400){
        this.spinner.hide()
        this.tostr.error(err.error.response_message)
      }
    })
  }
}
