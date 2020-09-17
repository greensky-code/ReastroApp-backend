import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-legal-term',
  templateUrl: './legal-term.component.html',
  styleUrls: ['./legal-term.component.css']
})
export class LegalTermComponent implements OnInit {

  staticContent: any;
  privacy: any;
  user: any=[];
  terms: any=[];
  privacy_policy: any;
  privacy_policy_id: any;
  refund_id: any;
  about_us_id: any;
  availability_information: any;
  terms_user: any;
  terms_users: any;
  terms_user_id: any;
  merchant_id: any;
  driver_id: any;
  provacy_id: any;
  aboutUs_id: any;
  availability_id: any;
  constructor(private service:ApiServiceService,private spiner:NgxSpinnerService) { }

  ngOnInit() {
    this.getLegalTerms()
  }

  getLegalTerms() {
    this.spiner.show()
    this.service.getApi('content/legal-terms-and-condition', 1).subscribe((res) => {
      if (res.status == 200) {
        this.spiner.hide()
        this.terms_users=res.body
        this.terms_user_id=res.body.term_user.en_id
        this.merchant_id=res.body.term_merchant.en_id
        this.driver_id=res.body.term_driver.en_id
        this.provacy_id=res.body.privacy.en_id
        this.refund_id=res.body.cancel_refund.en_id
        this.aboutUs_id=res.body.about_us.en_id
        this.availability_id=res.body.availability_information.en_id

        console.log('uuuser_id',this.terms_user_id)
 

        // this.privacy_policy_id=this.staticContent.privacy_policy.id
        // this.refund_id=this.staticContent.cancellation_and_refund.id
        // this.about_us_id=this.staticContent.about_us.id
        // this.availability_information=this.staticContent.availability_information.id
        // console.log('staticContent==>>',this.staticContent)
        // this.terms = res.body.terms
        // this.privacy=res.body.privacy_policy
        this.user = this.terms.filter(x => x.for_user).map(x => x.for_user)
      }
    },err=>{
      if(err.status == 500){
        this.spiner.hide()
        this.service.toastErr('Internal server error.')
      }
     
    })
  }
  


}
