import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-driver-kyc',
  templateUrl: './view-driver-kyc.component.html',
  styleUrls: ['./view-driver-kyc.component.css']
})
export class ViewDriverKycComponent implements OnInit {

  id: any;
  driverKYCData: any
  rejectForm: FormGroup;
  iddata: any;
  reason_list: any;
  kyc_id: any;
  constructor(public router: Router, public route: ActivatedRoute, public service: ApiServiceService,private fb : FormBuilder, private tostr:ToastrService,private routers:Router,private spinner:NgxSpinnerService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.route.params.subscribe((res) => {
      this.id = res.id
    })
    this.viewDriverKYC();
    this.ckeckInput()
    // ------------------- reject form validation -------------------- //
  }

  ckeckInput() {
    this.rejectForm = this.fb.group({
      // reason: new FormControl('', [Validators.required]),
      // remark: new FormControl('',[ Validators.required,Validators.maxLength(200)])
      reason: ['', Validators.required],
      remark: ['', Validators.compose([Validators.required, Validators.maxLength(256)])],
    })
  }

  get reason(): any {
    return this.rejectForm.get('reason');
  }

  get message(): any {
    return this.rejectForm.get('remark');
  }

  // ----------------------- get driver kyc details doc no 8  /driver/driver-kyc-detail/292 ---------------- //
  viewDriverKYC() {
    this.service.getApi('driver/driver-kyc-detail/' + this.id, 1).subscribe((res) => {
      if (res.status == 200) {
        console.log('response', res)
        this.driverKYCData = res.body
        console.log('driverKYCData==>>', this.driverKYCData.driver.driver_kyc.driver_kyc)
      }
      else {
      }
    }, err => {
      if (err.status == 403 || err.status == 401) {
        this.service.logout();
      }
      else if (err.status == 400) {
      }
    })
  }

  // --------------------------- approved kyc details --------------------- //
  driverKYCApproved() {
    this.spinner.show()
    let kyc_id = this.driverKYCData.driver.driver_kyc.id;
    this.service.getApi('driver/approved/' + kyc_id, 1).subscribe((res) => {
      if (res.status == 200) {
        this.spinner.hide()
        this.routers.navigate(['manage-drivers'])
        this.tostr.success(res.body.message)
        this.viewDriverKYC();
        // recall api to refresh data on success
      }
      else {
        this.spinner.hide()
        this.tostr.error('Something went wrong.')
      }
    }, err => {
      this.spinner.hide()
      if (err.status == 403 || err.status == 401) {
        this.spinner.hide()
        this.service.logout();
      }
      else if (err.status == 400) {
        this.spinner.hide()
        // this.tostr.error(err.error.message)
      }
    });
  }

  // ---------------------------- reject kyc details ------------------------- //
  driverKYCReject() {
    this.spinner.show()
    this.kyc_id = this.driverKYCData.driver.driver_kyc.driver_kyc;
    console.log('iddsfdsffd===>', this.kyc_id)
    let data = {
      reasons: this.rejectForm.value.reason,
      remark: this.rejectForm.value.remark
    }
    console.log('datareason==>>>', data)
    this.service.postApi('driver/reject/' + this.kyc_id, data, 1).subscribe((res) => {
      if (res.status == 200) {
        this.spinner.hide()
        this.rejectForm.reset()
        this.routers.navigate(['manage-drivers'])
        this.service.showSuccess(res.body.message);
        this.viewDriverKYC(); // recall api to refresh data on success
      }
    }, err => {
      this.spinner.hide()
      if (err.status == 403 || err.status == 401) {
        this.spinner.hide()
        this.service.logout();
      }
      else if (err.status == 400) {
        this.spinner.hide()
        this.rejectForm.reset()
        // this.toastr.error(err.error.message)
      }
    })
  }

  getreason() {
    this.service.getApi('api/reasons-of-rejections', 1).subscribe((res) => {
      this.reason_list = res.body
    })
  }

  
}
