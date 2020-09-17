import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any;
@Component({
  selector: 'app-edit-faq',
  templateUrl: './edit-faq.component.html',
  styleUrls: ['./edit-faq.component.css']
})
export class EditFaqComponent implements OnInit {

  cusine_id: any;
  topicform : FormGroup;
  cusinedata: any;
  language: any;
  cusine_ids: any;
  topicList: any;
  topic: any;
  topicShare: any;
  topicArray=[];
  topic_id: any;
  topicRetriwe: any;
  topicShares: any[];
  topicTranclateRe: any;
  faqTranclateRe: any;
  isDisabled : boolean;
  thai_id: any;
  varificationCode: any;
  showOtpComponent=true;
  faqValue: string;
  errorMessage: string;
  constructor(private service:ApiServiceService,private router:Router,private tostr:ToastrService,private fb:FormBuilder,private activateRouter:ActivatedRoute,private spinner:NgxSpinnerService) { }

  ngOnInit() {
      this.activateRouter.params.subscribe(res=>{
        this.topic_id=res.id
        this.thai_id=res.thai_id
      this.language=res.language
      console.log('language',this.language)
      this.topicform = this.fb.group({
        question  : ['',Validators.compose([Validators.required, Validators.maxLength(256)])],
        topic     : ['',Validators.required],
        answer     : ['',Validators.required]
       
      });
    })
    this.isDisabled=true;
    if(this.language =='th'){
      this.getfaqTranslate()
      this.getShare()
      this.getTopicTranclate()
      this.getTopicRe()
    }else {
      this.getTopicList()
      this.getShares()
      this.getTopicRes()
    } 
  }

