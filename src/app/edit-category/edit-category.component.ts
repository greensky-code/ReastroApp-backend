import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationsService } from 'angular2-notifications';
declare var $: any;
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  name: any;
  category: any;
  _id: any;
  form: FormGroup;
  showOtpComponent = true;
  varificationCode: any;
  cusinsValue: any;
  errorMessage: any;
  public formEventData = [
    {
      category: ''
    }
  ];
  constructor(private notify: NotificationsService, private spinner: NgxSpinnerService, private activateRouter: ActivatedRoute, private router: Router, private fb: FormBuilder, public service: ApiServiceService, public toastr: ToastrService) {

    this.form = this.fb.group({
      'category': ['', Validators.compose([Validators.required, Validators.maxLength(256)])],
      'eventArr': this.fb.array([])

    });
  }

  ngOnInit() {
    console.log("here")
    this.activateRouter.params.subscribe(res => {
      this._id = res.id
    })
    this.categorylist()

    this.checkEventCategory()
  }

  // check event data categry data 
  categorylist() {
    let object = this._id
    this.service.getApi('api/category/' + this._id, 1).subscribe(res => {
      if (res.status == 200) {
        this.spinner.hide()
        let data = res.body.data
        console.log(data[0].category_name)
        this.name = data[0].category_name
        this.form.get('category').setValue(this.name)
      }
    }, err => {
      this.spinner.hide()
      if (err.status == 500) {
        this.spinner.hide()
        this.notify.error('', 'Internal server error.', {
          timeOut: 5000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
          maxLength: 50
        })
      }
    })
  }
  checkEventCategory() {
    if (this.formEventData) {
      this.formEventData.forEach(categry => {
        this.addCategory(categry);
      });
    } else {
      this.addCategory()
    }
  }


  // Add multiple event FormArray
  addCategory(category?: any) {
    let fg = this.fb.group({
      'category': [category ? category.category : '', Validators.required]
    });
    (<FormArray>this.form.get('eventArr')).push(fg);
  }

  // Delete event from any index
  deleteEvent(index: number) {
    (<FormArray>this.form.get('eventArr')).removeAt(index);
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
    if (this.cusinsValue == 'update') {
      this.editcategory()
      // $('#googleauth').modal({ backdrop: 'static', keyboard: false })

    }

  }

  editcategory() {
    this.spinner.show()
    this.name = this.form.value.category
    console.log(this.name)
    let object = {
      "category": this.name,
    }

    this.service.putApi('api/category/' + this._id, object, 1).subscribe((data: any) => {
      if (data.status == 200) {
        this.spinner.hide()
        //  this.tostr.success('Role permission updated successfully.')
        this.notify.success('', 'Category updated successfully.', {
          timeOut: 5000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
          maxLength: 50
        })
        this.router.navigate(['category-management'])
      }
    }, error => {
      if (error.status == 500) {
        //  this.tostr.error('Internal server error.')
        this.notify.error('', 'Internal Server Error', {
          timeOut: 5000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
          maxLength: 50
        })
      }

    })
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



  back() {
    this.router.navigate(['category-management'])
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
