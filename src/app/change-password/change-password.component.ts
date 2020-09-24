import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  jwt: string;
  jwtvalue = 'JWT';
  jwtdata: string;
  qrCode: any;
  show2: boolean = false;
  show1: boolean = false;
  type: any = "password";

  show: boolean = false;
  type2: string = "password";
  type1: string = "password";
  constructor(private notify: NotificationsService, private router: Router, public fb: FormBuilder, private toastr: ToastrService, private service: ApiServiceService) { }

  ngOnInit() {
    this.changePasswordForm = this.fb.group({
      'oldPassword': ['', [Validators.required]],
      'newPassword': ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i)]],
      'confirmPassword': ['', [Validators.required]]
    })
    localStorage.setItem('Authorization', this.jwtvalue)
    // Validators.pattern(/^.*(?=.{8,})(?=..*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/)
    // Validators.pattern(/^.*(?=.{8,})(?=..*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/)
    // Validators.pattern(/^.*(?=.{8,})(?=..*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/)
  }
  // Change Password method//
  submit() {
    var object = {
      'old_password': this.changePasswordForm.value.oldPassword,
      'new_password': this.changePasswordForm.value.newPassword,
      'confirm_password': this.changePasswordForm.value.confirmPassword
    }

    //////////////////// change password Api//////////////////////
    if (this.changePasswordForm.value.newPassword == this.changePasswordForm.value.confirmPassword) {
      localStorage.setItem('conformpassword', this.changePasswordForm.value.confirmPassword)
      this.service.postApi('api/change-password', object, 1).subscribe((res: any) => {
        this.qrCode = res.message

        //let qrcode=this.qrCode;
        // this.router.navigate(['change-password-verification'])
        // this.router.navigate(['change-password-verification'],{
        // queryParams:{qrCode:JSON.stringify(qrcode)}
        // })
        // queryParams:{qrCode:JSON.stringify(qrCode)}/
        this.changePasswordForm.reset()
        this.notify.success('',"Password updated Successfully",
          {
            timeOut: 5000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            maxLength: 50
          }
        )
      }, err => {
        if (err.status == 403 || err.status == 401) {
          this.service.logout();
        }
        else if (err.status == 400) {
          // this.toastr.error(err.error.message)
          this.notify.error('', err.error.message,
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
  }

  toggleShow() {
    this.show = !this.show;
    if (this.show) {
      this.type = "text";
    }
    else {
      this.type = "password";
    }
  }



  toggleShow1() {
    this.show1 = !this.show1;
    if (this.show1) {
      this.type1 = "text";
    }
    else {
      this.type1 = "password";
    }
  }


  toggleShow2() {
    this.show2 = !this.show2;
    if (this.show2) {
      this.type2 = "text";
    }
    else {
      this.type2 = "password";
    }
  }





}