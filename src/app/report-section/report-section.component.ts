import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelService } from '../services/excel.service';
import { typeofExpr } from '@angular/compiler/src/output/output_ast';
declare var $:any;
@Component({
  selector: 'app-report-section',
  templateUrl: './report-section.component.html',
  styleUrls: ['./report-section.component.css']
})
export class ReportSectionComponent implements OnInit {


  selectedTab: any;
  todayDate: any;
  formDate: any;
  newDate: any;
  driver = {
    search: '',
    status: '',
    fromDate: '',
    toDate: ''
  }
  toMaxDate: any = new Date();
  customer: any=[];
  total: any;
  page=1;
  limit: number;
  statusAc: any;
  url: string;
  searchCustomer: any;
  toptenSelect: any;
  topteoArra=[];
  status: any;
  arr=[]
  arrList: any=[];
  value: any;
  businessArra: any;
  customers: any=[];
  array: any=[];
  businessData: any=[];
  busineNames:any;
  submitReject:any;
  driverArray: any;
  driverData: any=[];
  driverName: any;
  driverkyc: any;
  saleData: any=[];
  salesName: any;
  saleRepresentative: any;
  language: string;

  constructor(public router: Router, public route: ActivatedRoute, public service: ApiServiceService , private toaster : ToastrService,private spinner:NgxSpinnerService,private excelService:ExcelService) {
 
    setInterval(() => {
      this.language=localStorage.getItem('language')
      // console.log('language==>>',this.language) 
      },50);
  }

  ngOnInit() {
      this.services()
      this.selectedTab='1a';
      this.customerDetail()
  }

  services(){
      this.topteoArra=this.service.topteoArra
      this.businessArra=this.service.businessArra
      this.driverArray=this.service.driverArray
      this.saleRepresentative=this.service.saleRepresentative
  }

  getDate(event) {
      if(event){
      this.formDate = event;
      }
      else {
        this.newDate = ''
      }
  }

  fromMaxDate(event){
      if(event){
      this.todayDate = new Date(event)
      }
      else{
      this.todayDate = new Date()
      }
  }


  makeActive(tab,value) {
      this.selectedTab = tab;
      
      if(this.selectedTab ==='3a'){
      this.url=`driver/detail?complete_profile=true`
      this.getDrivarReport()
      }else if(this.selectedTab ==='2a'){
        console.log('selectedTab',this.selectedTab)
      this.url=`merchant/detail?complete_profile=true`
      this.getBusinessReport()
      }
      else if(this.selectedTab=='4a'){
      this.url=`sales/admin/sale-get?complete_profile=true`
      this.salesRepresentative() 
      }
  }

  customerDetail(){
        this.spinner.show()
        this.service.getApi(`customer/detail?complete_profile=true`,1).subscribe((res=>{
        if(res.status==200){
        this.spinner.hide()
        this.customer=res.body.results   
        this.limit=10;
        this.total=res.body.count
        }
        }),err=>{
        if(err.status == 403 || err.status == 401){
        this.spinner.hide()
        this.service.logout();
        }
        else if (err.status == 400){
        this.spinner.hide()
        this.service.toastErr(err.error.message) 
        }else if(err.status == 500){
        this.spinner.hide()
        this.service.toastErr('Internal server error.') 
        }
        })
  }

  paginationCustomer(page){
      console.log('page',page)
      this.page=page
      this.customerDetail()
      }

  selectStatus(value,val){
      if(val=='activeStatus'){
      this.statusAc=value
      }else if (val=='statusSubmit'){
      this.submitReject=value
      this.url=`merchant/detail?status=${this.submitReject}`
      this.getBusinessReport()
      }else if(val=='driverKYC'){
      this.driverkyc=value
      this.url=`driver/detail?status=${this.driverkyc}`
      this.getDrivarReport()
      }
      }

  search(value,val){
      if(val=='customer'){
      this.searchCustomer=value
      console.log('searchCustomer',this.searchCustomer)
      }else if(val =='business'){
      this.busineNames=value
      console.log('busineNames',this.busineNames)
      } else if(val == 'driver'){
      this.driverName=value
      } else if(val == 'sale'){
     this.salesName=value
     console.log('salesName',this.salesName)
    }
    }
  reset(valu){
    console.log('valusvcbvbvcb==>>',valu)
    if(valu=='customer'){
    this.searchCustomer='';
    this.statusAc='';
    this. driver = {
      search: '',
      status: '',
      fromDate: '',
      toDate: ''
    }
    this.customerDetail()
    }
    else if(valu=='business'){
 
    this.submitReject='';
    this.busineNames='';
    this. driver = {
      search: '',
      status: '',
      fromDate: '',
      toDate: ''
    }
    }
    }
  
