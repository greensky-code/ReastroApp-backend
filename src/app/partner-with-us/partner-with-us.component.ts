import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-partner-with-us',
  templateUrl: './partner-with-us.component.html',
  styleUrls: ['./partner-with-us.component.css']
})
export class PartnerWithUsComponent implements OnInit {


  parrtnerRestaurantPage: any;

  constructor(private service: ApiServiceService, private router: Router, private fb: FormBuilder, private activateRouter: ActivatedRoute, private spinner: NgxSpinnerService) { }


  ngOnInit() {

// -------------Mater method-------------------------------//
this.getMasterApi()
  }

// ---------------------Get Mater Api----------------------//

getMasterApi(){

  this.service.getApi('master/master-management',1).subscribe(res=>{

    console.log('master',res)
    if(res.status == 200 ){

      this.parrtnerRestaurantPage=res.body.partner_with_us_page
      // this.updateAt=this.openRestaurantPage.

      console.log('parrtnerRestaurantPage',this.parrtnerRestaurantPage)

      // this.service.showSuccess(res.body.message)
    }
  })
}

}
