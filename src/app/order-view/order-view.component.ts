import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {
  orderItems: any=[];
  viewOrder: any;
  id: any;
  order_status: any;

  constructor(public activatedRoute: ActivatedRoute,private service: ApiServiceService) { 
    this.activatedRoute.params.subscribe((res) => {
      this.id = res.id
      this.order_status=res.value
    })
  }

  ngOnInit() {
    this.getOrder();
  }

  getOrder() {
    this.service.getApi('api/orders/' + this.id, 1).subscribe((res) => {
      if(res.status == 200){
        this.viewOrder=res.body
        this.orderItems=this.viewOrder.order_items
      }
    })
  }

}
