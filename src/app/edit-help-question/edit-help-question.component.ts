import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any;
@Component({
  selector: 'app-edit-help-question',
  templateUrl: './edit-help-question.component.html',
  styleUrls: ['./edit-help-question.component.css']
})
export class EditHelpQuestionComponent implements OnInit {

  cusine_id: any;
  helpform : FormGroup;
  cusinedata: any;
  language='en';
  cusine_ids: any;
  topicList: any;
  topic: any;
  topicShare: any;
  topicArray=[];
  isDisabled : boolean;
  object: any;
  help_id: any;
  helpRe: any;
  errorMessage: any;
  varificationCode: any;
  showOtpComponent=true;
  faqValue: any;
  shareWith: any;
  constructor(private service:ApiServiceService,private router:Router,private tostr:ToastrService,private fb:FormBuilder,private activateRouter:ActivatedRoute,private spinner:NgxSpinnerService) { 
    this.getAllapis()
  }

  ngOnInit() {
 
    
    
  }

  getAllapis(){
    this.isDisabled=true;
    this.activateRouter.params.subscribe(res=>{
    this.help_id=res.id
    this.language=res.language
    this.helpform = this.fb.group({
      question  : ['',Validators.compose([Validators.required, Validators.maxLength(255)])],
      share_with :[''],
      help_support     : [false],
      answer     : ['',Validators.required],
      general_issue     : [false],
     
      // userType    : ['',Validators.required]
     
    });
  })
  if(this.language =='th'){
    this.getHelptranclate()
  }else{
    this.getHelp()
  }
 
  }

  // ----------------------Get HELP Api-----------------//

 getHelp(){
   this.service.getApi('content/help-question/'+this.help_id,1).subscribe(res=>{
      
        if(res.status == 200){
          this.helpRe=res.body
          this.helpform.patchValue({
            'question'  : this.helpRe.question,
            'answer'  : this.helpRe.answer,
            'share_with'  : this.helpRe.share_with,
            'help_support'  : this.helpRe.help_support,
            'general_issue'  : this.helpRe.general_issue,
          })
          console.log('getHelp==>>',res)
        }
   })
 }


  // --------------------selectTopic --------------------//
  selectTopic(val){
    let ind=this.topicArray.findIndex(x=>x==Number(val));
    if(ind>-1){
      this.topicArray.splice(ind,1);
    }else{
      this.topic=val
      this.topicArray.push(Number(this.topic))
    }
    console.log('topicArray==>>',this.topicArray)
  }
  // -----------------------Add Faq----------------------//

  updateHelp(){
    this.spinner.show()
    if(this.helpform.value.share_with == 'Customer'){
    this.object={
    "question": this.helpform.value.question,
    "answer": this.helpform.value.answer,
    "share_with":this.helpform.value.share_with,
    "help_support": this.helpform.value.help_support,
    "general_issue": this.helpform.value.general_issue,
    "language": "en"
    }
  } else {
    this.object={
      "question": this.helpform.value.question,
      "answer": this.helpform.value.answer,
      "share_with":this.helpform.value.share_with,
      "help_support": this.helpform.value.help_support,
      "general_issue": this.helpform.value.general_issue,
      "language": "en"
      }
  }
    console.log('object==>>',this.object)  
    this.service.putApi(`content/help-question/${this.help_id}`,this.object,1).subscribe(res=>{
      if(res.status == 200){
        this.spinner.hide()
        this.service.showSuccess(res.body.message)
        this.router.navigate(['help-question']) 
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


  getHelptranclate(){
    this.service.getApi('content/hq-translate/'+this.help_id,1).subscribe(res=>{
      
      if(res.status == 200){
        this.helpRe=res.body
        this.shareWith=res.body
   
        console.log('shareWith',this.shareWith)

        this.helpform.patchValue({
          'question'  : this.helpRe.question,
          'answer'  : this.helpRe.answer,
          'share_with'  : this.helpRe.help_question,
          'help_support'  : this.helpRe.help_support,
          'general_issue'  : this.helpRe.general_issue,
        })
        console.log('getHelptttttt==>>',res)
      }
 })
  }


  helptranclate(){
    let object={
      "language"      : this.language,
      "question"      : this.helpform.value.question,
      "answer"        :  this.helpform.value.answer,
      "help_question" : this.help_id,
    }
    console.log('helptranclateObject',object)
    this.service.postApi('content/hq-translate',object,1).subscribe(res=>{
      if(res.status == 200){
        this.spinner.hide()
        this.service.showSuccess(res.body.message)
        this.router.navigate(['help-question']) 
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
        this.helptranclate()
    }else {
        this.updateHelp()
    }
  }

     // ----------------Router Link---------------------------------//
     generate(value){
      this.faqValue=value
      if(this.faqValue=='help'){
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
  
          if(this.faqValue == 'help'){
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
