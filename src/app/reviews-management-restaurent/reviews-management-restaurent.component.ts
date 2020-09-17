import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from '../services/excel.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-reviews-management-restaurent',
  templateUrl: './reviews-management-restaurent.component.html',
  styleUrls: ['./reviews-management-restaurent.component.css']
})
export class ReviewsManagementRestaurentComponent implements OnInit {
  cousins_list: any = [];
  limit: any = 10;
  page = 1;
  tabView: any = 'restaurants';


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



    constructor(private service: ApiServiceService, private tostr: ToastrService, private router : Router,
    private excelService: ExcelService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getcousins()
  }
  getcousins() {
    this.spinner.show()
    this.service.getApi('api/cuisines', 1).subscribe((res) => {
      if (res.status == 200) {
        this.spinner.hide()
        this.cousins_list = res.body
        console.log('cuisines==>>', this.cousins_list)
      }

    },err=>{
      console.log('erroStaff',err)
      if(err.status == 403 || err.status == 401){
        
        this.spinner.hide()
        this.service.logout();
      } else if(err.status == 500){
        this.spinner.hide()
        this.service.toastErr(err.statusText)

      }
      
    })
  }

  // view tab (patient or plasma-donated-patient)
  viewTab(tab) {
    this.tabView = tab
    if(this.tabView == 'drivers'){
        this.router.navigate(['/reviews-management-driver'])
    }
    else{
      this.router.navigate(['/reviews-management-restaurent'])

    }
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

  // -------------------------Driver Delete Api-----------------------//
  openModal(id) {
    this.cusin_id = id
    console.log('cusin_id', this.cusin_id)
    // $('#comanModal').modal('hide')

    $('#comanModal').modal({ backdrop: 'static', keyboard: false })
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
