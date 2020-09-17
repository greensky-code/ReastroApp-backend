import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-delivery-charge',
  templateUrl: './delivery-charge.component.html',
  styleUrls: ['./delivery-charge.component.css']
})
export class DeliveryChargeComponent implements OnInit {
  fixCharge: any=[];
 

  constructor(private service:ApiServiceService,private router:Router, private spinner:NgxSpinnerService) {
    this.getAllcharges()
   }

  ngOnInit() {


  }

  getAllcharges(){
    this.service.getApi('api/delivery-charges',1).subscribe(res=>{
      if(res.status==200){
      this.fixCharge=res.body
      }
    })
  }



}
