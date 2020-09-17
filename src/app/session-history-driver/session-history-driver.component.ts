import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-session-history-driver',
  templateUrl: './session-history-driver.component.html',
  styleUrls: ['./session-history-driver.component.css']
})
export class SessionHistoryDriverComponent implements OnInit {
  tabView: any='drivers';

  constructor(public router:Router) { }

  ngOnInit() {
  }

  // view tab (patient or plasma-donated-patient)
  viewTab(tab) {
    this.tabView = tab
    if(this.tabView == 'drivers'){
        this.router.navigate(['/session-history-driver'])
    }
    else{
      this.router.navigate(['/session-history-resturant'])

    }
  }

}
