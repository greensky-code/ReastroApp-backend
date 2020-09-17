import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { ApiServiceService } from '../api-service.service';

import { NgxSpinnerService } from 'ngx-spinner';
declare var CanvasJS: any;


@Component({

  selector: 'app-dashboard',

  templateUrl: './dashboard.component.html',

  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  dashboadData: any;

  constructor(private router: Router, private service: ApiServiceService, private spinner: NgxSpinnerService) { 
    

  }

  ngOnInit() {

    localStorage.removeItem('keys')

    localStorage.removeItem('tokens')

  this.graph1();
  this.graph2()
  this.graph3()


  }
 // Graph1
  graph1() {
    let chart = new CanvasJS.Chart("chartContainer1", {
      animationEnabled: true,
      title: {
        text: "Restaurants"
      },
      axisX: {
        title: ""
      },
      axisY: {
        title: "Amount",
        suffix: "$"
      },
      data: [{
        type: "column",
        name: "CPU Utilization",
        connectNullData: true,
        //nullDataLineDashType: "solid",
        xValueType: "dateTime",
        xValueFormatString: "DD MMM hh:mm TT",
        yValueFormatString: "#,##0.##\"%\"",
        dataPoints: [
          { y: 71, label: "Sunday" },
          { y: 55, label: "Monday" },
          { y: 50, label: "Tuesday" },
          { y: 65, label: "Wednesday" },
          { y: 95, label: "Thursday" },
          { y: 68, label: "Friday" },
          { y: 28, label: "Saturday" },
          { y: 34, label: "Sunday" }
          ]
      }]
    });
    chart.render();
  }


  // Graph2
  graph2() {
    let chart = new CanvasJS.Chart("chartContainer2", {
      animationEnabled: true,
      title: {
        text: "Items"
      },
      axisX: {
        title: ""
      },
      axisY: {
        title: "Amount",
        suffix: "$"
      },
      data: [{
        type: "column",
        name: "CPU Utilization",
        connectNullData: true,
        //nullDataLineDashType: "solid",
        xValueType: "dateTime",
        xValueFormatString: "DD MMM hh:mm TT",
        yValueFormatString: "#,##0.##\"%\"",
        dataPoints: [
          { y: 71, label: "Sunday" },
          { y: 55, label: "Monday" },
          { y: 50, label: "Tuesday" },
          { y: 65, label: "Wednesday" },
          { y: 95, label: "Thursday" },
          { y: 68, label: "Friday" },
          { y: 28, label: "Saturday" },
          { y: 34, label: "Sunday" }
          ]
      }]
    });
    chart.render();
  }

   // Graph2
   graph3() {
    let chart = new CanvasJS.Chart("chartContainer3", {
      animationEnabled: true,
      title: {
        text: "Drivers"
      },
      axisX: {
        title: ""
      },
      axisY: {
        title: "Amount",
        suffix: "$"
      },
      data: [{
        type: "column",
        name: "CPU Utilization",
        connectNullData: true,
        //nullDataLineDashType: "solid",
        xValueType: "dateTime",
        xValueFormatString: "DD MMM hh:mm TT",
        yValueFormatString: "#,##0.##\"%\"",
        dataPoints: [
          { y: 71, label: "Sunday" },
          { y: 55, label: "Monday" },
          { y: 50, label: "Tuesday" },
          { y: 65, label: "Wednesday" },
          { y: 95, label: "Thursday" },
          { y: 68, label: "Friday" },
          { y: 28, label: "Saturday" },
          { y: 34, label: "Sunday" }
          ]
      }]
    });
    chart.render();
  }

  // ----------------------Dashbord Api---------------------------//
  
  dashboard() {

    this.spinner.show()

    this.service.getApi('api/dashboard', 1).subscribe((data: any) => {

      this.dashboadData = data.body;

      if (data.status == 200) {

        this.spinner.hide()

      }

    }, err => {
      if (err.status == 403 || err.status == 401) {

        this.spinner.hide()

        this.service.logout();

      }

      else if (err.status == 400) {

        this.spinner.hide()

      }
      else if (err.status == 500) {

        this.spinner.hide()

        this.service.toastErr(err.statusText)

      }
      this.spinner.hide()
    })
  }
}