  topTen(value){
    console.log('value',value)
    this.toptenSelect=value
    if(value=='Allcustomer'){
    this.url=`customer/detail?complete_profile=true`
    this.customerDetail()
    }else if(value=='topTen'){
    this.url=`customer/detail?top_ten_spending=true`
    this.submit()
    }else if(value=='activeMore'){
    this.url=`customer/detail?last_login=true`
    this.submit()
    }else if(value =='BusinessSubscription'){
    this.url=`merchant/detail?sub_stopped=true`
    this.getBusinessReport()
    }
    else if(value =='Top10business'){
    this.url=`merchant/detail?performance=top`
    this.getBusinessReport()
    }else if(value == 'Allmerchant'){
      console.log('Allmerchant',value)
    this.url=`merchant/detail?complete_profile=true`
    this.getBusinessReport()
    }else if(value == 'LeastPerforming'){
    this.url=`merchant/detail?performance=true`
    this.getBusinessReport()
    }else if(value == 'businessComplants'){
    this.url=`merchant/detail?most_complaints=true`
    this.getBusinessReport()
    }else if(value == 'activeMerchant'){
    this.url=`merchant/detail?is_active=true`
    this.getBusinessReport()
    } else if(value == `BusinesRrating`){
    this.url=`merchant/detail?high_ratings=true`
    this.getBusinessReport()
    }else if(value == 'Alldriver'){
    this.url=`driver/detail?complete_profile=true`
    this.getDrivarReport()
    }else if(value == 'Top10driver'){
    this.url=`driver/detail?driver_top_ten=true` //driver top
    this.getDrivarReport()
    }else if(value == 'Rateddriver'){
    this.url=`driver/detail?driver_rating=top`
    this.getDrivarReport()
    }else if(value == 'Earningdrivers'){
    this.url=`driver/detail?driver_most_earning=true`
    }else if(value == 'DriversRating'){
    this.url=`driver/detail?driver_rating=least`
    this.getDrivarReport()
    }else if(value == 'Allsale'){
    this.url=`sales/admin/sale-get?complete_profile=true`
    this.salesRepresentative()
    }else if(value == 'Top10sale'){
    this.url=`sales/admin/sale-get?sale_top_ten=true`
    this.salesRepresentative()
    }else if(value == 'earningsale'){
    this.url=`sales/admin/sale-get?most_earnings=true`
    this.salesRepresentative()
    }
    }

