import { Component, OnInit } from '@angular/core';
declare var $:any
@Component({
  selector: 'app-wallet-update-requests',
  templateUrl: './wallet-update-requests.component.html',
  styleUrls: ['./wallet-update-requests.component.css']
})
export class WalletUpdateRequestsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  walletModal(){
    $('#walletModal').modal('show')
  }

  reason(){
    $('#walletModal').modal('hide')
    
  }

}
