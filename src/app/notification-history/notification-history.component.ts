import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-history',
  templateUrl: './notification-history.component.html',
  styleUrls: ['./notification-history.component.css']
})
export class NotificationHistoryComponent implements OnInit {
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