  submit(){
    this.spinner.show()
    if(this.statusAc && this.searchCustomer && this.driver.fromDate && this.driver.toDate){
    this.url=`customer/detail?created_at_after=${this.driver.fromDate}&created_at_before=${this.driver.toDate}&is_active=${this.statusAc}&search=${this.searchCustomer}`
    }else
    if(this.statusAc){
    this.url=`customer/detail?is_active=${this.statusAc}`
    }else if(this.searchCustomer){
    this.url=`customer/detail?search=${this.searchCustomer}`
    } 
    else if(this.driver.fromDate && this.driver.toDate){
    this.url=`customer/detail?created_at_after=${this.driver.fromDate}&created_at_before=${this.driver.toDate}`
    }
    if(this.driver.fromDate=='' && this.driver.toDate){
      this.spinner.hide()
    this.service.toastErr('Please enter from date.')
    }else if(this.driver.fromDate && this.driver.toDate==''){
      this.spinner.hide()
    this.service.toastErr('Please enter to date.')
    }
  

    this.service.getApi(this.url,1).subscribe(res=>{
    if(res.status==200){
    this.spinner.hide()
    this.customer=res.body.results
    }
    }),err=>{
    if(err.status == 403 || err.status == 401){
    this.service.logout();
    this.spinner.hide()
    }
    else if (err.status == 400){
    this.spinner.hide()
    this.service.toastErr(err.error.message)
    }
    }
    
  }
  exportAsXLSX(value):void {
    if(value =='customer'){
    console.log('customer',value)
    let dataArr = [];
   
    this.customer.forEach((element,ind) => {
            dataArr.push({
            "S no":ind+1,
            "ID":element.id?element.id:'',
            "Customer Name":element.first_name?element.first_name:'N/A',
            // Businss: (element.business.business_name != null) ?element.business.business_name : '',
            "Customer Phone":element.mobile?element.mobile:'N/A',
            "Customer Email": element.email?element.email:'N/A',
            "Created At":element.created_at?element.created_at.slice(0,10):'N/A',
            "Status":element.is_active==true?'Active':'Inactive',
            "Last Order on":element.last_order_date?element.last_order_date:'N/A',
            "Last Order Amount":element.last_order_amount?element.last_order_amount:'N/A',
            })
            }) 
            this.excelService.exportAsExcelFile(dataArr,'Manage Merchant Data');
            }
  else if(value == 'business'){
    console.log('business',value)
    let businessArr = [];
   
    this.businessData.forEach((element,ind) => {
            businessArr.push({
            "S no":ind+1,
            "ID":element.id?element.id:'',
            "Business Name":element.business.business_name?element.business.business_name:'N/A',
            // Businss: (element.business.business_name != null)?element.business.business_name : '',
            "Phone":element.mobile?element.mobile:'N/A',
            "Email":element.email?element.email:'N/A',
            "Created By":element.created_by?element.created_by:'N/A', 
            "Status":element.is_active==true?'Active':'Inactive', 
            "Created At":element.business.created_at?element.business.created_at.slice(0,10):'N/A', 
            "KYC Status":element.kyc_status?element.kyc_status :'N/A',
            "KYC Submit Date":element.business.kyc.updated_at?element.business.kyc.updated_at.slice(0,10):'N/A', 
            "Approved By / Rejected By":element.business.kyc.kyc_updated_by?element.business.kyc.kyc_updated_by  :'N/A', 
            })
            }) 
            this.excelService.exportAsExcelFile(businessArr,'Business Data');
            }  else if(value == 'driver'){
    console.log('business',value)
 let driverArr = [];
   
    this.driverData.forEach((element,ind) => {
            driverArr.push({
            "S no":ind+1,
            "Driver Id":element.id?element.id:'',
            "Driver Name":element.driver.first_name?element.driver.first_name:'N/A',
            "Phone":element.driver.mobile?element.driver.mobile :'N/A',
            "Created At":element.created_at?element.created_at .slice(0,10):'N/A', 
            "Status":element.is_active==true?'Active':'Inactive', 
            "KYC Status":element.driver.driver_kyc.kyc_status?element.driver.driver_kyc.kyc_status  :'N/A',
            "KYC Submit Date":element.driver.driver_kyc.updated_at?element.driver.driver_kyc.updated_at.slice(0,10):'N/A', 
            "Approved By / Rejected By":element.driver.driver_kyc.kyc_updated_by?element.driver.driver_kyc.kyc_updated_by  :'N/A', 
            })
            }) 
            this.excelService.exportAsExcelFile(driverArr,'Driver Data');
            }
   else if(value == 'sale'){
    console.log('sale',value)
            let saleArr = [];
   
    this.saleData.forEach((element,ind) => {
            saleArr.push({
            "S no":ind+1,
            "ID":element.id?element.id:'',
            "Name":element.first_name ?element.first_name:'N/A',
            "Phone": element.mobile?element.mobile : '',
            "Email":element.email?element.email:'N/A',
            "Stataus":element.is_active==true?'Active':'Inactive',
            "Created At":element.created_at?element.created_at.slice(0,10):'N/A', 
            "Reference Code":element.reference_code?element.reference_code:'N/A', 
            "Total Reference":element.total_refrence?element.total_refrence:'0', 
            })
            }) 
            this.excelService.exportAsExcelFile(saleArr,'Sale Data');
            }
            }

// -----------------------------------Report Manage tab sectiondsfsfsdfsfdfdsfdfdsfsfdsf-------------------------//

getBusinessReport(){

  this.spinner.show() 
            if(this.busineNames && this.driver.fromDate && this.driver.toDate){
            this.url=`merchant/detail?created_at_after=${this.driver.fromDate}&created_at_before=${this.driver.toDate}&search=${this.busineNames}`
          
            }else
            if(this.busineNames){
            this.url=`merchant/detail?search=${this.busineNames}`
            } else if(this.driver.fromDate && this.driver.toDate){
            this.url=`merchant/detail?created_at_after=${this.driver.fromDate}&created_at_before=${this.driver.toDate}`
            } if(this.driver.fromDate=='' && this.driver.toDate){
              this.spinner.hide()
            this.service.toastErr('Please enter from date.')
            }else if(this.driver.fromDate && this.driver.toDate==''){
              this.spinner.hide()
            this.service.toastErr('Please enter to date.')
            }
           
            this.service.getApi(this.url,1).subscribe(res=>{
            if(res.status == 200){
            this.spinner.hide()
            this.businessData=res.body.results
            console.log('businessData',this.businessData)
            }
            },err=>{
            if(err.status == 500 ){
            this.spinner.hide()
            this.service.toastErr('Internal server error.')
            }else if(err.status == 403 || err.status == 401){
            this.spinner.hide()
            this.service.logout()
            this.service.toastErr(err.message)
            }else if(err.status == 400 ){
            this.spinner.hide()
            this.service.toastErr(err.message)
            }
            })
            }

// getBusinessReports(){
//             this.spinner.show()  
//             this.service.getApi(this.url,1).subscribe(res=>{
//             if(res.status == 200){
//             this.spinner.hide()
//             this.businessData=res.body.results
//             }
//             },err=>{
//             if(err.status == 500 ){
//             this.spinner.hide()
//             this.service.toastErr('Internal server error.')
//             }else if(err.status == 403 || err.status == 401){
//             this.spinner.hide()
//             this.service.logout()
//             this.service.toastErr(err.message)
//             }else if(err.status == 400 ){
//             this.spinner.hide()
//             this.service.toastErr(err.message)
//             }
//             })
//             }

// resets(){
//   console.log('dfdfdsfdsfdsfdsfds')
//   this.busineNames='';
//   this.submitReject='';
// }

// ----------------------------Driver Report Sections------------------------//

getDrivarReport(){ 
  this.spinner.show()  
            if(this.driverName && this.driver.fromDate && this.driver.toDate){
            this.url=`driver/detail?created_at_after=${this.driver.fromDate}&created_at_before=${this.driver.toDate}&search=${this.driverName}`
            }else
            if(this.driverName){
            this.url=`driver/detail?search=${this.driverName}`
            }  else if(this.driver.fromDate && this.driver.toDate){
            this.url=`driver/detail?created_at_after=${this.driver.fromDate}&created_at_before=${this.driver.toDate}`
            }
            if(this.driver.fromDate=='' && this.driver.toDate){
              this.spinner.hide()
            this.service.toastErr('Please enter from date.')
            }else if(this.driver.fromDate && this.driver.toDate==''){
              this.spinner.hide()
            this.service.toastErr('Please enter to date.')
            }

            console.log('driverName',this.driverName)
         
            this.service.getApi(this.url,1).subscribe(res=>{
            if(res.status == 200){
            this.spinner.hide()
            this.driverData=res.body.results
            console.log('driverData',this.driverData)
            }
            },err=>{
            if(err.status == 500 ){
            this.spinner.hide()
            this.service.toastErr('Internal server error.')
            }else if(err.status == 403 || err.status == 401){
            this.spinner.hide()
            this.service.logout()
            this.service.toastErr(err.message)
            }else if(err.status == 400 ){
            this.spinner.hide()
            this.service.toastErr(err.message)
            }
            })
}


// -----------------------------Sales Representative Report Section--------------------------------//

salesRepresentative(){
            this.spinner.show()
            if(this.salesName && this.driver.fromDate && this.driver.toDate){
            this.url=`sales/admin/sale-get?created_at_after=${this.driver.fromDate}&created_at_before=${this.driver.toDate}&search=${this.salesName}`
          
            }else
            if(this.salesName){
            this.url=`sales/admin/sale-get?search=${this.salesName}`
            } else if(this.driver.fromDate && this.driver.toDate){
            this.url=`sales/admin/sale-get?created_at_after=${this.driver.fromDate}&created_at_before=${this.driver.toDate}`
            }
            if(this.driver.fromDate=='' && this.driver.toDate){
              this.spinner.hide()
            this.service.toastErr('Please enter from date.')
            }else if(this.driver.fromDate && this.driver.toDate==''){
              this.spinner.hide()
            this.service.toastErr('Please enter to date.')
            }

            this.service.getApi(this.url,1).subscribe(res=>{
            if(res.status == 200){
            this.spinner.hide()
            this.saleData=res.body.results
            console.log('driverData',this.driverData)
            }
            },err=>{
            if(err.status == 500 ){
            this.spinner.hide()
            this.service.toastErr('Internal server error.')
            }else if(err.status == 403 || err.status == 401){
            this.spinner.hide()
            this.service.logout()
            this.service.toastErr(err.message)
            }else if(err.status == 400 ){
            this.spinner.hide()
            this.service.toastErr(err.message)
            }
            })
}
}
