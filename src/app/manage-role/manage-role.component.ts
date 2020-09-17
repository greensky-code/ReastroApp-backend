import { Component, OnInit, ɵConsole, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { element } from 'protractor';
import { ExcelService } from '../services/excel.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
declare var $:any;
@Component({
  selector: 'app-manage-role',
  templateUrl: './manage-role.component.html',
  styleUrls: ['./manage-role.component.css']
})
export class ManageRoleComponent implements OnInit {
  serachbyName: any;
  managerole: any;
  date: any;
  data: any;
  is_active: boolean = true;
  value: any;
  id: number;
  modal: any;
  loading: boolean;
  blockId: any;
  blockIdlist: any;
  unblockId: any;
  unblockIdlist: any;
  searchkey: any = '';
  manageroles: any=[];
  unblokData: any;
  searchRoleName: any;
  searchRole: any=[];
  total: any;
  page=1;
  limit: number;
  showOtpComponent = true;
  changeVarificationForm:FormGroup;
  qrcode: any;
  conformpassword: string;
  varificationCode: any;
  status: string;
  @ViewChild('ngOtpInput', { static: true }) ngOtpInput: any;
config = {
allowNumbersOnly: true,
length: 6,
isPasswordInput: true,
disableAutoFocus: true,
};
  addRole: any;
  Role_id: any;
  roleValue: any;
  exports: any=[];
  errorMessage: any;
  disabled=true
  // private spinner: NgxSpinnerService
  constructor(private router: Router, private service: ApiServiceService, private fb:FormBuilder, private tostr: ToastrService, private spinner :NgxSpinnerService,private excelService:ExcelService) { }

  ngOnInit() {
    this.disabled=true
    this.manageRole();
    this.changeVarificationForm=this.fb.group({
      'varification' : ["",Validators.compose([Validators.required])]
      })
  }

  // ######################### Search field value  ######################//
  searchRoles(value) {
    this.searchRoleName = value
    this.disabled=false
  }

  // ##################### Search Role ##################################//

  searchSubmit() {
    let seracname = this.searchRoleName
    this.service.getApi('api/role?search=' + seracname, 1).subscribe(res => {
      if (res.status == 200) {
        this.manageroles = res.body.results
        this.total = res.body.count;
      }

    })
  }

  // ####################### Reset Function ################//
  reset() {
    this.searchRole = '';
    this.disabled=true
    this.manageRole();
  }

  // ####################### ViewAllRecords ################//
  viewAllRecords() {
    this.manageRole();
  }

  // ###################### Manage Role Api#################//


  manageRole() {
    this.spinner.show()
    
    this.service.getApi(`api/role?page=${this.page}`,1).subscribe((res) => {
      if (res.status == 200) {
        this.spinner.hide()
        this.manageroles =res.body.results
        this.total=res.body.count
        this.limit=10
      }
    } ,err=>{

      if(err.status == 403 || err.status == 401){
        this.spinner.hide()
        this.service.toastErr(err.error.detail)
        this.service.logout();
      }
      else if (err.status == 400){
        this.spinner.hide()
        this.tostr.error(err.error.response_message)
      }else if(err.status == 500){
        this.spinner.hide()
        this.service.toastErr('Internal server error.')
      }
    })
  }

  pagination(page){
    this.page=page
    if (this.searchRoleName) {
      this.searchWithPagination();
    } else {
      this.manageRole();
    }
  }

  searchWithPagination() {
    this.service.getApi(`api/role?search=${this.searchRoleName}&page=${this.page}`, 1).subscribe(res => {
      if (res.status == 200) {
        this.manageroles = res.body.results
        // this.manageRole();
        this.total = res.body.count;
      }

    }, err=>{
      if(err.status == 403 || err.status == 401){
        this.service.logout();
      }
      else if (err.status == 400){
        this.tostr.error(err.error.response_message)
      }
    })
  }

  // //####################### Delete Api ###################//

  deleteid(id) {
 
    this.id = id;
    this.status = "delete"
    $('#exampleModal2').modal({ backdrop: 'static', keyboard: false })
  }

  deleteRole() {
   
    this.service.delete('api/role/', this.id, 1).subscribe((data: any) => {
      if (data.status == 200) {
        this.tostr.success(data.body.message)
        this.manageRole();
      }


    } ,err=>{
      if(err.status == 403 || err.status == 401){
        this.service.logout();
      }
      else if (err.status == 400){
        this.tostr.error(err.error.message)
      }
    })
  }



  // ########################## Block Api ######################//


  block(id, is_active) {
    this.is_active = is_active;
    this.blockId = id
    this.status = "block"
    $('#blockmodal').modal({ backdrop: 'static', keyboard: false })

  }

  blockFunction() {
    
    var request = {
      "role": [this.blockId]
    }
    this.service.postApi('api/block', request, 1).subscribe((data: any) => {
      if (data.status == 200) {
        this.tostr.success(data.body.message)
        // this.manageroles=
        this.manageRole();

      }

    } ,err=>{
      if(err.status == 403 || err.status == 401){
        this.service.logout();
      }
      else if (err.status == 400){
        this.tostr.error(err.error.message)
      }
    })
  }

  // hjegrhjgrjhwerhjewsas asdasdaddasdssa

  //   // ############################### Unblock Api #####################//


  unblock(id, is_active) {
    this.unblockId = id
    this.is_active = is_active;
    this.status = "unblock"
    $('#unblockmodal').modal({ backdrop: 'static', keyboard: false })
  }


  unblockFunction() {
    var requests = {
      "role": [this.unblockId]
    }
    this.service.putApi('api/block', requests, 1).subscribe((data: any) => {
      if (data.status == 200) {
        this.tostr.success(data.body.message)
        this.manageRole();
      }
      this.unblokData = data
      // this.spiners();

    } ,err=>{
      if(err.status == 403 || err.status == 401){
        this.service.logout();
      }
      else if (err.status == 400){
        this.tostr.error(err.error.message)
      }
    })
 

  }


////// Google auth ////////

// google auth
onOtpChange(value){
  this.varificationCode=value
 }

 onConfigChange() {
  this.showOtpComponent = false;
  this.varificationCode = null;
  setTimeout(() => {
    this.showOtpComponent = true;
  }, 0);
}
 verify(){
   let data = {
     "code": this.varificationCode
   }
   this.service.postApi('api/google-auth-step-verification',data,1).subscribe((res)=>{
     if(res.status == 200){
       this.onConfigChange()
       
      if(this.status == "block"){
        this.onConfigChange()

      
        this.blockFunction();
        
      }
      else if(this.status == "unblock"){
        this.onConfigChange()
      
        this.unblockFunction();
      }
      else if(this.status == "delete"){
        this.onConfigChange()
              
        this.deleteRole();

      }else if(this.addRole=='addRole'){
        this.router.navigate(['add-new-role']) 
        // this.router.navigate(['add-new-role']) 
      }else if(this.roleValue=='permission'){
        this.router.navigate(['role-permission',{id:this.Role_id}]) 
      }
      
      $('#googleauth').modal('hide')
   

     }
     else{
      this.onConfigChange()
       this.tostr.error()
     }
   } ,err=>{
    if(err.status == 403 || err.status == 401){
      this.onConfigChange()
      this.service.logout();
    }
    else if (err.status == 400){
      this.onConfigChange()
      this.errorMessage=err.error.message
      // this.tostr.error(err.error.message)
    }
  })
 }
 resets(){
  this.errorMessage='';
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
 blockmodals(){
   this.service.blockmodal()
 }
//  blockmodal(){
//   $('#blockmodal').modal('hide')
//   $('#googleauth').modal({ backdrop: 'static', keyboard: false })

//  }
 unblockmodal(){
  $('#unblockmodal').modal('hide')
  $('#comanModal').modal('hide')

  $('#googleauth').modal({ backdrop: 'static', keyboard: false })

 }
deletemodal(){
  $('#exampleModal2').modal('hide')
  $('#googleauth').modal({ backdrop: 'static', keyboard: false })

 }
 

export():void{
  this.service.getApi(`api/role?pagination=false`,1).subscribe(res=>{
    if(res.status == 200){
      this.exports=res.body
      console.log('export',this.exports)
      let dataArry=[];
      this.exports.forEach((element,ind)=>{
        let d=new Date(element.created_at);
        let creation=`${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
        dataArry.push({
         "Role ID"         : element.id?element.id:'--',
         "Role Name"       : element.name?element.name:'--',
         "Created By"      : element.created_by?element.created_by:'--',
         // "Created At"      :element.created_at?element.created_at.slice(0,10):'--', 
         "Created At"      :element.created_at && creation?creation:'--', 
         "Status"          : element.is_active==true?'Active':'Inactive',
        })
      })
      this.excelService.exportAsExcelFile(dataArry,'Manage Role Data');

    }
  })

}

// ----------------Router Link---------------------------------//
generate(value){
  this.roleValue=value
  if(this.Role_id=='addRole'){
    $('#comanModal').modal({ backdrop: 'static', keyboard: false })

  }

}
}
