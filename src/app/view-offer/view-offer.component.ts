import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ExcelService } from '../services/excel.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-offer',
  templateUrl: './view-offer.component.html',
  styleUrls: ['./view-offer.component.css']
})
export class ViewOfferComponent implements OnInit {
  offer_id: any;
  offer_details: any[];
  admin_offer: any;
  page = 1;
  offer_detail: any;
  constructor(private service:ApiServiceService,private router:Router, private activateRouter:ActivatedRoute,private excelService:ExcelService,private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.activateRouter.params.subscribe((res)=>{
      this.offer_id=res.id
    })
    this.offerdetails(1)
  }
  offerdetails(page){
    this.spinner.show()
    this.service.getApi('api/offers/' + this.offer_id,1).subscribe((res)=>{
      if(res.status == 200){
        this.spinner.hide()
     this.offer_details = res.body.admin_offer
     this.offer_detail = res.body
     console.log('business_name',this.offer_details)
    //  this.admin_offer = this.offer_details.admin_offer
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

  // export():void{
  //   let dataArry=[];
  //   this.offer_details.forEach((element,ind)=>{
  //     let d=new Date(element.created_at);
  //     let creation=`${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
  //     dataArry.push({
  //      "Role ID"         : element.id?element.id:'N/A',
  //      "Role Name"       : element.name?element.name:'/N/A',
  //      "Created By"      : element.created_by?element.created_by:'N/A',
  //      // "Created At"      :element.created_at?element.created_at.slice(0,10):'N/A', 
  //      "Created At"      :element.created_at && creation?creation:'N/A', 
  //      "Status"          : element.is_active==true?'Active':'Inactive',
  //      // "Status":element.is_active==true?'Active':'Inactive',
  //     })
  //   })
  //   this.excelService.exportAsExcelFile(dataArry,'Manage Role Data');
  //  }

}
