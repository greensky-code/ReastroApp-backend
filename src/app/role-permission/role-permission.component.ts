import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';

declare var $: any;
@Component({
  selector: 'app-role-permission',
  templateUrl: './role-permission.component.html',
  styleUrls: ['./role-permission.component.css']
})
export class RolePermissionComponent implements OnInit {
  // nameForm: FormGroup;
  checkBoxValue: any = false;
  roleForm: FormGroup;
  checkboxData: any;
  CategoryModel = [];
  categoryList = [];
  data: any;
  rolePermissions: any = [];
  roles: any;
  permitionId: any = [];
  idofpermission: any = [];
  id: any;
  dataindex: any;
  sizes: any[];
  arrList: any[];
  name: any;
  checkStatus: boolean = false;
  permissionEmpty: boolean = false;
  _id: any;
  permissions: any;
  rolelist: any = [];
  newarraylist: any;
  showOtpComponent = true;
  roleValue: any;
  varificationCode: any;
  errorMessage: any;
  nameForm: FormGroup
  constructor(private notify: NotificationsService, private fb: FormBuilder, private router: Router, private service: ApiServiceService, private tostr: ToastrService, private activateRouter: ActivatedRoute, private formBuilder: FormBuilder, private spinner: NgxSpinnerService) {
    this.nameForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(256)])]
    })
  }

  ngOnInit() {
    // this.roleForm=this.formBuilder.group({
    //   roles : ['',]
    // })
    this.activateRouter.params.subscribe(res => {
      this._id = res.id
    })
    this.roleList();
  }



  roleList() {
    this.spinner.show()
    this.service.getApi('api/permissions', 1).subscribe(res => {
      if (res.status === 200) {
        this.rolelist = res.body
        this.editList();
      }
    }, err => {
      if (err.status == 500) {
        this.spinner.hide()
      }
    })


  }


  editList() {
    let object = this._id
    this.service.getApi('api/role/' + this._id, 1).subscribe(res => {
      if (res.status == 200) {
        this.spinner.hide()
        let data = res.body.data
        console.log(data)
        this.name = data[0].name
        this.nameForm.get('name').setValue(this.name)
        this.rolePermissions = data[0].Permission
        this.rolelist.forEach((element, index) => {
          this.rolePermissions.forEach(element2 => {
            if (element._id == element2._id) {
              this.rolelist[index]['status'] = true;
            }
          });
        });
      }
    }, err => {
      this.spinner.hide()
      if (err.status == 500) {
        this.spinner.hide()
        this.service.toastErr('Internal server error.')
      }
    })


  }


  checkAll(ev) {

    this.rolelist.forEach(x => x.status = ev.target.checked)
    this.validityOfPermission();
  }
  isAllChecked() {
    this.validityOfPermission();
    let count = 0;
    return this.rolelist.every(_ => _.status);
  }

  validityOfPermission() {
    let count = 0;
    this.rolelist.forEach(element => {
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


  editpermission() {
    this.spinner.show()
    this.arrList = [];
    this.rolelist.forEach(element => {
      if (element.status == true) {
        this.arrList.push(element._id.toString())
      }
    })

    let object = {
      "name": this.name,
      "permissions": this.arrList
    }

    this.service.putApi('api/role/' + this._id, object, 1).subscribe((data: any) => {
      if (data.status == 200) {
        this.spinner.hide()
        //  this.tostr.success('Role permission updated successfully.')
        this.notify.success('', 'Role permission updated successfully.', {
          timeOut: 5000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: true,
          maxLength: 50
        })
        this.router.navigate(['manage-role'])
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



  // ----------------Router Link---------------------------------//
  generate(value) {
    this.roleValue = value
    if (this.roleValue == 'permission') {
      this.editpermission()
      //  $('#googleauth').modal({ backdrop: 'static', keyboard: false })

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
        this.editpermission()
        $('#googleauth').modal('hide')


      }

    }, err => {
      if (err.status == 403 || err.status == 401) {
        this.onConfigChange()
        this.service.logout();
      }
      else if (err.status == 400) {
        this.onConfigChange()
        this.errorMessage = err.error.message
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
