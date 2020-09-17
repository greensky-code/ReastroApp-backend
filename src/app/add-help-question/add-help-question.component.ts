import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any;
@Component({
  selector: 'app-add-help-question',
  templateUrl: './add-help-question.component.html',
  styleUrls: ['./add-help-question.component.css']
})
export class AddHelpQuestionComponent implements OnInit {


  helpform : FormGroup;
  language: any;
  cusine_ids: any;
  topicList: any;
  topic: any;
  topicShare: any;
  topicArray=[];
  isDisabled : boolean;
  object: any;
  varificationCode: any;
  showOtpComponent=true;
  helpeValue: any;
  errorMessage: any;
  constructor(private service:ApiServiceService,private router:Router,private tostr:ToastrService,private fb:FormBuilder,private activateRouter:ActivatedRoute,private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.isDisabled=true;
      this.activateRouter.params.subscribe(res=>{
      this.cusine_ids=res.id
      this.language=res.language
      this.helpform = this.fb.group({
        question  : ['',Validators.compose([Validators.required, Validators.maxLength(255)])],
        share_with :['',Validators.required],
        help_support     : [false,Validators.required],
        answer     : ['',Validators.required],
        general_issue     : [false,Validators.required],       
      });
    })
    this.getTopicList()
    this.getShare()
    
  }

  // ----------------------Get topic Api-----------------//

 
    getTopicList(){
      this.spinner.show()
      this.service.getApi(`content/topics-list`,1).subscribe(res=>{
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

  // --------------------selectTopic --------------------//
  selectTopic(val){
    let ind=this.topicArray.findIndex(x=>x==Number(val));
    if(ind>-1){
      this.topicArray.splice(ind,1);
    }else{
      this.topic=val
      this.topicArray.push(Number(this.topic))
    }
  }

  // -----------------------Get api share with-----------//

  getShare(){
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

  addFaq(){
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
    this.service.postApi('content/help-question',this.object,1).subscribe(res=>{
      if(res.status == 201){
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

    // ----------------Router Link---------------------------------//
    generate(value){
      this.helpeValue=value
      if(this.helpeValue=='help'){
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
  
          if(this.helpeValue == 'help'){
            this.onConfigChange()
            this.addFaq()
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
