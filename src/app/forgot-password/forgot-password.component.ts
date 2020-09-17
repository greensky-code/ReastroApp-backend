import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  reserpasswordForm:FormGroup;
  links: string;
  language = "en";
  two_food_delivery: boolean = false;
  languages: string;
  arry = [{ name: "English", language: "en" }, { name: "Thai", language: "th" }]
  constructor(private service:ApiServiceService,private router:Router,private tostr:ToastrService,private fb:FormBuilder,private spinner:NgxSpinnerService,private translate:TranslateService) {

    this.language = localStorage.getItem('language')
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

    this.reserpasswordForm=this.fb.group({
      "email"   : ['',Validators.compose([Validators.required,Validators.minLength(2),Validators.maxLength(256),Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])],
    })

  }
   forgetPassword(){
     this.spinner.show()
      let object={
        "url":  this.service.websiteUrls+'reset-password',
        "email":this.reserpasswordForm.value.email
      }
      
      this.service.postApi('api/sent-forget-password-email',object,0).subscribe(res=>{
        if(res.status==200){
          this.spinner.hide()
          this.tostr.success('An email has been send on your registered email.')
          // this.router.navigate['login']
          this.router.navigate(['login'])
        }
      },error=>{
        this.spinner.hide()
        this.tostr.error('Please enter your registered email.')
      })
  }

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