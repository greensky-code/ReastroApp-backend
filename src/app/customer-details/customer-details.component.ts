import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';
declare var $ :any;
@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  selectedTab = '1a';
  retriveCustomer_id: any;
  retriveCustomerData: any;
  order_history: any;
  saved_addresses: any;
  order_data: any;
  chat_data: any;
  chat_list: any=[];
  chat_historydata: any;
  order_items: any;
  message_sender: any;
  customeraddress: any=[];
  order_id: any;
  constructor(private service:ApiServiceService,private router:Router, private activateRouter:ActivatedRoute, private toastr : ToastrService) { }

  ngOnInit() {
  this.activateRouter.params.subscribe((res)=>{
    this.retriveCustomer_id=res.id
  })
  this.retriveCustomerDetails()
  
  }
  makeActive(tab: string) {
    this.selectedTab = tab;
    if(this.selectedTab=='2a'){
      this.getSaveAddress()
     
    }
    else if(this.selectedTab=='3a'){
     
      this.chatlist();
    }
  }

  // /////////////////// RETRIEVE CUSTOMER API ///////////////
  retriveCustomerDetails(){
  this.service.getApi('customer/detail/'+this.retriveCustomer_id,1).subscribe(res=>{
    if(res.status==200){
  this.retriveCustomerData=res.body
  this.order_history=this.retriveCustomerData.order_history
     this.order_history.forEach(element => {
       let order_item = element.order_items
       order_item.forEach(element => {
        let order = element.cart_modifiers
        this.order_items = order.filter(x=>x.name).map(x=>x.name)
      });
     });
     
  // this.saved_addresses =this.retriveCustomerData.saved_addresses
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
// ///////////////////chat list of custome with resturnament ///////////////
chatlist(){
  this.service.getApi('chat/chat-list/'+this.retriveCustomer_id , 1).subscribe(res=>{
    if(res.status == 200){
      this.chat_list = res.body
       this.chat_data = res.body.receiver_detail
    }
  })
}
viewOrderdata(id){
  $('#exampleModalCenter').modal({ backdrop: 'static', keyboard: false })
  this.service.getApi('customer/order/' +id , 1).subscribe((res)=>{
    this.order_data = res.body;
  })
}
chathistory(id){
  this.order_id=id
  $('#exampleModalCenter').modal({ backdrop: 'static', keyboard: false })
// this.service.getApi('chat/chat-history/'+this.retriveCustomer_id +"/"+id  ,1).subscribe((res)=>{
  this.service.getApi(`chat/chat-history/${this.retriveCustomer_id}/${this.order_id}`,1).subscribe((res)=>{
  if(res.status == 200){
    this.chat_historydata = res.body.chatlist
    this.chat_historydata.forEach(element => {
      this.message_sender = element.message_sender
    });

   
  }
})
}



getSaveAddress(){
  this.service.getApi(`customer/admin/addresses/${this.retriveCustomer_id}`,1).subscribe(res=>{
        if(res.status==200){
          this.customeraddress=res.body.results
        }
  })

}


}
