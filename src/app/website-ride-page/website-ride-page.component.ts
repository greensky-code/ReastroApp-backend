import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-website-ride-page',
  templateUrl: './website-ride-page.component.html',
  styleUrls: ['./website-ride-page.component.css']
})
export class WebsiteRidePageComponent implements OnInit {

  websiteRidPage: any;

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

      this.websiteRidPage=res.body.ride_with_us_page
      // this.updateAt=this.openRestaurantPage.

      console.log('websiteRidPage',this.websiteRidPage)

      // this.service.showSuccess(res.body.message)
    }
  })
}

}
