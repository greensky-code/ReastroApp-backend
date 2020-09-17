import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any;
@Component({
  selector: 'app-edit-topic',
  templateUrl: './edit-topic.component.html',
  styleUrls: ['./edit-topic.component.css']
})
export class EditTopicComponent implements OnInit {

  cusine_id: any;
  topicform : FormGroup;
  cusinedata: any;
  language: any;
  cusine_ids: any;
  topic_ids: any;
  topic: any;
  topicTranclate: any;
  errorMessage: any;
  showOtpComponent=true;
  topicValue: any;
  varificationCode: any;
  constructor(private service:ApiServiceService,private router:Router,private tostr:ToastrService,private fb:FormBuilder,private activateRouter:ActivatedRoute,private spinner:NgxSpinnerService) { }

  ngOnInit() {
      this.activateRouter.params.subscribe(res=>{
      this.topic_ids=res.id
      this.language=res.language
      // this.getCusinesData(); 
      this.topicform = this.fb.group({
        topic  : ['',Validators.compose([Validators.required, Validators.maxLength(256)])],
        // desc     : ['',Validators.required] 
       
      });
    })
    if(this.language == 'th'){
      this.getTopicTranclate()
    }else{
      this.getTopic()
    }
   
    
  }

  getTopic(){
    this.service.getApi('content/topics/'+this.topic_ids,1).subscribe(res=>{
      if(res.status == 200){
        this.topic=res.body
        this.topicform.patchValue({
          'topic' : this.topic.name
        })
        console.log('res==>>',this.topic)
      }
    },err=>{
      if(err.status == 500){
        this.spinner.hide()
       this.service.toastErr('Internal server error.')
      }else if(err.status == 400){
        this.spinner.hide()
        this.service.toastErr(err.message)
      }else if(err.status == 403 || err.status == 401){
        this.spinner.hide()
        this.service.logout()
        this.service.toastErr(err.message)
      }
    })
   
  }

  update(){
    if(this.language == 'th'){
      this.updateTranclate()
    }else{
      this.updateTopic()
    }
  }


  updateTopic(){
    let object={
      "name": this.topicform.value.topic,
      "language":"en"
    }
    this.service.putApi('content/topics/'+this.topic_ids,object,1).subscribe(res=>{
      if(res.status == 200){
        this.service.showSuccess(res.body.message)
        this.router.navigate(['topic-management'])
      }
    },err=>{
     
      
      // if(err.status == 500){
      //   this.spinner.hide()
      //  this.service.toastErr('Internal server error.')
      // }else if(err.status == 400){
      //   this.spinner.hide()
      //   this.service.toastErr(err.error.message)
      // }else if(err.status == 403 || err.status == 401){
      //   this.spinner.hide()
      //   this.service.logout()
      //   this.service.toastErr(err.message)
      // }
    })
  }



  getTopicTranclate(){
    this.service.getApi(`content/topics-translate/${this.topic_ids}`,1).subscribe(res=>{
      if(res.status == 200){
        this.topicTranclate=res.body
        this.topicform.patchValue({
          'topic' : this.topicTranclate.name
        })
        // console.log('resTranclate==>>',this.topicTranclate)
      }
    },err=>{
      if(err.status == 500){
        this.spinner.hide()
       this.service.toastErr('Internal server error.')
      }else if(err.status == 400){
        this.spinner.hide()
        this.service.toastErr(err.message)
      }else if(err.status == 403 || err.status == 401){
        this.spinner.hide()
        this.service.logout()
        this.service.toastErr(err.message)
      }
    })
  }

  updateTranclate(){
    this.spinner.show()
    // setTimeout(function(){
    //   this.spinner.hide()
    // },1000);
    let object={
      "tras_topics":this.topic_ids,
      "name": this.topicform.value.topic,
      "language": this.language
  }
      this.service.postApi('content/topics-translate',object,1).subscribe(res=>{
        if(res.status == 200){
          this.spinner.hide()
          this.service.showSuccess(res.body.message)
          this.router.navigate(['topic-management'])
        }
      },err=>{
        console.log('errorTopicthai',err)
        if(err.status == 500){
          this.spinner.hide()
         this.service.toastErr('Internal server error.')
        }else if(err.status == 400){
          this.spinner.hide()
          this.service.toastErr(err.error.message)
        }else if(err.status == 403 || err.status == 401){
          this.spinner.hide()
          this.service.logout()
          this.service.toastErr(err.message)
        }
      })
  }


   // ----------------Router Link---------------------------------//
   generate(value){
    this.topicValue=value
    if(this.topicValue=='topic'){
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

        if(this.topicValue == 'topic'){
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

