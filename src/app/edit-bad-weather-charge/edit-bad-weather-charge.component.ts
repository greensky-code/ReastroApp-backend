import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-edit-bad-weather-charge',
  templateUrl: './edit-bad-weather-charge.component.html',
  styleUrls: ['./edit-bad-weather-charge.component.css']
})
export class EditBadWeatherChargeComponent implements OnInit {

  constructor(public service : ApiServiceService) { }

  ngOnInit() {
  }

}
