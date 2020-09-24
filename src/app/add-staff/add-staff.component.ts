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
declare var $: any;
@Component({
  selector: "app-add-staff",
  templateUrl: "./add-staff.component.html",
  styleUrls: ["./add-staff.component.css"],
})
export class AddStaffComponent implements OnInit {
  addStaffForm: FormGroup;
  isValidNumber: any;
  myCode: string;
  manageStaffroles: any;
  selectRole: any;
  addStaffValue: any;
  showOtpComponent = true;
  varificationCode: any;
  staffValue: any;
  erroMessage: any;
  errorMessage: any;
  constructor(
    private service: ApiServiceService,
    private router: Router,
    private tostr: ToastrService,
    private forrmBuilder: FormBuilder,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit() {
    this.addStaffForm = this.forrmBuilder.group({
      firstName: [
        "",
        Validators.compose([
          Validators.required,
          Validators.maxLength(255),
          Validators.pattern(/^[a-z]+(?:['_.\s][a-z]+)*$/i),
        ]),
      ],
      middleName: [
        "",
        Validators.compose([
          Validators.maxLength(255),
          Validators.pattern(/^[a-z]+(?:['_.\s][a-z]+)*$/i),
        ]),
      ],
      lastName: [
        "",
        Validators.compose([
          Validators.required,
          Validators.maxLength(255),
          Validators.pattern(/^[a-z]+(?:['_.\s][a-z]+)*$/i),
        ]),
      ],
      number: ["", Validators.required],
      email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.maxLength(255),
          Validators.pattern(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/
          ),
        ]),
      ],
      role: ["", Validators.required],
      gender: ["", Validators.required],
    });
    this.phoneCheckCountry();
    this.getRole();
  }

  phoneCheckCountry() {
    $("#phoneNumber").intlTelInput({
      autoPlaceholder: false,
      autoFormat: false,
      autoHideDialCode: false,
      initialCountry: "th", //in for india
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
  // ///////////Select role/////////////
  onSelect(value) {
    this.selectRole = value;
  }

  // /////////////Role Api////////////
  getRole() {
    this.service.getApi("api/role", 1).subscribe((res) => {
      if (res.status == 200) {
        let data = res.body.data.map((role) => {
          return { name: role.name, id: role._id };
        });
        this.manageStaffroles = data;
      }
    });
  }

  // //////////Add Staff Api/////////
  addStaff() {
    this.spinner.show();
    let object = {
      first_name: this.addStaffForm.value.firstName,
      middle_name: this.addStaffForm.value.middleName,
      last_name: this.addStaffForm.value.lastName,
      country_code: this.myCode,
      mobile: this.addStaffForm.value.number,
      email: this.addStaffForm.value.email,
      role: this.selectRole,
      gender: this.addStaffForm.value.gender,
      //  "url"           : "http://172.16.6.245:4200/forgot-password"
      url: this.service.websiteUrls + "forgot-password",
    };
    this.service.postApi("api/staff", object, 1).subscribe(
      (res) => {
        if (res.status == 200) {
          this.spinner.hide();
          this.tostr.success(res.body.message);
          this.router.navigate(["manage-staff"]);
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

  // to check space

  // --------------------------------allow only numbe input-----------------------//
  isNumber(evt) {
    evt = evt ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  // ----------------------    -------------------//

  // ----------------Router Link---------------------------------//
  generate(value) {
    this.staffValue = value;
    if (this.staffValue == "addStaff") {
      this.addStaff();
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
    this.spinner.show();
    let data = {
      code: this.varificationCode,
    };
    this.service
      .postApi("api/google-auth-step-verification", data, 1)
      .subscribe(
        (res) => {
          if (res.status == 200) {
            this.spinner.hide();

            this.onConfigChange();
            this.addStaff();
            $("#googleauth").modal("hide");
          }
        },
        (err) => {
          if (err.status == 403 || err.status == 401) {
            this.spinner.hide();

            this.onConfigChange();
            this.service.logout();
          } else if (err.status == 400) {
            this.spinner.hide();

            this.onConfigChange();
            this.errorMessage = err.error.message;
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
