import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelService } from '../services/excel.service';

@Component({
  selector: 'app-payout-sales-details',
  templateUrl: './payout-sales-details.component.html',
  styleUrls: ['./payout-sales-details.component.css']
})
export class PayoutSalesDetailsComponent implements OnInit {
  salePayout_id: any;
  salepayout_data: any;

  constructor(private router: Router, private service: ApiServiceService, private tostr: ToastrService, private spinner :NgxSpinnerService,private excelService:ExcelService,private activate:ActivatedRoute) { }


  ngOnInit() {
    this.activate.params.subscribe(res=>{
      this.salePayout_id=res.id
      // console.log('driverPayout_id',this.driverPayout_id)
    })
    this.payoutRet() 
  }

  payoutRet() {
    this.spinner.show()
    this.service.getApi(`sales/admin/payout-pending/${this.salePayout_id}`,1).subscribe((res) => {
      if (res.status == 200) {
        this.spinner.hide()
        this.salepayout_data =res.body
        console.log('salepayout_data',this.salepayout_data)
  
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
