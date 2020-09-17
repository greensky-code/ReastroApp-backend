import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-kyc',
  templateUrl: './view-kyc.component.html',
  styleUrls: ['./view-kyc.component.css']
})
export class ViewKycComponent implements OnInit {

  marchantdata: any;
  id: any;
  kycrejectForm: FormGroup;
  businessId: any;
  reason_list: any;
  reson: any=[];
  reValue: any;
  reasondata: any = [];

  constructor(private router: Router, 
    private service:ApiServiceService,public toastr: ToastrService,private spinner: NgxSpinnerService,public route: ActivatedRoute,private formBuilder:FormBuilder) { }

    ngOnInit() {
      this.route.params.subscribe((res)=>{
        this.id = res.id
      }) 
      this.getmarchantuserdetail()
      this.checkInputs()

    }
    resubmitkyc(){
      this.id
      
      this.router.navigate(['submit-kyc', this.id])
        
      
    }
    getmarchantuserdetail(){
      this.service.getApi('merchant/admin/view-kyc/'+this.id,1).subscribe(res=>{
      
        if(res.status==200){
    
     this.marchantdata=res.body
     console.log('viewMerchantdata',this.marchantdata)
    //  this.businessId= res.body.business.owner.business?res.body.business.owner.business:''
    this.businessId= res.body.id
       }
     },err=>{
      if(err.status == 403 || err.status == 401){
        this.service.logout();
      }
      else if (err.status == 400){
        this.toastr.error(err.error.message)
      }
    })
    }
  
  
  
    approveKyc(){
      this.spinner.show()
      this.service.getApi('merchant/approved/'+this.businessId,1).subscribe(res=>{
      
        if(res.status==200){
          this.spinner.hide()
          this.toastr.success("KYC approved sucessfully.")
        this.router.navigate(['/manage-merchant'])
       }
     },error=>{
       this.spinner.hide()
     })
    }
  
  
  
    checkInputs() {
      
    //   this.kycrejectForm = new FormGroup({
    //     reason: new FormControl('', [Validators.required,]),
    //     message: new FormControl('',[Validators.required,Validators.maxLength(256)])
    // })
    this.kycrejectForm=this.formBuilder.group({
      reason : ["",Validators.required],
      message :["",Validators.required]
    })
  }
  get reason(): any {
    return this.kycrejectForm.get('reason');
}

get message(): any {
    return this.kycrejectForm.get('message');
}

  
  // *****************Reject Kyc********************
  rejectKyc(){
    this.spinner.show()
    // this.reson=this.kycrejectForm.value.reason 
    for(let data of this.kycrejectForm.value.reason){
      this.reasondata.push(parseInt(data));

    }
    //  this.reasondata.push(parseInt(this.kycrejectForm.value.reason))
      let data={
        reasons: this.reasondata,
        remark:this.kycrejectForm.value.message
      }
      this.service.postApi('merchant/reject/'+this.businessId,data,1).subscribe(res=>{
        if(res.status==200){
          this.spinner.hide()
          this.toastr.success("KYC rejected sucessfully.")
        this.router.navigate(['/manage-merchant'])
     
       }
     },error=>{
       this.spinner.hide()
     })
    }
    getreason(){
  
      this.service.getApi('api/reasons-of-rejections',1).subscribe((res)=>{
        this.reason_list = res.body
      })
    }

}
