import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { ApiServiceService } from "../api-service.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.css']
})
export class AddCouponComponent implements OnInit {
  addcouponForm: FormGroup;
  couponValue :any
  constructor(
    private service: ApiServiceService,
    private router: Router,
    private tostr: ToastrService,
    private forrmBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private notify: NotificationsService
  ) { }
 
   ngOnInit() {
     this.addcouponForm = this.forrmBuilder.group({
      
      city: ["", Validators.required],
      restaurant: ["", Validators.required],
      coupon_name:["",Validators.required,],
      coupon_code:["",Validators.required,],
      coupon_value:["",Validators.required],
      max_coupon_value:["",Validators.required],
      start_date:["",Validators.required],
      end_date:["", Validators.required],
      coupon_quantity:[],
      Description:[],
      min_order_value :[]
     });
   }


   addnewcoupon(value){
    this.couponValue = value;
    if (this.couponValue == "addcoupon") {
      this.addcoupon();
    }
   }

   addcoupon(){
    this.spinner.show();
    let object = {
      City: this.addcouponForm.value.city,
      restaurant: this.addcouponForm.value.restaurant,
      coupon_name: this.addcouponForm.value.coupon_name,
      coupon_code: this.addcouponForm.value.coupon_code,
      Max_Coupon_Value: this.addcouponForm.value.max_coupon_value,
      start_date: this.addcouponForm.value.start_date,
      end_date : this.addcouponForm.value.end_date,
      min_order_value: this.addcouponForm.value.min_order_value,
      coupon_quantity:this.addcouponForm.value.coupon_quantity,
      Description: this.addcouponForm.value.Description,
      coupon_value: this.addcouponForm.value.coupon_value
    };
debugger
    this.service.postApi("api/addnewcoupon", object, 4).subscribe(
      (res) => {

        if(res.body.status == 200){
          this.spinner.hide();
          this.tostr.success(res.body.text);
          this.router.navigate(["coupon-management"]);
        } else{
          this.spinner.hide();
          this.tostr.error(res.body.text);
        }
      })
   }

}
