import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationsService } from 'angular2-notifications';

declare var $: any;

@Component({
  selector: 'app-add-new-role',
  templateUrl: './add-new-role.component.html',
  styleUrls: ['./add-new-role.component.css']
})
export class AddNewRoleComponent implements OnInit {


  nameForm: FormGroup;
  rolePermissions: any = [];
  arrList: any[];
  permissionEmpty: boolean = false;
  roleValue: any;
  showOtpComponent = true;
  varificationCode: any;
  errorMessage: any;

  constructor(private notify: NotificationsService, private router: Router, private service: ApiServiceService, private fb: FormBuilder, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.nameForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(256)])]
    })
    this.roleList();
  }
  roleList() {
    this.spinner.show()
    this.service.getApi('api/permissions', 1).subscribe(res => {
      if (res.status == 200) {
        this.rolePermissions = res.body
        this.spinner.hide()
      }
    }, err => {
      if (err.status == 403 || err.status == 401) {
        this.spinner.hide()
        this.service.logout();
      }
      else if (err.status == 400) {
        this.spinner.hide()
       // this.toastr.error(err.error.message)
      } else if (err.status == 500) {
      //  this.service.toastErr('Internal server error.')
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


  checkAll(ev) {

    this.rolePermissions.forEach(x => x.status = ev.target.checked)
    this.validityOfPermission();
  }
  isAllChecked() {
    this.validityOfPermission()
    return this.rolePermissions.every(_ => _.status);

  }

  validityOfPermission() {
    let count = 0;
    this.rolePermissions.forEach(element => {
      if (element['status'] == true) {
        count++;
      }
    });
    if (count != 0) {
      this.permissionEmpty = false;
    } else {
      this.permissionEmpty = true;
    }
  }



  addrole() {
    this.spinner.show()
    this.arrList = [];
    this.rolePermissions.forEach(element => {
      if (element.status == true) {
        this.arrList.push(element._id.toString())
      }
    })

    let object = {
      "name": this.nameForm.value.name,
      "permissions": this.arrList
    }
    console.log(object)
    this.service.postApi('api/role', object, 1).subscribe((data: any) => {
      this.spinner.hide()
      // this.toastr.success("Role added successfully.")
      this.notify.success('', "Role added successfully.", {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true,
        maxLength: 50
      })
      this.router.navigate(['manage-role'])
    }, err => {
      if (err.status == 403 || err.status == 401) {
        this.spinner.hide()
        this.service.logout();
      }
      else if (err.status == 400) {
        this.spinner.hide()
        //   this.toastr.error(err.error.message)
        this.notify.error('', err.error.message,
          {
            timeOut: 5000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            maxLength: 50
          }
        )
      } else if (err.status == 500) {
        //  this.service.toastErr('Internal server error.')
        this.notify.error('', 'Internal Server Error',
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


  // ----------------Router Link---------------------------------//
  generate(value) {
    this.roleValue = value
    if (this.roleValue == 'addRole') {
      this.addrole()
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
    let data = {
      "code": this.varificationCode
    }
    this.service.postApi('api/google-auth-step-verification', data, 1).subscribe((res) => {
      if (res.status == 200) {
        this.onConfigChange()
        this.addrole()
        $('#googleauth').modal('hide')


      }

    }, err => {
      if (err.status == 403 || err.status == 401) {
        this.onConfigChange()
        this.service.logout();
      }
      else if (err.status == 400) {
        this.errorMessage = err.error.message
        this.onConfigChange()
        //  this.service.toastErr(err.error.message)
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



