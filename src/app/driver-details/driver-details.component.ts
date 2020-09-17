import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any;

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.css']
})
export class DriverDetailsComponent implements OnInit {
  id: any;
  driverData: any;
  issueByCompanyForm: FormGroup;
  issueItemList: any;
  baseUrl= 'http://ec2-13-250-224-209.ap-southeast-1.compute.amazonaws.com:8009'
  selectedTab: any;
  passbookImage: any;
  passbookImages: any;
  showcontent: any = "view";
  bankDetail: any=[];
  page=1;
  totalBank: any;
  limit: number;
  orderHistorys: any=[];
  totalOrder: any;
  totalEarning: number;
  earningHistorys: any=[];
  earningData: any;
  orderDetails: any;
  totalOrders: any;
  order: any;

  show = false;
  buttonName = 'Show';
  hide: any;
  order_id: any;
  order_rating_review: any;
  driver_rating_review: any;
  orderStatus: any;
  driverImage: any;
  constructor(public router: Router, public route: ActivatedRoute, public service: ApiServiceService , private toaster : ToastrService,private spinner:NgxSpinnerService) {
    this.route.params.subscribe((res) => {
      this.id = res.id
    })
    this.getDriverDetail();
  }

  ngOnInit() {
    this.selectedTab='1a';
    
    // --------------------- section 1 'tab' issue by company form data validation --------------- //
    this.issueByCompanyForm = new FormGroup({
      shirt: new FormControl(''),
      rainJacket: new FormControl(''),
      helmet: new FormControl(''),
      umbrella: new FormControl(''),
      foodBox: new FormControl(''),
      companyPhone: new FormControl('')
    })
    this.getIssueByCompanyList();
    this.orderDetail();
    this.orderHistory()
  }

  // ------------------------- get specific driver details doc 6  /driver/detail/<driver id > --------------- //
  getDriverDetail() {
    this.service.getApi('driver/detail/' + this.id, 1).subscribe(res => {
      if (res.status == 200) {

        this.driverData = res.body
        this.driverImage=res.body.driver.selfi
       
      }
    },err=>{
      if(err.status == 403 || err.status == 401){
        this.service.logout();
      }
      else if (err.status == 400){
        this.toaster.error(err.error.message)
      }
    })
  }

  // -------------------------- get  issue by company all items list section 1 'tab'----------------------------------- //
  getIssueByCompanyList() {
    this.service.getApi('driver/issue-item-list', 1).subscribe(res => {
      if (res.status == 200) {
        this.issueItemList = res.body
        this.getIssuedItemForDriver();

      }
    },err=>{
      if(err.status == 403 || err.status == 401){
        this.service.logout();
      }
      else if (err.status == 400){
        this.toaster.error(err.error.message)
      }
    })
  }

  // get-issued-item
  // -------------------------- get  issued item for driver by company list section 1 'tab'----------------------------------- //
  getIssuedItemForDriver() {
    this.service.getApi('driver/get-issued-item/' + this.id, 1).subscribe(res => {
      if (res.status == 200) {
        let arr = res.body.data;
        
        this.issueItemList.forEach((element,index) => {
          arr.forEach(element2 => {
            if(element.id == element2.item_id) {
              this.issueItemList[index]['checked']= true;
            }
          });
        });
      }
    })
  }

  // -------------------------- Send issue by company form data section 1 'tab'----------------------------------- //
  issueByCompanyFormSubmit() {
    let arr = this.issueItemList.filter(x=>x.checked).map(x=>x.id) 
    let data = {
      items: arr,
      driver_id: this.id
    }
   
    this.service.postApi('driver/issue-item', data, 1).subscribe(res => {
      if (res.status == 200) {
        this.service.showSuccess(res.body.message)
      }
    })
  }

  // get check box value 
  onCheckboxChange(index) {
    this.issueItemList[index]['checked']= !this.issueItemList[index]['checked']
    
  }
  makeActive(tab,value) {
    this.selectedTab = tab;
    if(value==='bank'){
      this.bankDetails()
    }else if(value=='orderHistory'){
      // this.toggle(0)
      this.orderHistory()
    
    }else if(value==='earning'){
      this.earning()
    }

  }
  passbook(driverData){
    $('#passbook').modal({ backdrop: 'static', keyboard: false })
    this.passbookImages=driverData
    // this.passbookImage='http://ec2-13-250-224-209.ap-southeast-1.compute.amazonaws.com:8009'+this.passbookImages.data.passbook

  }
 

  // view orderdetails
  showviewdetails(val){
    switch(val){
     case 1 :
     this.showcontent = "view"
    
     break;
  
     case 2 :
       this.showcontent = "details"
  
       break;
    }
    // this.order=val


  }
 

  // -------------------------------Bank Details----------------------------//


  bankDetails(){
    this.spinner.show()
      this.service.getApi(`driver/admin/bank/${this.id}`,1).subscribe(res=>{
         if(res.status==200){
          this.spinner.hide()
           this.bankDetail=res.body.results
           this.totalBank=res.body.count
           this.limit=2
         }
      },err=>{
        this.spinner.hide()
      })
  }


  // -------------------------------Order History----------------------------//


  orderHistory(){
    this.spinner.show()
    this.toggle(0)
    this.service.getApi(`driver/admin/order/${this.id}`,1).subscribe(res=>{
       if(res.status==200){
        this.spinner.hide()
         this.orderHistorys=res.body.results
         this.totalOrder=res.body.count
         this.limit=2
       }
    },err=>{
      this.spinner.hide()
    })
}


 // -------------------------------Order History----------------------------//


 orderDetail(){
  this.spinner.show()
  this.service.getApi(`driver/admin/order-detail/${this.id}/${this.order_id}`,1).subscribe(res=>{
     if(res.status==200){
      this.spinner.hide()
       this.orderDetails=res.body
       this.totalOrders=res.body.count
       this.order_rating_review=this.orderDetails.order_rating_review
       this.driver_rating_review=this.orderDetails.driver_rating_review
      //  this.orderStatus=this.orderDetails.order_status


       this.limit=2
     }
  },err=>{
    this.spinner.hide()
  })
}


  // -------------------------------Earning----------------------------//


  earning(){
    this.spinner.show()
    this.service.getApi(`driver/admin-driver-earning/${this.id}`,1).subscribe(res=>{
       if(res.status==200){
        this.spinner.hide()
         this.earningData=res.body
         this.earningHistorys=res.body.data.payout_driver
         this.totalEarning=res.body.count
         this.limit=10
       }
    },err=>{
      this.spinner.hide()
    })
}

  nankDelpagination(page,value){
    this.page=page
    if(value==='bank'){
    this.page=page
    this.bankDetails()
    }else if(value==='order'){
      this.page=page
      this.bankDetails()
    }else if(value==='earning'){
      this.page=page
      this.earning()
    }


  }

  vechicleImage(value){
    if(value==='vechileImage'){
    $('#vechicleImage').modal({ backdrop: 'static', keyboard: false })
    }else if(value=='licenseImage'){
    $('#licenseImage').modal({ backdrop: 'static', keyboard: false })

    }else if(value=='insuranceImage'){
    $('#insuranceImage').modal({ backdrop: 'static', keyboard: false })

    }
  
  }

  toggle(id) {
    this.order_id=id
    this.orderDetail()
    this.show = !this.show
  
    if(this.show) {
    this.buttonName = 'Hide'
    this.hides()
    }
    else {
    this.buttonName = 'Show'
    }
    }

    hides(){
     
        this.buttonName = 'Hide'
      
  
    }
    
    
}
