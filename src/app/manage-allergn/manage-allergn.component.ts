import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from '../services/excel.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $
@Component({
  selector: 'app-manage-allergn',
  templateUrl: './manage-allergn.component.html',
  styleUrls: ['./manage-allergn.component.css']
})
export class ManageAllergnComponent implements OnInit {
  varificationCode = '';
  deletedata: any;
  status: string;
  delete_id: any;
  showOtpComponent = true;
  allergan_list: any = [];
  total: Number;
  page = 1;
  limit: Number
  errorMessage: any;
  exports: any;
  constructor(private service: ApiServiceService, private tostr: ToastrService, private excelService: ExcelService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getallergen(1)
  }
  getallergen(page) {
    this.spinner.show()
    this.service.getApi('merchant/allergans?page=' + page, 1).subscribe((res) => {
      if (res.status == 200) {
        this.spinner.hide()
        this.allergan_list = res.body.results
        this.total = res.body.count
        this.page = page;
        this.limit = 10
      }

    }, err => {
      this.spinner.hide()
      if (err.status == 500) {
        this.spinner.hide()
        this.service.toastErr('Internal Server Error')
      }

    })
  }
  exportAsXLSX(): void {
    this.service.getApi(`merchant/allergans?pagination=false`,1).subscribe(res=>{
      if(res.status == 200 ){

        this.exports=res.body
        console.log('exportsd',this.exports)
        let dataArr = [];
        this.exports.forEach((element => {
          let d=new Date(element.created_at);
          let creation=`${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
          dataArr.push({
            "Allergen": element.allergan_name ? element.allergan_name : '--',
            "Ingredients": element.ingredients ? element.ingredients : '--',
            "Created At": element.created_at ? creation: '--',
            "Created By": element.created_by ? element.created_by : '--',
    
    
          })
        }))
        this.excelService.exportAsExcelFile(dataArr, 'Allergen List');

      }})
   

  }

  deleteFunction(id) {
    this.delete_id = id
    console.log('deleteFunctions_id', this.delete_id)
    this.status = 'delete'
    $('#exampleModal2').modal({ backdrop: 'static', keyboard: false })
  }
  deleteFunctions() {
    // this.spinner.show()

    this.service.delete('merchant/allergans/', this.delete_id, 1).subscribe(res => {
      if (res.status == 200) {
        this.spinner.hide()
        this.deletedata = res
        this.tostr.success(res.body.message)
        // this.getallergen(this.delete_id)
        this.getallergen(1)
      }
    }, err => {
      this.spinner.hide()
      if (err.status == 403 || err.status == 401) {
        this.spinner.hide()
        this.service.logout();
      }
      else if (err.status == 400) {
        this.spinner.hide()
        this.tostr.error(err.error.message)
      }
    })
  }

  // ------------------------  modal show and hide------------------------ //
  modal() {
    if (this.status == 'block') {
      $('#blockmodal').modal('hide')
      $('#googleauth').modal({ backdrop: 'static', keyboard: false })
    }
    else if (this.status == 'unblock') {
      $('#unblockmodal').modal('hide')
      $('#googleauth').modal({ backdrop: 'static', keyboard: false })

    }
    else if (this.status == 'delete') {
      $('#exampleModal2').modal('hide')
      $('#googleauth').modal({ backdrop: 'static', keyboard: false })
    }
  }
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
    this.spinner.show()
    let data = {
      "code": this.varificationCode
    }
    // this.onConfigChange()
    this.service.postApi('api/google-auth-step-verification', data, 1).subscribe((res) => {

      if (res.status == 200) {
        this.spinner.hide()

        this.onConfigChange()

        if (this.status == "block") {
          this.onConfigChange()

        }
        else if (this.status == "unblock") {
          this.onConfigChange()
        }
        else if (this.status = "delete") {
          this.onConfigChange()


          this.deleteFunctions()

        }


        $('#googleauth').modal('hide')

      }
    }, err => {
      if (err.status == 403 || err.status == 401) {
        this.spinner.hide()

        this.service.logout();
        this.onConfigChange()
        this.service.toastErr(err.message)
      }
      else if (err.status == 400) {
        this.spinner.hide()

        this.onConfigChange()
        this.errorMessage=err.error.message
      }
    })
  }
  reset(){
    this.errorMessage='';
    this.onConfigChange()
  }


  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }


}
