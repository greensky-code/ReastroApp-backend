import { Component, OnInit } from "@angular/core";
import { ApiServiceService } from "../api-service.service";
import { ToastrService } from "ngx-toastr";
import { RSA_NO_PADDING } from "constants";
import { registerLocaleData } from "@angular/common";
import { ExcelService } from "../services/excel.service";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { identifierModuleUrl } from "@angular/compiler";
declare var $: any;
@Component({
  selector: "app-manage-staff",
  templateUrl: "./manage-staff.component.html",
  styleUrls: ["./manage-staff.component.css"],
})
export class ManageStaffComponent implements OnInit {
  user = { kycRole: "" };
  page = 1;
  manageStaff: any = [];
  searchName = "";
  selectStatus: any;
  acountSales: any;
  todayDate: any;
  toMaxDate: any = new Date();
  newDate: any;
  total: any;
  limit: number = 10;
  url: string;
  manageStaffroles: any;
  block_id: any;
  unblock_id: any;
  blockdata: any;
  unblockdata: any;
  delete_id: any;
  deletedata: any;
  formDate: any;
  unblockId: any;
  is_active: any;
  blockId: any;
  unblokData: any;
  driver = {
    search: "",
    status: "",
    fromDate: "",
    toDate: "",
  };
  showOtpComponent = true;
  changeVarificationForm: FormGroup;
  qrcode: any;
  conformpassword: string;
  varificationCode = "";
  status: string;
  codeOtp: any;
  statusFilter: string;
  addStaff: any;
  staff_id: any;
  export: any = [];
  errorMessage: any;
  disables = false;
  staffRoles = "";

  constructor(
    private service: ApiServiceService,
    private tostr: ToastrService,
    private excelService: ExcelService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.disables = false;
    console.log("false", this.disables);
    this.manadeDetails(1);
    this.getRole();
  }

  manadeDetails(page) {
    this.page = page;
    this.spinner.show();
    this.service.getApi("api/staff", 1).subscribe(
      (res) => {
        if (res.status == 200) {
          this.spinner.hide();
          let data = res.body.data;
          let name = res.body.adminName;
          if (data)
            data = data.map((staff) => {
              staff.created_by = name;
              staff.updated_by = name;
              return staff;
            });
          this.manageStaff = data;
          this.total = res.body.count;
          // this.page=page
          this.limit = 10;
        }
      },
      (err) => {
        console.log("erroStaff", err);
        if (err.status == 403 || err.status == 401) {
          this.spinner.hide();
          this.service.logout();
        } else if (err.status == 500) {
          this.spinner.hide();
          this.service.toastErr(err.statusText);
        }
      }
    );
  }

  orderFilter(event) {
    this.staffRoles = event;
    // this.disables=true
    if (this.staffRoles != "") {
      this.disables = true;
    } else if (this.staffRoles == "") {
      this.disables = false;
    }
  }

  // ------------------- Google Authentication permission--------------//

  generate(value) {
    this.addStaff = value;
    if (this.addStaff == "editStaff") {
      $("#comanModal").modal({ backdrop: "static", keyboard: false });
    }
    //
  }

  ////////////////Date Method /////////////////////
  getDate(event) {
    if (event) {
      this.formDate = event;
      console.log("formDate", this.formDate);
      this.disables = true;
    } else {
      this.newDate = "";
    }
  }

  fromMaxDate(event) {
    if (event) {
      this.todayDate = new Date(event);
      console.log("todayDate===>>", this.todayDate);
      this.disables = true;
    } else {
      this.todayDate = new Date();
    }
  }

  // getDate(event) {
  //   if (event) {
  //     this.formDate = event;
  //     this.disables=true
  //   }
  //   else {
  //     this.newDate = ''

  //   }
  // }
  // fromMaxDate(event){
  //   if(event){
  //     this.todayDate = new Date(event)
  //     this.disables=true
  //   }
  //   else{
  //     this.todayDate = new Date()

  //   }
  // }

  // /api/staff?created_at_after=<yyyy-mm-dd>&created_at_before=<yyyy-mm-dd>
  getRole() {
    this.service.getApi("api/role", 1).subscribe((res) => {
      if (res.status == 200) {
        this.manageStaffroles = res.body;
      }
    });
  }

