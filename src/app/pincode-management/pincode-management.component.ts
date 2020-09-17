import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from '../services/excel.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any
@Component({
  selector: 'app-pincode-management',
  templateUrl: './pincode-management.component.html',
  styleUrls: ['./pincode-management.component.css']
})
export class PincodeManagementComponent implements OnInit {
  
  
  
  

  constructor(private service:ApiServiceService,private tostr:ToastrService,private excelService:ExcelService,private router:Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    
  }

  
}




