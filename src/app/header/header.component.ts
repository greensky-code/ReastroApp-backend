import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  language = "en";
  fileName5: any;
  passportImage: any;
  imageForm: FormGroup;
  languages= "en";
  arry = [{ name: "English", language: "en" }, { name: "Thai", language: "th" }]
  snapshotParam: any;
  permissions:any='';
  constructor(private router: Router, private service: ApiServiceService, public tostr: ToastrService, private fb: FormBuilder, private translate: TranslateService, private spinner: NgxSpinnerService, private activRouter: ActivatedRoute) {
    this.translate.use(localStorage.getItem('language'));

    // this.language="en";
    // if(this.language=="en"){
    //   localStorage.setItem('language',this.language)
    // this.language=localStorage.getItem('language') 
    //   this.translate.use(this.language)
    //   // localStorage.removeItem('language')
    //   }
    //   setTimeout(() => {

    //   }, 1000);
    //   if(localStorage.getItem('language')=='th'){
    //   this.language=localStorage.getItem('language')
    //   localStorage.setItem('language',this.language)
    //   // localStorage.removeItem('language')
    //   } else if(localStorage.getItem('language')=='en'){
    //   this.language=localStorage.getItem('language')
    //   }




    // const urlParams = new URLSearchParams(queryString);
    // console.log('urls',window.location, queryString, urlParams);


    this.language = localStorage.getItem('language')
    console.log('lang',this.language)

    this.permissions=JSON.parse(localStorage.getItem('permissions'))
    console.log('permissionsdd',this.permissions)

  }

  ngOnChanges() {
    let pathname = window.location.pathname;    
    if (!pathname.includes('page-notfound')) {
      let lang = localStorage.getItem('language');
      pathname = lang ? pathname + "/" + lang : pathname;
      localStorage.setItem('lastUrl', pathname);
    }
  }

  ngOnInit() {
    let pathname = window.location.pathname;
    if (!pathname.includes('page-notfound')) {
      let lang = localStorage.getItem('language');
      pathname = lang ? pathname + "/" + lang : pathname;
      localStorage.setItem('lastUrl', pathname);
    }
    const url = window.location.href;
    let lang = localStorage.getItem('language');
    let newUrl = lang ? url + "/" + lang : url;
    history.pushState({}, null, newUrl);
    // if(localStorage.getItem('Authentication')=='' ){
    //   this.router.navigate(['login'])
    // }
  }

  logout() {

    this.service.getApi('api/logout', 1).subscribe((data: any) => {
      if (data.status == 200) {
        this.spinner.hide()
        localStorage.removeItem("token");
        this.router.navigate(['login'])
        this.tostr.success(data.body.message)
      }
    }, error => {
      if (error.status == 403) {
        console.log('errorstatus', error.status)
        this.spinner.hide()
        this.router.navigate(['login'])
      }
    })

  }
  // -------------------------------language change------------------------//
  selectlang(event) {
    this.language = event.target.value;
    console.log('valuLanguage==>>', this.language);
    localStorage.setItem('language', this.language);
    this.languages = localStorage.getItem('language');
    console.log('valuLanguageLocalstorage==>>', this.languages);
    this.translate.use(this.languages);



    const url = window.location.href;

    let urlArr = url.split('/');
    console.log('urlAr=>', url, urlArr);
    if (Array.isArray(urlArr)) {
      let langCurrent = urlArr[urlArr.length - 1];
      if (langCurrent == "en") {
        langCurrent = this.languages;
        urlArr[urlArr.length - 1] = langCurrent;
      }
      else if (langCurrent == "th") {
        langCurrent = this.languages;
        urlArr[urlArr.length - 1] = langCurrent;
      }
      else {
        langCurrent = this.languages;
        urlArr[urlArr.length] = this.languages;
      }
    }
    let newUrl = urlArr.join('/');
    console.log('urlAr=>1', url, urlArr, newUrl, this.language);
    history.pushState({}, null, newUrl);

    // let langCurrent;
    // this.snapshotParam = this.activRouter.snapshot.params.lang;

    // if (this.snapshotParam == "en") {
    //   langCurrent = 'th';
    //   // urlArr[urlArr.length - 1] = langCurrent;
    // }
    // else if (this.snapshotParam == "th") {
    //   langCurrent = "en";
    //   // urlArr[urlArr.length - 1] = langCurrent;
    // }
    // else {
    //   langCurrent = "en";
    //   // urlArr[urlArr.length] = "en";
    // }

    // console.log('snapshotParam',window.location, this.snapshotParam, langCurrent);

    // this.router.navigate([window.location.pathname, langCurrent]);

    // document.location.search=langCurrent;



    // window.location.href= newUrl;

  }

}

/*********************************** */

