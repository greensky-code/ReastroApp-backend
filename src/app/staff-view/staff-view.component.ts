import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-staff-view',
  templateUrl: './staff-view.component.html',
  styleUrls: ['./staff-view.component.css']
})
export class StaffViewComponent implements OnInit {
  selectedTab: string;
  retriveStaff_id: any;
  retriveStaffdata: any;
  log_history: any=[];

  constructor(private service:ApiServiceService,private tostr:ToastrService,private router:Router,private activateRouter:ActivatedRoute,private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.activateRouter.params.subscribe(res=>{
      this.retriveStaff_id=res.id   
    })
    this.selectedTab = '1a';
    this.retriveStaff()
  }

  makeActive(tab: string) {
    this.selectedTab = tab;
  }
// /////////////////////RETRIEVE STAFF API/////////////////////////////////
 retriveStaff(){
   this.spinner.show()

  this.service.getApi('api/staff/'+this.retriveStaff_id,1).subscribe(res=>{
 if(res.status==200){
   this.spinner.hide()
   this.retriveStaffdata=res.body
   this.log_history=this.retriveStaffdata.log_history
 }
  },err=>{
    if(err.status == 403 || err.status == 401){
      this.spinner.hide()
      this.service.logout();
    }
    else if (err.status == 400){
      this.spinner.hide()
      this.tostr.error(err.error.message)
    }else if(err.status==500){
      this.service.toastErr('Internal server error.')
    }
  })
  }

}