  // ----------------------Get Retriwe id--------------//
  getTopicRe(){
    this.spinner.show()
   
    this.service.getApi(`content/faq/${this.topic_id}`,1).subscribe(res=>{
    
      if(res.status==200){
        this.spinner.hide()
        this.topicRetriwe=res.body
        // this.topicShares=res.body.share_with
        this.topicArray=res.body.share_with

        // this.topicform.patchValue({
        //   'topic'      :   this.topicRetriwe.topic,
        //   'question'      :   this.topicRetriwe.question,
        //   'answer'      :   this.topicRetriwe.answer
        // })
        console.log('topicArray==>>',this.topicArray)
       
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




  getTopicRes(){
    this.spinner.show()
   
    this.service.getApi(`content/faq/${this.topic_id}`,1).subscribe(res=>{
    
      if(res.status==200){
        this.spinner.hide()
        this.topicRetriwe=res.body
        // this.topicShares=res.body.share_with
        this.topicArray=res.body.share_with

        this.topicform.patchValue({
          'topic'      :   this.topicRetriwe.topic,
          'question'      :   this.topicRetriwe.question,
          'answer'      :   this.topicRetriwe.answer
        })
        console.log('topicRetriwe==>>',this.topicRetriwe)
       
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
  // ----------------------Get topic Api-----------------//

 
    getTopicList(){
      this.spinner.show()
   
      this.service.getApi(`content/topics-list`,1).subscribe(res=>{
      
        if(res.status==200){
          this.spinner.hide()
          this.topicList=res.body
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

  // --------------------selectTopic --------------------//
  selectTopic(val){
    // this.topicform.value.userType;
    // let ind=this.topicArray.findIndex(x=>x==Number(val));
    // if(ind>-1){
    //   this.topicArray.splice(ind,1);
    // }
    // else{
    //   this.topic=val
    //   this.topicArray.push(Number(this.topic))  
    // }
    // // this.topic=val
    // // this.topicArray.push(Number(this.topic))
    // console.log('topicArray==>>',this.topicArray)

    let ind=this.topicArray.findIndex(x=>x==Number(val));
    if(ind>-1){
      this.topicArray.splice(ind,1);
    }else{
      this.topic=val
      this.topicArray.push(Number(this.topic))
    }
    console.log('topicArray==>>',this.topicArray)
  }

  // -----------------------Get api share with-----------//

  getShare(){
    this.spinner.show()
 
    this.service.getApi(`content/share-with`,1).subscribe(res=>{
    
      if(res.status==200){
        this.spinner.hide()
        this.topicShare=res.body
        console.log('dffsfdsfdsfdsfsfds==>>',this.topicShare)
       
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
  
  
  // -----------------------Get api share with-----------//

  getShares(){
    this.spinner.show()
 
    this.service.getApi(`content/share-with`,1).subscribe(res=>{
    
      if(res.status==200){
        this.spinner.hide()
        this.topicShare=res.body
       
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


  // -----------------------Add Faq----------------------//

  updateFaq(){
    this.spinner.show()
    let object={
      "question"  : this.topicform.value.question,
      "answer"    : this.topicform.value.answer,
      "topic"     : this.topicform.value.topic,
      "share_with": this.topicArray,
      "language"  : "en"
    }
    this.service.putApi(`content/faq/${this.topic_id}`,object,1).subscribe(res=>{
      if(res.status == 200){
        this.spinner.hide()
        this.service.showSuccess(res.body.message)
        this.router.navigate(['manage-faq'])
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



  // --------------------Get Topic Trancelate-----------------//

  getfaqTranslate(){
    this.spinner.show()
    
    this.service.getApi('content/faq-translate/'+this.topic_id,1).subscribe(res=>{
    
      if(res.status==200){
        this.spinner.hide()
        this.faqTranclateRe=res.body
        this.topicform.patchValue({
          'topic'         :   this.thai_id,
          'question'      :   this.faqTranclateRe.question,
          'answer'        :   this.faqTranclateRe.answer
        })
        // this.getTopicRe()
       
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
        this.service.toastErr(err.error.message)
      }
    })
  }


  // --------------------Get topic Translate------------------//

  getTopicTranclate(){
    this.spinner.show()
    
    this.service.getApi('content/topics-translate',1).subscribe(res=>{
    
      if(res.status==200){
        this.spinner.hide()
        this.topicList=res.body
       
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


  // -------------------Update translate Faq Api-----------------------//

  updateTranslateApi(){
    let object={
        "question"  : this.topicform.value.question,
        "answer"    : this.topicform.value.answer,
        "faq"       : Number(this.topic_id),
        "topic"     : Number(this.thai_id),
        "language"  : this.language
      }
      this.service.postApi('content/faq-translate',object,1).subscribe(res=>{
        if(res.status == 200){
          this.spinner.hide()
          this.service.showSuccess(res.body.message)
          this.router.navigate(['manage-faq'])
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

  update(){
    if(this.language == 'th'){
      this.updateTranslateApi()
    }else{
      this.updateFaq()
    }
  }

    // ----------------Router Link---------------------------------//
    generate(value){
      this.faqValue=value
      if(this.faqValue=='faq'){
        $('#googleauth').modal({ backdrop: 'static', keyboard: false })
    
      }
    
    }
    
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
    // modal(){
    //   $('#comanModal').modal('hide')
    //   $('#googleauth').modal({ backdrop: 'static', keyboard: false })
    // }
    
    verify(){
      this.spinner.show()
      let data = {
        "code": this.varificationCode
      }
      this.service.postApi('api/google-auth-step-verification',data,1).subscribe((res)=>{
        if(res.status == 200){
          this.spinner.hide()
  
          if(this.faqValue == 'faq'){
            this.onConfigChange()
            this.update()
            }
          // this.addcusine()
         $('#googleauth').modal('hide')
      
    
        }
       
      } ,err=>{
       if(err.status == 403 || err.status == 401){
        this.spinner.hide()
         this.onConfigChange()
         this.service.logout();
       }
       else if (err.status == 400){
        this.spinner.hide()
         this.onConfigChange()
         this.errorMessage=err.error.message
       }else if(err.status == 500){
        this.spinner.hide()
         this.service.toastErr('Internal server error.')
       }
     })
    }
    reset(){
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
