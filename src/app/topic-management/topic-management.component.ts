import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { ApiServiceService } from '../api-service.service';
declare var $:any;
@Component({
  selector: 'app-topic-management',
  templateUrl: './topic-management.component.html',
  styleUrls: ['./topic-management.component.css']
})
export class TopicManagementComponent implements OnInit {
  topicList: any=[];
  searchByTopic='';
  topicStatus='';
  page=1;
  pageSize=1;
  url: string;
  total: any;
  limit: number;
  topicDelete_id: any;
  showOtpComponent = true;
  varificationCode: any;
  is_active: any;
  value: any;
  status: any;
  errorMessage: any;
  
  disabled=false

  constructor(private router:Router, private service:ApiServiceService, private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.getTopicList(1)
  }

  

    getTopicList(page){
      this.spinner.show()
      this.page=page
      this.service.getApi(`content/topics?page=${this.page}&is_active=${this.topicStatus}&search=${this.searchByTopic}`,1).subscribe(res=>{
      
        if(res.status==200){
          this.spinner.hide()
          this.topicList=res.body.results
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


    enterKey(){
      // console.log('searchByTopic',this.searchByTopic)

   
    if(this.searchByTopic!=''){

      this.disabled=true

    }else if(this.searchByTopic==''){

      this.disabled=false

    }
    }

    changeStatus(){
      // console.log('topicStatus',this.topicStatus)
      if(this.topicStatus!=''){

        this.disabled=true
  
      }else if(this.topicStatus==''){
  
        this.disabled=false
  
      }
    }

    searcntopics(){
      this.spinner.show()
      if(this.searchByTopic && this.topicStatus) {
        this.url=`content/topics?is_active=${this.topicStatus}&search=${this.searchByTopic}`
      }else
      // console.log("page==>>",this.page)
      if(this.searchByTopic){
        this.url =`content/topics?search=${this.searchByTopic}`
      }else if(this.topicStatus){
        this.url=`content/topics?is_active=${this.topicStatus}`
      }
      this.service.getApi(this.url,1).subscribe(res=>{
        if(res.status==200){
          this.spinner.hide()
          this.topicList=res.body.results
         
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

    reset(){
      this.searchByTopic='';
      this.topicStatus='';
      this.disabled=false
      this.getTopicList(1)
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

      deleteTopic(id,is_active){
        // this.value=val
        console.log('value==>>',this.value)
        this.topicDelete_id=id
        this.is_active=is_active
        // console.log('topicDelete_id==>>',this.topicDelete_id)
        console.log('is_active==>>',this.is_active)
       
        if(this.is_active == false){
          this.status=true
          console.log('status_true==>>',this.status)
          $('#unpublis').modal({ backdrop: 'static', keyboard: false })
        }else if(this.is_active == true){
          this.status=false
          console.log('status_False==>>',this.status)
          $('#publish').modal({ backdrop: 'static', keyboard: false })
        } else{
          $('#deleteFaq').modal({ backdrop: 'static', keyboard: false })
        }
      }
    
      // -----------------------------Un-publish--------------------------//
      // unpublish(){
      //   $('#unpublis').modal({backdrop:'static',keyboard:false})
      // }

  deletemodal(val){

    if(val=='unpublis'){
      $('#unpublis').modal('hide')
      $('#googleauth').modal({ backdrop: 'static', keyboard: false })
    }else if(val=='publish'){
      $('#publish').modal('hide')
      $('#googleauth').modal({ backdrop: 'static', keyboard: false })
    }else{
        $('#deleteFaq').modal('hide')
        $('#googleauth').modal({ backdrop: 'static', keyboard: false })
    }

    // $('#deleteFaq').modal('hide')
    // $('#unpublis').modal('hide')
    // $('#googleauth').modal({ backdrop: 'static', keyboard: false })

  }

  deleteFunction(){
    this.service.delete('content/topics/',this.topicDelete_id,1).subscribe(res=>{
      console.log('delete==>>',res)
      if(res.status == 204){
        this.service.showSuccess('Topic deleted successfully.')
        this.getTopicList(1)
      }
    },err=>{
      if(err.status == 403 || err.status == 401){
        this.onConfigChange()
        this.service.logout();
      }
      else if (err.status == 400){
        this.onConfigChange()
        this.service.toastErr(err.error.message)
      } else if(err.status == 500){
        this.service.toastErr('Internal server error.')
      }
    })

  }
  unPublish(){
    let object={
      "id": this.topicDelete_id,
      "status": this.status
    }
    this.service.postApi('content/topics-publish-unpublish',object,1).subscribe(res=>{
      if(res.status == 200){
        this.getTopicList(1)
        this.service.showSuccess(res.body.message)
      }
    },err=>{
      if(err.status == 403 || err.status == 401){
        this.onConfigChange()
        this.service.logout();
      }
      else if (err.status == 400){
        this.onConfigChange()
       //  this.tostr.error(err.error.message)
      } else if(err.status == 500){
        this.service.toastErr('Internal server error.')
      }
    })
  }

 

  verify(){
    this.spinner.show()
    let data = {
      "code": this.varificationCode
    }
    this.service.postApi('api/google-auth-step-verification',data,1).subscribe((res)=>{
      if(res.status == 200){
        this.spinner.hide()

        this.onConfigChange()
        if(this.is_active == true || this.is_active == false){
         this.unPublish()
        }else{

          this.deleteFunction()
        }
        $('#googleauth').modal('hide')
     
      }
     
    } ,err=>{

      if(err.status == 403 || err.status == 401){
        this.spinner.hide()
        $('#googleauth').modal('hide')
        this.onConfigChange()
        this.service.logout();
      }
      else if (err.status == 400){
        this.spinner.hide()
        this.onConfigChange()
        this.errorMessage=err.error.message
      } else if(err.status == 500){
        this.spinner.hide()
        $('#googleauth').modal('hide')
        this.service.toastErr('Internal server error.')
      }
      this.spinner.hide()
      // $('#googleauth').modal('hide')
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

}
