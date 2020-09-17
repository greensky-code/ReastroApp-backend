import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-open-restaurant-page',
  templateUrl: './open-restaurant-page.component.html',
  styleUrls: ['./open-restaurant-page.component.css']
})
export class OpenRestaurantPageComponent implements OnInit {


  openRestaurantPage: any;

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

      this.openRestaurantPage=res.body.restaurant_page
      // this.updateAt=this.openRestaurantPage.

      console.log('openRestaurantPage',this.openRestaurantPage)

      // this.service.showSuccess(res.body.message)
    }
  })
}
}
