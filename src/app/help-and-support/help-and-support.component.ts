import { Component, OnInit } from '@angular/core';
declare var $:any
@Component({
  selector: 'app-help-and-support',
  templateUrl: './help-and-support.component.html',
  styleUrls: ['./help-and-support.component.css']
})
export class HelpAndSupportComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  delete(){
    $('#help').modal('show')
  }

}
