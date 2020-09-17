import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-notfound',
  templateUrl: './page-notfound.component.html',
  styleUrls: ['./page-notfound.component.css']
})
export class PageNotfoundComponent implements OnInit {

  correctRoute : boolean;
  constructor() {
    this.correctRoute = false;
  }

  ngOnInit() {
    
    // code to check if we came from correct route but 'th' or 'en' was added to the end of url starts
    let url = localStorage.getItem('lastUrl');
    let urlArr = url.split('/');

    if (Array.isArray(urlArr)) {

      let langCurrent = urlArr[urlArr.length - 1];
      if (langCurrent == "en" || langCurrent == "th") {
        urlArr.pop();
        let newUrl = urlArr.join('/');        
        window.location.pathname = newUrl;        
      }
      else {
        this.correctRoute = true;
      }

    }
    else {
      this.correctRoute = true;
    }
    // code to check if we came from correct route but 'th' or 'en' was added to the end of url ends

  }

}
