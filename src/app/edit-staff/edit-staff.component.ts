import { Component, OnInit } from "@angular/core";
import { ApiServiceService } from "../api-service.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationsService } from 'angular2-notifications';
declare var $: any;
@Component({
  selector: "app-edit-staff",
  templateUrl: "./edit-staff.component.html",
  styleUrls: ["./edit-staff.component.css"],
})
export class EditStaffComponent implements OnInit {
  editStaffForm: FormGroup;
  isValidNumber: any;
  myCode: string;
  addStaff_id: any;
  staffData: any;
  staffData_id: any;
  updataStaff: any;
  staffDataroles: any;
  roles_id: any;
  rolsList_id: any;
  staffDatarole_id: any;
  showOtpComponent = true;
  role: any = null;
  staffValue: any;
  varificationCode: any;
  errorMessage: any;

  constructor(
    private service: ApiServiceService,
    private router: Router,
    private tostr: ToastrService,
    private forrmBuilder: FormBuilder,
    private activateRouter: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private notify: NotificationsService
  ) { }

  ngOnInit() {
    this.activateRouter.params.subscribe((res) => {
      this.addStaff_id = res.id;
    });

    this.editStaffForm = this.forrmBuilder.group({
      firstName: [
        "",
        Validators.compose([
          Validators.required,
          Validators.maxLength(256),
          Validators.pattern(/^[a-z]+(?:['_.\s][a-z]+)*$/i),
        ]),
      ],
      middleName: [
        "",
        Validators.compose([
          Validators.maxLength(56),
          Validators.pattern(/^[a-z]+(?:['_.\s][a-z]+)*$/i),
        ]),
      ],
      lastName: [
        "",
        Validators.compose([
          Validators.required,
          Validators.maxLength(256),
          Validators.pattern(/^[a-z]+(?:['_.\s][a-z]+)*$/i),
        ]),
      ],
      number: ["", Validators.required],
      email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.maxLength(256),
          Validators.pattern(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/
          ),
        ]),
      ],
      role: ["", Validators.required],
      gender: ["", Validators.required],
    });

    this.staffdetail();
    this.getRole();
  }

  // ////////////Roles Api///////////
  getRole() {
    this.service.getApi("api/role?is_active=true", 1).subscribe((res) => {
      if (res.status == 200) {
        this.staffDataroles = res.body.results;
        this.rolsList_id = res.body.results;
      }
    });
  }
  // //////////Add Staff details Api/////////

  staffdetail() {
    this.service.getApi("api/staff/" + this.addStaff_id, 1).subscribe((res) => {
      if (res.status == 200) {
        this.staffData = res.body.data[0];
        //  this.role = res.body.role;
        //  this.editStaffForm.patchValue({
        //    role : this.role
        //  })
        this.staffData_id = res.body.id;
        this.staffDatarole_id = res.body;
        this.patchValue();
        setTimeout(() => {
          this.phoneCheckCountry();
        }, 1000);
      }
    });
  }

  patchValue() {
    //  if(this.staffDatarole_id.role_id){

    //  }
    this.editStaffForm.patchValue({
      firstName: this.staffData.first_name,
      middleName: this.staffData.middle_name,
      lastName: this.staffData.last_name,
      number: this.staffData.mobile,
      email: this.staffData.email,
      role: this.staffData.role[0]._id,
      gender: this.staffData.gender,
    });
  }

  //  /////////////////Roles Id////////////////
  selects() {
    this.roles_id = JSON.parse(this.editStaffForm.value.role);
  }

  editstaff() {
    this.spinner.show();
    this.toCheckSpaceChar();
    let object = {
      first_name: this.editStaffForm.value.firstName,
      middle_name: this.editStaffForm.value.middleName,
      last_name: this.editStaffForm.value.lastName,
      email: this.editStaffForm.value.email,
      country_code: this.myCode,
      mobile: this.editStaffForm.value.number,
      gender: this.editStaffForm.value.gender,
      role: this.editStaffForm.value.role,
    };

    this.service.putApi("api/staff/" + this.staffData._id, object, 1).subscribe(
      (res) => {
        if (res.status == 200) {
          this.spinner.hide();
          this.service.showSuccess(res.body.message);
          this.notify.success('', "Staff updated successfully.", {
            timeOut: 5000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: true,
            maxLength: 50
          })
          this.router.navigate(["manage-staff"]);
        } else if (res.status == 403 || res.status == 401) {
          this.spinner.hide();
          this.service.toastErr(res.message);
          this.service.logout();
        } else {
          this.spinner.hide();
          this.service.toastErr(res.body.message);
        }
      },
      (err) => {
        this.spinner.hide();
        if (err.status == 403 || err.status == 401) {
          this.spinner.hide();
          this.service.logout();
        } else if (err.status == 400) {
          this.spinner.hide();
          this.tostr.error(err.error.message);
        } else if (err.status == 500) {
          this.service.toastErr("Internal server error.");
        }
      }
    );
  }
  phoneCheckCountry() {
    $("#phoneNumber").intlTelInput({
      autoPlaceholder: false,
      autoFormat: false,
      autoHideDialCode: false,
      initialCountry: "in",
      nationalMode: false,
      onlyCountries: [],
      // preferredCountries: ["us"],
      formatOnInit: true,
      separateDialCode: true,
      formatOnDisplay: false,
    });
  }
  toCheckSpaceChar() {
    this.isValidNumber = $("#phoneNumber").intlTelInput("isValidNumber");
    const countryData = $("#phoneNumber").intlTelInput(
      "getSelectedCountryData"
    );
    this.myCode = "+" + countryData.dialCode;
  }
  // --------------------------------allow only numbe input-----------------------//
  isNumber(evt) {
    evt = evt ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  // ----------------Router Link---------------------------------//
  generate(value) {
    this.staffValue = value;
    if (this.staffValue == "editStaff") {
      this.editstaff();
    }
  }

  // google auth
  onOtpChange(value) {
    this.varificationCode = value;
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
      code: this.varificationCode,
    };
    this.service
      .postApi("api/google-auth-step-verification", data, 1)
      .subscribe(
        (res) => {
          if (res.status == 200) {
            this.onConfigChange();
            this.editstaff();
            $("#googleauth").modal("hide");
          }
        },
        (err) => {
          if (err.status == 403 || err.status == 401) {
            this.onConfigChange();
            this.service.logout();
          } else if (err.status == 400) {
            this.errorMessage = err.error.message;
            this.onConfigChange();
            //  this.service.toastErr(err.error.message)
          }
        }
      );
  }
  reset() {
    this.errorMessage = "";
    this.onConfigChange();
  }
  // only number Allowed
  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }

    return true;
  }
}
