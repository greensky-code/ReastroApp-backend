import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-coupon',
  templateUrl: './view-coupon.component.html',
  styleUrls: ['./view-coupon.component.css']
})
export class ViewCouponComponent implements OnInit {
  constructor(private router: Router, public service: ApiServiceService, public toastr: ToastrService) { }
 
   ngOnInit() {
    
   }

}
