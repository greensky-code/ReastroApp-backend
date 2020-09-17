import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
// import { ToastrManager } from 'ng6-toastr-notifications';
import {Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
declare var $:any;
// import * as socketIo from 'socket.io-client';
// import io from 'socket.io-client';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
// -----------Web Socket Url----------------//



@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  socket: any;
  spinner: any
  // baseUrl='http://182.74.213.163:8008/v1/'//ec2 base url
  baseUrl='http://ec2-13-250-224-209.ap-southeast-1.compute.amazonaws.com:8008/v1/' 

  websiteUrls="http://ec2-35-176-66-190.eu-west-2.compute.amazonaws.com:1637/" 
  
// SERVER_URL ="ws://182.74.213.163:8008/ws/support/sender/2681"

// rewrewrewrewrdsadasdasa



  constructor(private HttpClient:HttpClient,public toastr: ToastrService ,private router:Router) { }

  typeLogin:string;
    

  postApi(url, data, isHeader): Observable<any>  {
    if (isHeader == 1) {
    var httpOptions;
    httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization":"JWT "+JSON.parse(localStorage.getItem('token'))
      }),
      observe: 'response'
    }
  }else if (isHeader == 2) {
    var httpOptions;
    httpOptions = {
      headers: new HttpHeaders({
        "Authorization":"JWT "+JSON.parse(localStorage.getItem('token'))
      }),
      observe: 'response'
    }
  } else if(isHeader == 3){
    httpOptions = {
      headers:new HttpHeaders({
        "Content-Type": "multipart/form-data",
        "Authorization":"JWT "+JSON.parse(localStorage.getItem('token'))
      })
    }

  }
 else {
  var httpOptions;
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
    observe: 'response'
  }
}
      return this.HttpClient.post((this.baseUrl + url), data, httpOptions)
    
  }

  getApi(url,isHeader): Observable<any> {
  
    if (isHeader == 1) {
      var httpOptions;
      httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization":"JWT "+JSON.parse(localStorage.getItem('token'))
        }),
        observe: 'response'
      
        
      }
      // console.log("hjhjhjhj",JSON.parse(localStorage.getItem('token')));
    } else if (isHeader == 2) {
      var httpOptions;
      httpOptions = {
        headers: new HttpHeaders({
          "Authorization":"JWT "+JSON.parse(localStorage.getItem('token'))
        }),
        observe: 'response'
      }
    }
    else{
      var httpOptions;
      httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
        observe: 'response'
      }
    }
    return this.HttpClient.get((this.baseUrl + url), httpOptions)       
    
  }

delete(url,id:number,isHeader): Observable<any> {
  
  if (isHeader == 1) {
    
    var httpOptions;
    httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization":"JWT "+JSON.parse(localStorage.getItem('token'))
      }),
      observe: 'response'
      
    }
    // console.log("hjhjhjhj",JSON.parse(localStorage.getItem('token')));
  }
  else{
    var httpOptions;
    httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      observe: 'response'
    }
  }
  return this.HttpClient.delete((this.baseUrl + url+id), httpOptions)       
  }

  putApi(url,obj:any,isHeader): Observable<any> {
  
    if (isHeader == 1) {
      
      var httpOptions;
      httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Authorization":"JWT "+JSON.parse(localStorage.getItem('token'))
        }),
        observe: 'response'
      
        
      }
      // console.log("hjhjhjhj",JSON.parse(localStorage.getItem('token')));
    }else if (isHeader == 2) {
      var httpOptions;
      httpOptions = {
        headers: new HttpHeaders({
          "Authorization":"JWT "+JSON.parse(localStorage.getItem('token'))
        }),
        observe: 'response'
      }
    } 
    else{
      var httpOptions;
      httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          
        }),
        observe: 'response'
      }
    }
    return this.HttpClient.put(this.baseUrl+url,obj,httpOptions)       
    }

    preventSpace(event) {
      if ((event.charCode == 32 || event.charCode == 64) && !event.target.value) {
        event.preventDefault();
      } else {
        // console.log(event)
      }
      // console.log('event charCode check', event.charCode)
    }
    checkSpace(event) {
      if (event.keyCode == 32) {
        event.preventDefault();
      }
    }

    zeroKeydown(event){

      if((event.charCode == 48)&& !event.target.value){
        event.downZerokey();

      }else{
        console.log(event)
      }

    }
    

    showSuccess(msg,maxShown: any = '1') {
      this.toastr.success(msg);
    }

    toastErr(msg) {
      
  this.toastr.error(msg)
}
    spiners(){setTimeout(() => {
      this.spinner.hide();
      },5000);
      }


      // ------------------------logout function------------------------//
      logout(){
        this.router.navigate(['login'])
        this.getApi('api/logout',1).subscribe((data:any)=>{
          // console.log('datadata==>>',data)
        },err=>{
          console.log('logoutServiceError',err)
          if(err.status == 403){
            this.toastErr("Your new session is active from another device.")
           }else if(err.status == 401){
            this.toastr.error(err.error.Message)
           }
        
        })
      }
