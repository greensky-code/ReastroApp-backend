import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reply-ticket',
  templateUrl: './reply-ticket.component.html',
  styleUrls: ['./reply-ticket.component.css']
})
export class ReplyTicketComponent implements OnInit {
  addStaffForm:FormGroup ;
  constructor() { }

  ngOnInit() {
    this.formValiadtion()
  }

  formValiadtion(){
    this.addStaffForm= new FormGroup({
      
    })
  }

}
