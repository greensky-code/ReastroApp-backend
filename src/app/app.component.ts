import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'foodDeliveryAdminpanel';
  country = 'india'
   constructor(private translate: TranslateService,) {
   this.setLanguage();
}
setLanguage() {
  this.translate.addLangs(['en', 'th']);
  !!this.country ? (this.country.toLowerCase() === 'thailand' ? this.translate.setDefaultLang('th') 
  :  this.translate.setDefaultLang('en')) 
  : this.translate.setDefaultLang('en');
  }
}
