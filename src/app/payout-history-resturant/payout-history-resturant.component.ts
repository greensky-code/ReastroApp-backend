import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payout-history-resturant',
  templateUrl: './payout-history-resturant.component.html',
  styleUrls: ['./payout-history-resturant.component.css']
})
export class PayoutHistoryResturantComponent implements OnInit {
  tabView: any= 'restaurants';

  constructor(public router:Router) { }

  ngOnInit() {
  }

  // view tab (patient or plasma-donated-patient)
  viewTab(tab) {
    this.tabView = tab
    if(this.tabView == 'drivers'){
        this.router.navigate(['/payout-history-driver'])
    }
    else{
      this.router.navigate(['/payout-history-resturant'])

    }
  }

}
