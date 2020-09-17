import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-view-allergan',
  templateUrl: './view-allergan.component.html',
  styleUrls: ['./view-allergan.component.css']
})
export class ViewAllerganComponent implements OnInit {

  ingredients: any;
  allergan_name: any;
  allergan_id: any;
  constructor(private activateRouter:ActivatedRoute,private service: ApiServiceService) { }

  ngOnInit() {
    this.activateRouter.params.subscribe(res=>{
      this.allergan_id=res.id 
    })
    this.viewAllergan()
  }

  viewAllergan(){
    this.service.getApi('merchant/allergans/'+this.allergan_id,1).subscribe((res)=>{
      if(res.status == 200){
        this.allergan_name= res.body.allergan_name
        this.ingredients=res.body.ingredients
      }
    })
  }

}
