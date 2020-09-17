import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-management',
  templateUrl: './notification-management.component.html',
  styleUrls: ['./notification-management.component.css']
})
export class NotificationManagementComponent implements OnInit {
  todayDate: any = new Date();
  toMaxDate: any = new Date();
  newDate: any;
  formDate: any;
  disables: boolean = false;


  constructor() { }

  ngOnInit() {
  }

   // -------------------- date validation ---------------------------------- //
   getDate(event) {
    if (event) {
      this.formDate = event;
      this.disables=true
    }
    else {
      this.newDate = ''
    }
  }
  fromMaxDate(event) {
    if (event) {
      this.todayDate = new Date(event)
      this.disables=true
    }
    else {
      this.todayDate = new Date()
    }
  }
}
