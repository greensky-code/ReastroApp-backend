import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-session-history-resturant',
  templateUrl: './session-history-resturant.component.html',
  styleUrls: ['./session-history-resturant.component.css']
})
export class SessionHistoryResturantComponent implements OnInit {
  tabView: any='restaurants';

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
