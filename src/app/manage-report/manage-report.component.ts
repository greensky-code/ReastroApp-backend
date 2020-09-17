import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-report',
  templateUrl: './manage-report.component.html',
  styleUrls: ['./manage-report.component.css']
})
export class ManageReportComponent implements OnInit {
  selectedTab: string;

  constructor(private service:ApiServiceService, private tostr:ToastrService,private router:Router) { }

  ngOnInit() {
   
  }
  makeActive(tab: string) {
    this.selectedTab = tab;
   
  }
  staffProfileDetails(){
 
  }
}
