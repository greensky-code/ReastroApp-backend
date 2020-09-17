import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelService } from '../services/excel.service';

@Component({
  selector: 'app-inquiries',
  templateUrl: './inquiries.component.html',
  styleUrls: ['./inquiries.component.css']
})
export class InquiriesComponent implements OnInit {
  contactUsdata: any=[];
  total: any;
  page=1
;
  limit: number;
  constructor(private router: Router, private service: ApiServiceService, private tostr: ToastrService, private spinner: NgxSpinnerService, private excelService: ExcelService) { }


  ngOnInit() {

 this.getcontactUs(1)

  }

  getcontactUs(page){
    this.page=page

    this.service.getApi(`api/contact-us?page=${this.page}`,1).subscribe(res=>{

      if(res.status == 200 ){

        this.contactUsdata=res.body.results

        this.total = res.body.count

        console.log('total', this.total)

        // this.page = page;

        this.limit = 10
        
        console.log('contactUsdata',this.contactUsdata)
        
      }

    })

  }

}
