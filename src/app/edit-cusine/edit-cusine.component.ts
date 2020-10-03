import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationsService } from 'angular2-notifications';

declare var $: any;
@Component({
  selector: 'app-edit-cusine',
  templateUrl: './edit-cusine.component.html',
  styleUrls: ['./edit-cusine.component.css']
})
export class EditCusineComponent implements OnInit {
  cusine_id: any;
  cusineform: FormGroup;
  cusinedata: any;
  two_food_delivery: boolean = false;

  language: any;
  cusine_ids: any;
  showOtpComponent = true;
  varificationCode: any;
  cusinsValue: any;
  errorMessage: any;
  constructor(public notify: NotificationsService, public service: ApiServiceService, private router: Router, private tostr: ToastrService, private fb: FormBuilder, private activateRouter: ActivatedRoute, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.activateRouter.params.subscribe(res => {
      this.cusine_ids = res.id
      this.language = res.language


      this.getCusinesData();
      this.cusineform = this.fb.group({
        cusine: ['', Validators.compose([Validators.required, Validators.maxLength(256)])],
        desc: ['', Validators.required]

      });
    })

  }


  getCusinesData() {
    this.spinner.show()
    if (this.language == 'th') {
      this.spinner.hide()
      this.getTranclateCuisine()
    } else {
      this.spinner.hide()
      this.getCuisine()
    }

  }


  // ---------------------------getCuisine Api ------------//

  getCuisine() {
    this.service.getApi('api/cuisines/' + this.cusine_ids, 1).subscribe((res) => {
      if (res.status == 200) {
        this.cusinedata = res.body.data
        this.cusine_id = this.cusinedata[0]._id
        console.log(this.cusinedata)
        this.cusineform.patchValue({
          "cusine": this.cusinedata[0].cuisine_name,
          "desc": this.cusinedata[0].cuisine_description
        })
      }
    })
  }


  getTranclateCuisine() {
    this.service.getApi(`api/cuisines/${this.cusine_ids}?lang=${this.language}`, 1).subscribe((res) => {
      if (res.status == 200) {
        this.cusinedata = res.body.data
        this.cusine_id = this.cusinedata[0]._id
        this.cusineform.patchValue({
          "cusine": this.cusinedata[0].cuisine_name,
          "desc": this.cusinedata[0].cuisine_description
        })
      }
    })
  }


  UpdateCusine() {
    this.spinner.show()
    if (this.language == 'th') {
      this.spinner.hide()
      this.editTranclatecusine()
    } else {
      this.spinner.hide()
      this.editcusine()
    }
  }


  //   patchValue(){
  //   this.cusineform.patchValue({
  //     "cusine"          :  this.cusinedata.name,
  //     "desc"           :  this.cusinedata.description,
  //   })
  // }

  editcusine() {
    let object = {
      "cuisine_name": this.cusineform.value.cusine,
      "cuisine_description": this.cusineform.value.desc,
    }

    this.service.putApi('api/cuisines/' + this.cusine_ids, object, 1).subscribe(res => {
      if (res.status == 200) {
        this.spinner.hide()
        this.notify.success('', "cuisines updated successfully.",
          {
            timeOut: 5000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            maxLength: 50
          }
        )
        //  this.service.showSuccess("cuisines updated successfully.")
        //this.updataStaff=res
      }
      this.router.navigate(['manage-cuisine'])
    }, err => {
      this.spinner.hide()
      if (err.status == 403 || err.status == 401) {
        this.spinner.hide()
        this.service.logout();
      }
      else if (err.status == 400) {
        this.spinner.hide()
        this.notify.error('', "Internal server Error",
          {
            timeOut: 5000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            maxLength: 50
          }
        )
      }
    })
  }


  // -----------------------------Tranclate edit Cusine Api---------------//

  editTranclatecusine() {
    this.spinner.show()
    let object = {
      "name": this.cusineform.value.cusine,
      "description": this.cusineform.value.desc,
      "language": this.language,
      "cuisines": Number(this.cusine_ids)
    }


    this.service.postApi('api/cuisine-translate', object, 1).subscribe(res => {

      if (res.status == 200) {
        this.service.showSuccess("Cuisine translated successfully.")
        this.spinner.hide()

        //this.updataStaff=res
      }
      this.router.navigate(['manage-cuisine'])
    }, err => {
      this.spinner.hide()
      if (err.status == 403 || err.status == 401) {
        this.spinner.hide()
        this.service.logout();
      }
      else if (err.status == 400) {
        this.spinner.hide()
        this.tostr.error("Cuisine with this name already exists.")
      }
    })



  }


  // ------------------------restrict special character---------------//

  omit_special_char(event) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }




  // ----------------Router Link---------------------------------//
  generate(value) {
    this.cusinsValue = value
    if (this.cusinsValue == 'cusins') {
      this.editcusine()
     // $('#googleauth').modal({ backdrop: 'static', keyboard: false })

    }

  }

  // google auth
  onOtpChange(value) {
    this.varificationCode = value
  }

  onConfigChange() {
    this.showOtpComponent = false;
    this.varificationCode = null;
    setTimeout(() => {
      this.showOtpComponent = true;
    }, 0);
  }
  // modal(){
  //   $('#comanModal').modal('hide')
  //   $('#googleauth').modal({ backdrop: 'static', keyboard: false })
  // }

  verify() {
    this.spinner.show()
    let data = {
      "code": this.varificationCode
    }
    this.service.postApi('api/google-auth-step-verification', data, 1).subscribe((res) => {
      if (res.status == 200) {
        this.spinner.hide()

        if (this.cusinsValue == 'cusins') {
          this.onConfigChange()
          this.UpdateCusine()
        }
        // this.addcusine()
        $('#googleauth').modal('hide')


      }

    }, err => {
      if (err.status == 403 || err.status == 401) {
        this.spinner.hide()
        this.onConfigChange()
        this.service.logout();
      }
      else if (err.status == 400) {
        this.spinner.hide()
        this.onConfigChange()
        this.errorMessage = err.error.message
      }
    })
  }
  reset() {
    this.errorMessage = '';
    this.onConfigChange()
  }

  // only number Allowed
  numberOnly(event): boolean {

    const charCode = (event.which) ? event.which : event.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57)) {

      return false;

    }

    return true;

  }

}
