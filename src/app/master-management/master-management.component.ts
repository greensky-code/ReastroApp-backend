import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-master-management',
  templateUrl: './master-management.component.html',
  styleUrls: ['./master-management.component.css']
})
export class MasterManagementComponent implements OnInit {
  master: any;

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


      this.master=res.body
      console.log('master',this.master)
      // this.service.showSuccess(res.body.message)
    }
  })
}

}