  // ////////// All Api /////////////
  submitdata() {
    this.disables = false;
    this.spinner.show();
    if (
      this.staffRoles &&
      this.user.kycRole &&
      this.driver.toDate &&
      this.driver.fromDate &&
      this.searchName
    ) {
      // this.url=`api/staff?is_active=${this.user.kycRole}&role=${this.staffRoles }&created_at_after=${this.driver.fromDate}&created_at_before=${this.driver.toDate}&search=${this.searchName}`
      this.url = `api/staff?&search=${this.searchName}&is_active=${this.user.kycRole}&role=${this.staffRoles}&created_at_after=${this.driver.fromDate}&created_at_before=${this.driver.toDate}`;
    } else if (this.searchName) {
      this.url = `api/staff?search=` + this.searchName;
    } else if (this.user.kycRole) {
      this.url = `api/staff?is_active=` + this.user.kycRole;
    } else if (this.staffRoles) {
      this.url = `api/staff?role=` + this.staffRoles;
    } else if (this.driver.fromDate && this.driver.toDate) {
      this.url =
        `api/staff?created_at_after=` +
        this.driver.fromDate +
        "&created_at_before=" +
        this.driver.toDate;
    }
    if (this.driver.fromDate == "" && this.driver.toDate) {
      this.spinner.hide();
      this.service.toastErr("Please enter from date.");
    } else if (this.driver.fromDate && this.driver.toDate == "") {
      this.spinner.hide();
      this.service.toastErr("Please enter to date.");
    }
    //  else{
    //    this.tostr.error('Please select from and to date.')
    //  }
    // fgdfgfdgdfg

    this.service.getApi(this.url, 1).subscribe(
      (res) => {
        if (res.status == 200) {
          this.spinner.hide();
          this.disables = true;
          this.manageStaff = res.body.results;
          console.log("manageStaff", this.manageStaff);
          this.total = res.body.count;
        }
      },
      (err) => {
        if (err.status == 403 || err.status == 401) {
          this.spinner.hide();
          this.disables = true;
          this.service.logout();
        } else if (err.status == 400) {
          this.spinner.hide();
          this.disables = true;
          this.tostr.error(err.error.response_message);
        }
        this.disables = true;
      }
    );
  }

  allRecords() {
    this.manadeDetails(1);
  }

  onSelect(value) {
    this.user.kycRole = value;
    // this.disables=true
    if (this.user.kycRole != "") {
      this.disables = true;
    } else if (this.user.kycRole == "") {
      this.disables = false;
    }
  }
  // ok(){
  //   console.log('active',this.user.kycRole)
  // }

  reset() {
    this.newDate = Date;
    this.formDate = "";
    this.searchName = "";

    this.newDate = Date;
    this.fromMaxDate(0);
    this.staffRoles = "";
    this.user.kycRole = "";
    this.driver.fromDate = "";
    this.driver.toDate = "";
    this.page = 1;

    this.disables = false;
    this.manadeDetails(1);
  }

  select(value) {
    this.searchName = value;
    console.log("searchNamesearchName==>", this.searchName);
    // this.disables=true

    if (this.searchName != "") {
      this.disables = true;
    } else if (this.searchName == "") {
      this.disables = false;
    }
  }
  // pagination(page){
  //   this.page=page
  //   if(this.searchName){
  //     this.paginationSearch()
  //   }
  //    if(this.user.kycRole){
  //     this.paginationSearch()
  //    }
  //    if(this.staffRoles){
  //     this.paginationSearch()
  //    }

  //    else{
  //     this.manadeDetails(1)
  //   }

  // }

  paginationSearch() {
    this.service
      .getApi(
        `api/staff?search=${this.searchName}&page=${this.page}` ||
          `api/staff?is_active=${this.user.kycRole}&page=${this.page}` ||
          `api/staff?role=${this.staffRoles}&page=${this.page}`,
        1
      )
      .subscribe((res) => {
        if (res.status == 200) {
          this.manageStaff = res.body.results;
          this.total = res.body.count;
        }
      });
  }

  // ########################## Block Api ##########//

  block(data, blockStatus) {
    let request = { ...data };
    request.is_active = !blockStatus;
    request.role = data.role[0]._id;
    this.service.putApi("api/staff/" + request._id, request, 1).subscribe(
      (data: any) => {
        if (data.status == 200) {
          this.tostr.success(data.body.message);
          // this.manageroles=
          this.manadeDetails(1);
        }
      },
      (err) => {
        if (err.status == 403 || err.status == 401) {
          this.service.logout();
        } else if (err.status == 400) {
          this.tostr.error(err.error.message);
        }
      }
    );
  }

  //   // ############################### Unblock Api #####################//

  unblock(id, is_active) {
    this.unblockId = id;
    this.is_active = is_active;
    this.status = "unblock";
    $("#unblockmodal").modal({ backdrop: "static", keyboard: false });
  }

