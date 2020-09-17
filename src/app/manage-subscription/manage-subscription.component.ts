import { Component, OnInit } from '@angular/core';

import { ApiServiceService } from '../api-service.service';

import { ToastrService } from 'ngx-toastr';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NgxSpinnerService } from 'ngx-spinner';

declare var $: any;

@Component({
  selector: 'app-manage-subscription',
  templateUrl: './manage-subscription.component.html',
  styleUrls: ['./manage-subscription.component.css']
})
export class ManageSubscriptionComponent implements OnInit {

  subscriptionlist: any = [];

  subscription_data: any;

  trail: any;

  yearly: any;

  monthly: any;

  trailform: FormGroup

  monthlyform: FormGroup;

  yearlyform: FormGroup;

  page = 1;

  total: Number;

  showOtpComponent = true;

  limit: Number

  subscriptionValue: any;

  varificationCode: any;
  errorMessage: any;

  constructor(private service: ApiServiceService, private tostr: ToastrService, private formBuilder: FormBuilder, private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.getsubscription(1)

    this.trailform = this.formBuilder.group({

      number: ['', Validators.compose([Validators.required, Validators.maxLength(3), Validators.pattern(/[1-9]/i)])],

      desc: ['', Validators.compose([Validators.required, Validators.maxLength(256)])]

    })
    this.monthlyform = this.formBuilder.group({

      number: ['', Validators.compose([Validators.required, Validators.maxLength(10)])],

      desc: ['', Validators.compose([Validators.required, Validators.maxLength(256)])]

    })
    this.yearlyform = this.formBuilder.group({

      number: ['', Validators.compose([Validators.required, Validators.maxLength(10)])],

      desc: ['', Validators.compose([Validators.required, Validators.maxLength(256)])]

    })
  }

  getsubscription(page) {

    this.spinner.show()

    this.service.getApi('api/get-subscription-plan?page=' + page, 1).subscribe(res => {

      if (res.status == 200) {

        this.spinner.hide()

        this.subscriptionlist = res.body.results

        this.total = res.body.count

        this.page = page;

        this.limit = 10

        this.subscription_data = this.subscriptionlist.filter(x => x.is_active)

        this.subscription_data.forEach(element => {

          if (element.subscription_type == 'Trial') {

            this.trail = element

            console.log('trail==>>', this.trail)

            this.trailform.patchValue({

              'number': this.trail.total_trial_days,

              'desc': this.trail.description

            })

          }

          if (element.subscription_type == "Yearly") {

            this.yearly = element

            console.log('yearlysssss==>>', this.yearly)

            this.yearlyform.patchValue({

              'number': this.yearly.price,

              'desc': this.yearly.description

            })

          }

          if (element.subscription_type == "Monthly") {

            this.monthly = element

            console.log('monthly==>>', this.monthly)

            this.monthlyform.patchValue({

              'number': this.monthly.price,

              'desc': this.monthly.description

            })

          }

        }, error => {

          this.spinner.hide()

          this.service.toastErr(error.response_message)

        });


      }

    }, err => {

      if (err.status == 403 || err.status == 401) {

        this.spinner.hide()

        this.service.logout();

      }
      else if (err.status == 400) {

        this.spinner.hide()

        this.tostr.error(err.error.response_message)

      } else if (err.status == 500){

        this.spinner.hide()

        this.service.toastErr(err.statusText)
      }

    })

  }

  updatetrail() {

    let object = {

      "description": this.trailform.value.desc,

      "subscription_type": "Trial",

      "total_trial_days": this.trailform.value.number

    }

    this.service.postApi("api/update-plan", object, 1).subscribe((res) => {

      if (res.status == 200) {

        this.service.showSuccess("Trail Plan updated.")

        this.trailform.reset();

        this.getsubscription(1)
      }

    })

  }

  updatemonthly() {

    let object = {

      "description": this.monthlyform.value.desc,

      "subscription_type": "Monthly",

      "price": this.monthlyform.value.number


    }
    this.service.postApi("api/update-plan", object, 1).subscribe((res) => {

      this.monthlyform.reset()

      this.getsubscription(1)

    })

  }

  updateyearly() {

    let object = {

      "description": this.yearlyform.value.desc,

      "subscription_type": "Yearly",

      "price": this.yearlyform.value.number

    }

    this.service.postApi("api/update-plan", object, 1).subscribe((res) => {

      this.yearlyform.reset()

      this.getsubscription(1)

    })

  }

  // --------------------------------allow number input--------------------------------//

  isNumber(evt) {

    evt = (evt) ? evt : window.event;

    var charCode = (evt.which) ? evt.which : evt.keyCode;
    console.log('charCode',)


    if (charCode > 31 && (charCode < 48 || charCode > 57)) {

      return false;

    }

    return true;

  }

  // ----------------Router Link---------------------------------//

  generate(value) {

    this.subscriptionValue = value

    console.log('subscriptionValue', this.subscriptionValue)

    if (this.subscriptionValue == 'trail') {

      $('#googleauth').modal({ backdrop: 'static', keyboard: false })

    } else if (this.subscriptionValue == 'monthly') {

      $('#googleauth').modal({ backdrop: 'static', keyboard: false })

    } else if (this.subscriptionValue == 'yearly') {

      $('#googleauth').modal({ backdrop: 'static', keyboard: false })

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

  // modal() {

  //   $('#comanModal').modal('hide')

  //   $('#googleauth').modal({ backdrop: 'static', keyboard: false })

  // }

  verify() {

    let data = {

      "code": this.varificationCode

    }
    this.service.postApi('api/google-auth-step-verification', data, 1).subscribe((res) => {

      if (res.status == 200) {

        console.log('res', res)

        this.onConfigChange()

        if (this.subscriptionValue == 'trail') {

          this.updatetrail()

          this.service.showSuccess('Trail plan updated successfully.')

        } else if (this.subscriptionValue == 'monthly') {

          this.service.showSuccess('Monthly plan updated successfully.')

          this.updatemonthly()

        } else if (this.subscriptionValue == 'yearly') {

          this.service.showSuccess('Yearly plan updated successfully.')

          this.updateyearly()

        }

        $('#googleauth').modal('hide')


      }

    }, err => {

      if (err.status == 403 || err.status == 401) {

        this.onConfigChange()

        this.service.logout();

      }
      else if (err.status == 400) {

        this.onConfigChange()

        this.errorMessage=err.error.message

        // this.service.toastErr(err.error.message)

      }

      else if (err.status == 500){
        this.onConfigChange()
        this.spinner.hide()

        this.service.toastErr(err.statusText)
      }


    })

  }
  reset(){
    this.errorMessage='';
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
