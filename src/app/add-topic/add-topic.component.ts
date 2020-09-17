import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any;
@Component({
  selector: 'app-add-topic',
  templateUrl: './add-topic.component.html',
  styleUrls: ['./add-topic.component.css']
})
export class AddTopicComponent implements OnInit {
  topicForm : FormGroup;
  showOtpComponent=true;
  topicValue: any;
  varificationCode: any;
  errorMessage: any;
  constructor(private service:ApiServiceService,private router:Router,private tostr:ToastrService,private fb:FormBuilder,private activateRouter:ActivatedRoute,private spinner:NgxSpinnerService) { }

  ngOnInit() {
      this.topicForm = this.fb.group({
        topicName   : ['',Validators.compose([Validators.required, Validators.maxLength(256)])],
        // desc        : ['',Validators.required]       
      });  
  }

  addTopic(){
    this.spinner.show()
    let object={
      "name": this.topicForm.value.topicName,
      "language":"en"
    }
    this.service.postApi('content/topics',object,1).subscribe(res=>{
      if(res.status == 200){
        this.spinner.hide()
        this.service.showSuccess(res.body.message)
        this.router.navigate(['topic-management'])
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
        this.onConfigChange()
        this.addTopic()
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
