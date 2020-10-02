import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from '../services/excel.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any;

@Component({
  selector: 'app-coupon-management',
  templateUrl: './coupon-management.component.html',
  styleUrls: ['./coupon-management.component.css']
})
export class CouponManagementComponent implements OnInit {
  cousins_list: any = [];
  limit: any = 10;
  page = 1;

  showOtpComponent = true;
  varificationCode: any;
  cusin_id: any;
  errorMessage: any;
  exports: any;
  todayDate: any = new Date();
  toMaxDate: any = new Date();
  newDate: any;
  formDate: any;
  disables: boolean = false;



  constructor(private service: ApiServiceService, private tostr: ToastrService, private excelService: ExcelService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getcousins()
  }
  getcousins() {
    this.spinner.show()
    this.service.getApi('api/getallcoupon', 1).subscribe((res) => {
      debugger
      if (res.body.status == 200) {
        this.spinner.hide()
        this.cousins_list = res.body.data
        console.log('cuisines==>>', this.cousins_list)
      } else{
        this.spinner.hide()
        this.tostr.error(res.body.text)
      }

    })
  }

  
  dateconvert(data) {
    return new Date(data);
  }

  enddateconvert(data) {
    return new Date(data);
  }

  createdateconvert(data) {
    return new Date(data);
  }

  // -------------------- date validation ---------------------------------- //
  getDate(event) {
    if (event) {
      this.formDate = event;
      this.disables=true
    }
    else {
      this.newDate = ''
    }
  }
  fromMaxDate(event) {
    if (event) {
      this.todayDate = new Date(event)
      this.disables=true
    }
    else {
      this.todayDate = new Date()
    }
  }

  searchcuisineName(searchcuisineName){
    console.log('cuisine name',searchcuisineName);
  }

  unblock(event,id){
   console.log('event',event);
   
  }


  selectStatus(event){
  console.log('event', event);
  
  }

  pagination(page) {
    this.page = page
    this.getcousins()
  }
  exportAsXLSX(): void {
    this.service.getApi(`api/cuisines?pagination=false`,1).subscribe(res=>{
      if(res.status == 200 ){
        this.exports=res.body
        console.log('exports',this.exports)
        let dataArr = [];

        this.exports.forEach((element => {
          let d=new Date(element.created_at);
          let creation=`${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
          new Date(element.updated_at);
          let creations=`${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
          dataArr.push({
            "ID	": element.id ? element.id : '--',
            "Cusine Name": element.name ? element.name : '--',
            "Status": element.is_active==true ?'Active': 'Inactive',
            "Created At": element.created_at ? creation : '--',
            "Updated At": element.created_at ? creations : '--',
            "Created By": element.created_by ? element.created_by.first_name : '--'
    
    
    
          })
        }))
        this.excelService.exportAsExcelFile(dataArr, 'Cusine List');

      }
    })
  


  }
  index :any
  // -------------------------Driver Delete Api-----------------------//
  deletefunction(id,index) {
    debugger
    this.cusin_id = id
    this.index = index
    console.log('cusin_id', this.cusin_id)
    $('#exampleModal2').modal({ backdrop: 'static', keyboard: false })
    // $('#comanModal').modal('hide')
  }

  
  deleteStaff() {
    $('#exampleModal2').modal('hide');
    let object :any = {
       _id: this.cusin_id
    }
    debugger
    this.service.postApi("api/deletecoupon/", object, 4).subscribe(
      (res) => {
        if (res.body.status == 200) {
          this.cousins_list.splice(this.index,1)
          this.tostr.success("Coupon deleted successfully.");
        }
      },
    );
  }
  // ----------------------Close modal -----------------------------//
  modal() {
    $('#comanModal').modal('hide')
    $('#googleauth').modal({ backdrop: 'static', keyboard: false })

  }

  // -----------------------Google Authentication -------------------//
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

  verify() {
    // this.deleteCuisin()
    let data = {

      "code": this.varificationCode

    }

    this.service.postApi('api/google-auth-step-verification', data, 1).subscribe((res) => {

      if (res.status == 200) {

        this.onConfigChange()
        this.deleteCuisin()
        this.getcousins()

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


      }

    })

  }
reset(){
  this.errorMessage='';
  this.onConfigChange()
}
  // ---------------------Delete Driver------------------------//

  deleteCuisin() {

    this.service.delete('api/cuisines/',this.cusin_id, 1).subscribe(res => {
      if (res.status == 204) {
        this.getcousins()
        // this.deletedata=res
        this.service.showSuccess("Cuisine deleted successfully")
        
      }
    }, err => {
      if (err.status == 403 || err.status == 401) {
        this.service.logout();
      }
      else if (err.status == 400) {
        this.service.toastErr(err.error.message)
        // this.tostr.error(err.error.message)
      }
    })
  }

  numberOnly(event): boolean {

    const charCode = (event.which) ? event.which : event.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57)) {

      return false;

    }

    return true;

  }

}