  unblockFunction() {
    var requests = {
      staff: [this.unblockId],
    };
    this.service.putApi("api/block", requests, 1).subscribe(
      (data: any) => {
        if (data.status == 200) {
          this.tostr.success(data.body.message);
          this.manadeDetails(1);
        }
        this.unblokData = data;
        // this.spiners();
      },
      (err) => {
        if (err.status == 403 || err.status == 401) {
          this.service.logout();
        } else if (err.status == 400) {
          this.tostr.error(err.error.message);
        }
      }
    );
  }

  // ///////Delete Api /////////

  deleteFunction(id) {
    this.delete_id = id;
    this.status = "delete";
    console.log("DeleteStatus", this.status);
    this.deleteFunctions();
  }
  deleteFunctions() {
    this.service.delete("api/staff/", this.delete_id, 1).subscribe(
      (res) => {
        if (res.status == 200) {
          this.deletedata = res;
          this.tostr.success("Staff deleted successfully.");
          this.manadeDetails(1);
        }
      },
      (err) => {
        if (err.status == 403 || err.status == 401) {
          this.service.logout();
        } else if (err.status == 400) {
          this.tostr.error(err.error.message);
        }
      }
    );
  }
  // ------------------------  modal show and hide------------------------ //
  modal() {
    // console.log('dgasdghgdhgfhgsdghads')
    if (this.status == "block") {
      $("#blockmodal").modal("hide");
      $("#googleauth").modal({ backdrop: "static", keyboard: false });
    } else if (this.status == "unblock") {
      $("#unblockmodal").modal("hide");
      $("#googleauth").modal({ backdrop: "static", keyboard: false });
    } else if (this.status == "delete") {
      $("#exampleModal2").modal("hide");
      $("#googleauth").modal({ backdrop: "static", keyboard: false });
    } else if (this.staff_id == "addStaff") {
      $("#comanModal").modal("hide");
      $("#googleauth").modal({ backdrop: "static", keyboard: false });
    } else if (this.addStaff == "editStaff") {
      $("#comanModal").modal("hide");
      $("#googleauth").modal({ backdrop: "static", keyboard: false });
    }
  }

  //------------------------ Google auth -------------------------------//

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

            if (this.status == "block") {
              this.onConfigChange();
            } else if (this.status == "unblock") {
              this.onConfigChange();

              this.unblockFunction();
            } else if (this.status == "delete") {
              console.log("fhdsfgdsfgjhdsfghjfhjfjhfjhfjhdjs");
              this.onConfigChange();
              this.deleteFunctions();
            } else if (this.staff_id == "addStaff") {
              this.router.navigate(["add-staff"]);
            } else if (this.addStaff == "editStaff") {
              this.router.navigate(["edit-staff", { id: this.staff_id }]);
            }

            $("#googleauth").modal("hide");
          } else {
            this.onConfigChange();
            this.tostr.error();
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
            //  this.tostr.error(err.error.message)
          } else if (err.status == 500) {
            this.spinner.hide();

            this.onConfigChange();
            this.service.toastErr(err.statusText);
            //  this.tostr.error(err.error.message)
          }
          this.spinner.hide();
        }
      );
  }
  resets() {
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

  exportAsXLSX(): void {
    this.service.getApi(`api/staff?pagination=false`, 1).subscribe((res) => {
      if (res.status == 200) {
        this.export = res.body;
        console.log("exports", this.export);
        let dataArry = [];
        this.export.forEach((element, ind) => {
          let d = new Date(element.created_at);
          let creation = `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
          let ds = new Date(element.updated_at);
          let creations = `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
          dataArry.push({
            // Middle Name
            "Staff ID": element.id ? element.id : "--",
            "First Name": element.first_name ? element.first_name : "--",
            "Middle Name": element.middle_name ? element.middle_name : "--",
            "Last Name": element.last_name ? element.last_name : "--",
            Email: element.email ? element.email : "--",
            Phone: element.mobile ? element.mobile : "--",
            "Created By": element.created_by ? element.created_by : "--",
            "Created At": element.created_at && creation ? creation : "--",
            "Update At": element.created_at && creations ? creations : "--",
            "Update By": element.updated_by ? element.updated_by : "--",
            Role: element.role ? element.role : "--",
            Status: element.is_active == true ? "Active" : "Inactive",
          });
        });

        this.excelService.exportAsExcelFile(dataArry, "Manage Staff");
      }
    });
  }
}
