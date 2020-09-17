import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-website-home-page',
  templateUrl: './website-home-page.component.html',
  styleUrls: ['./website-home-page.component.css']
})
export class WebsiteHomePageComponent implements OnInit {
  homePagedata: any;

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

      this.homePagedata=res.body.home_page

      console.log('homePagedata',this.homePagedata)

      // this.service.showSuccess(res.body.message) 
    }
  })
}
}