// ------------------------restrict special character-------------------//
omit_special_char(event)
{   
   var k;  
   k = event.charCode;  //         k = event.keyCode;  (Both can be used)
   return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
}

blockmodal(){
  $('#blockmodal').modal('hide')
  $('#googleauth').modal({ backdrop: 'static', keyboard: false })

 }


// ------------------------------WebSocket Implement --------------------//

businessArra:any=[
  {value:"Allmerchant",en:"All merchant with complete profile",th:"ผู้ค้าทั้งหมดที่มีประวัติสมบูรณ์", status:true},
  {value:"activeMerchant",en:"Not active merchant",th:"ไม่ใช่พ่อค้าที่ใช้งานอยู่",tatus:true},
  {value:"Top10business",en:"Top 10 business",th:"10 อันดับธุรกิจ",  status:true},
  {value:"BusinessSubscription",en:"Business subscription stopped",th:"การสมัครสมาชิกธุรกิจหยุดลง",status:true},
  {value:"LeastPerforming",en:"Least performing business",th:"ดำเนินธุรกิจอย่างน้อยที่สุด",status:true},
  {value:"businessComplants",en:"Business with most complants",th:"ธุรกิจที่มีผู้ร้องเรียนมากที่สุด",status:true},
  {value:"BusinesRrating",en:"Business with hight rating",th:"ธุรกิจที่มีคะแนนสูง", status:true},

] 
driverArray:any=[
  {value:"Alldriver",en:"All driver with complete profile",th:"ไดรเวอร์ทั้งหมดพร้อมโปรไฟล์ที่สมบูรณ์",status:true},
  {value:"Top10driver",en:"Top 10 driver",th:"10 อันดับนักขับ",status:true},
  {value:"Rateddriver",en:"Most rated driver",th:"ไดรเวอร์อันดับสูงสุด",status:true},
  {value:"Earningdrivers",en:"Most earning drivers",th:"ไดรเวอร์ที่สร้างรายได้มากที่สุด",status:true},
  {value:"DriversRating",en:"Drivers with low rating",th:"ไดรเวอร์ที่มีคะแนนต่ำ",status:true},
]
topteoArra=[
  {value:"Allcustomer",en:"All customer with complete profile",th:"ลูกค้าทั้งหมดที่มีโปรไฟล์ที่สมบูรณ์",  status:true},
  {value:"topTen",en:"Top 10 spending customer",th:"ลูกค้า 10 คนแรกที่ใช้จ่าย", status:true},
  {value:"activeMore",en:"Not active more than 1 month", th:"ไม่ใช้งานเกิน 1 เดือน ",status:true},
]
saleRepresentative:any=[
  {value:"Allsale ",en:"All sale representative with complete profile",th:"ตัวแทนขายทั้งหมดที่มีประวัติสมบูรณ์",  status:true},
  {value:"Top10sale",en:"Top 10 sale representative",th:"ตัวแทนขาย 10 อันดับแรก",  status:true},
  {value:"earningsale",en:"Most earning sale representative",th:"ตัวแทนขายที่มีรายได้มากที่สุด",  status:true},
]
}
