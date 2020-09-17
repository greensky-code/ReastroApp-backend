import { Component, OnInit } from '@angular/core';
declare var $:any

@Component({
  selector: 'app-banner-management',
  templateUrl: './banner-management.component.html',
  styleUrls: ['./banner-management.component.css']
})
export class BannerManagementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  //========modal open========//
  disableModal(){
    $('#comanModal').modal('show')
  }

  disable(){
    $('#comanModal').modal('hide')
  }

}
