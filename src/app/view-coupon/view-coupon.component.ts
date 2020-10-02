import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-coupon',
  templateUrl: './view-coupon.component.html',
  styleUrls: ['./view-coupon.component.css']
})
export class ViewCouponComponent implements OnInit {
  constructor(private router: Router, public service: ApiServiceService, private activateRouter: ActivatedRoute, public toastr: ToastrService) { }
  _id:any
  getcoupondetailes :any ={}
   ngOnInit() {
    this.activateRouter.params.subscribe(res => {
      this._id = res.id
    })
      
    this.getcoupon()
   }


   getcoupon(){
     let object : any = {
       _id: this._id
     }
     this.service.postApi("api/getcoupondetails", object, 4).subscribe(
      (res) => {
          if(res.body.status == 200){
          this.getcoupondetailes = res.body.data
          debugger
          }
      })
   }

}
