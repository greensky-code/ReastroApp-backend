import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any;
@Component({
  selector: 'app-manage-news',
  templateUrl: './manage-news.component.html',
  styleUrls: ['./manage-news.component.css']
})
export class ManageNewsComponent implements OnInit {

  page=1;
  faqlist: any=[];
  total: any;
  limit: number;
  faqDelete_id: any; 
  showOtpComponent = true;
  varificationCode: any;
  searchByName='';
  topicList: any;
  selectTopic='';
  selectStatu='';
  selectStatus='';
  url: string;
  is_active: any;
  status: boolean;
  errorMessage: any;
  statusdelete: string;
  disabled=false;
  constructor(private service:ApiServiceService,private router:Router,private spinner:NgxSpinnerService) { }

  ngOnInit() {

    this.disabled==false;
    this.getFaqList(1)
   
  }


  // ------------------------Faq List Api----------------------------//

  getFaqList(page){
    this.spinner.show()
    this.page=page
    this.service.getApi(`content/news?page=${this.page}&is_active=${this.selectStatus}`,1).subscribe(res=>{
      if(res.status == 200){
        this.faqlist=res.body.results
        this.spinner.hide()
        console.log('faqList=>>>',this.faqlist)
        this.total=res.body.count
        this.limit=10
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

  selectTopics(value){
    this.selectTopic=value
    console.log('selectTopic',this.selectTopic)
    // this.submit()
  }
  selectStatuss(value){
    this.selectStatus=value
    if(this.selectStatus!=''){

      this.disabled=true

    }else if(this.selectStatus==''){

      this.disabled=false

    }
  }

  submit(){
    this.spinner.show()
    if(this.selectStatus && this.searchByName){
      this.url=`content/news?is_active=${this.selectStatus}&search=${this.searchByName}`
    }else if(this.searchByName){
      console.log('searchByName',this.searchByName)
      this.url=`content/news?search=${this.searchByName}`
    }else if(this.selectStatus){
      this.url=`content/news?is_active=${this.selectStatus}`
    }

    this.service.getApi(this.url,1).subscribe(res=>{
      if(res.status == 200){
        this.spinner.hide()
        this.faqlist=res.body.results
        console.log('topicListShare==>>',this.topicList)
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

  enterValue(){
    if(this.searchByName!=''){

      this.disabled=true

    }else if(this.searchByName==''){

      this.disabled=false

    }
  }

  reset(){
    this.searchByName='';
    this.selectTopic='';
    this.selectStatus='';
    this.disabled=false
    this.getFaqList(1)
  }


  // google auth
onOtpChange(value){
  this.varificationCode=value
  console.log('varificationCode==>>',this.varificationCode)
 }

 onConfigChange() {
  this.showOtpComponent = false;
  this.varificationCode = null;
  setTimeout(() => {
    this.showOtpComponent = true;
  }, 0);
}


  // -------------------------Delete Api------------------------------//

  deleteFaq(id){
    this.faqDelete_id=id
    this.statusdelete="Delete"
    $('#deleteFaq').modal({ backdrop: 'static', keyboard: false })
  }

  // -----------------------------Un-publish--------------------------//
  unpublish(id,is_active){
    this.faqDelete_id=id
    this.is_active=is_active  
    if(this.is_active==true){
      this.status=false
      $('#unpublis').modal({backdrop:'static',keyboard:false})
    }else if(this.is_active==false){
      this.status=true
      $('#unpublis').modal({backdrop:'static',keyboard:false})
    }
  }

  publishUnpublish(){
    let object={
      "id": this.faqDelete_id,
      "status": this.status
    }
    this.service.postApi('content/news-publish-unpublish',object,1).subscribe(res=>{
      if(res.status == 200){
        this.getFaqList(1)
        this.spinner.hide()
        this.service.showSuccess(res.body.message)
       
        // this.router.navigate(['manage-faq'])
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

  deletemodal(){
    $('#deleteFaq').modal('hide')
    $('#unpublis').modal('hide')
    $('#googleauth').modal({backdrop:'static',keyboard:false})
  }

  deleteFunction(){
    // this.spinner.show()
    this.service.delete('content/news/',this.faqDelete_id,1).subscribe(res=>{
      console.log('delete==>>',res)
      if(res.status == 204){

        this.getFaqList(1)
        this.spinner.hide()
        this.service.showSuccess(res.body.message)
        
        
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

  verify(){
    let data = {
      "code": this.varificationCode
    }
    this.service.postApi('api/google-auth-step-verification',data,1).subscribe((res)=>{
      if(res.status == 200){
        this.onConfigChange()
        // this.deleteFunction()
        if(this.is_active == true || this.is_active == false){

         this.publishUnpublish()
         this.getFaqList(1)
        }else if(this.statusdelete=="Delete"){
          this.deleteFunction()
          this.getFaqList(1)

        }
        $('#googleauth').modal('hide')
     
      }
     
    } ,err=>{
      if(err.status == 403 || err.status == 401){
        $('#googleauth').modal('hide')
        this.onConfigChange()
        this.service.logout();
      }
      else if (err.status == 400){
        this.onConfigChange()
        this.errorMessage=err.error.message
        // this.service.toastErr(err.error.message)
      } else if(err.status == 500){
        this.service.toastErr('Internal server error.')
      }
      // $('#googleauth').modal('hide')
    })
  }

  resets(){
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