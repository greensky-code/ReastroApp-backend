import { Component, OnInit } from '@angular/core';
declare var $:any
@Component({
  selector: 'app-ticket-management',
  templateUrl: './ticket-management.component.html',
  styleUrls: ['./ticket-management.component.css']
})
export class TicketManagementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ticket(){
    $('#ticket').modal('show')
  }

  reason(){
    $('#ticket').modal('hide')
    
  }

}
