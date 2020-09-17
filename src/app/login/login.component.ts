import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
// import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { splitAtColon } from '@angular/compiler/src/util';
import { TranslateService } from '@ngx-translate/core';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  handleToken: any;
  recaptcha: string = '';
  data: any;
  language = 'en';
  qr_codes: any;
  page: any;
  page1: any;
  links: string;
  key: any;
  languages: string;
  arry = [{ name: "English", language: "en" }, { name: "Thai", language: "th" }]
  permissions: any = [];
  constructor(private router: Router, private fb: FormBuilder, private service: ApiServiceService, public toastr: ToastrService,
     private spinner: NgxSpinnerService, private translate: TranslateService) {
    // this.language='en';


    console.log()
    if (localStorage.getItem('token') == null) {
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
    }
    this.arry
  }

  ngOnInit() {

    this.loginForm = this.fb.group({

      "email": ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)])],
      "password": ['', Validators.compose([Validators.required])],

    })
    localStorage.clear();
    let token = JSON.parse(localStorage.getItem('token'));
    this.verifyEmail();
  }

  ngOnChanges() {
    let pathname = window.location.pathname;
    if (!pathname.includes('page-notfound')) {
      let lang = localStorage.getItem('language');
      pathname = lang ? pathname + "/" + lang : pathname;
      localStorage.setItem('lastUrl', pathname);
    }
  }

  resolved(e) {
    if (e)
      this.recaptcha = e;
    else {
      this.recaptcha = "";
    }
  }

  login() {
    
    // this.spinner.show()
    // if(this.recaptcha!=''){
    var object = {
      "email": this.loginForm.value.email,
      "password": this.loginForm.value.password,
      "url": this.service.websiteUrls
    }
    this.service.postApi('api/login', object, 0).subscribe(res => {
      if (res.status == 200) {
        this.spinner.hide()
        this.router.navigate(['/dashboard'])
        this.data = res.body;
        this.permissions = res.body.permissions;
        localStorage.setItem('permissions', JSON.stringify(this.permissions))
        console.log('premission', this.permissions)
        this.qr_codes = this.data.data.qr_code ? this.data.data.qr_code : ''
        this.key = this.data.data.google_secretkey
        localStorage.setItem('keys', this.key)
        localStorage.setItem('language', 'en')
        localStorage.setItem('Authentication', '')

        // this.toastr.success()
        console.log('translate', this.translate)
        localStorage.setItem('token', JSON.stringify(this.data.token))
        localStorage.setItem('tokens', JSON.stringify(this.data.token))
        // this.router.navigate(['/dashboard'])
        let qrCode = this.qr_codes;
        

      }

    }, err => {
      console.log('errros', err)
      if (err.status == 500) {
        this.spinner.hide()
        this.service.toastErr('Internal server error.')
      } else if (err.status == 400) {
        this.spinner.hide()
        this.service.toastErr(err.error.message)
      } else if (err.status == 403) {
        this.spinner.hide()
        this.service.toastErr(err.error.message)
      }
    })

  }

  verifyEmail() {
    // this.spinner.show()
    let data = window.location.href.split('uuid=')
    console.log('datadata', data)
    if (data[1]) {
      let data1 = data[1].split('&time=')
      this.links = data1[0] + '/' + data1[1] + '/'
      console.log('data1', data1)
      if (this.links) {
        this.service.getApi('api/verify-link/' + this.links, 0).subscribe(res => {
          // this.spinnerService.hide();
          if (res.status == 200) {
            this.spinner.hide()

            this.toastr.success('Link verified Successfully.');
            //Amitttttt
          }
        }, error => {
          this.spinner.hide()
          if (error.status == 400) {
            this.spinner.hide()
            this.service.toastErr(error.error.message)
          } else if (error.status == 403) {
            this.service.toastErr("Your new session is active from another device.")
            this.spinner.hide()
          }
        })
      }
    }
  }
  toggleShow() {
    this.show = !this.show;
    if (this.show) {
      this.type = "text";
    }
    else {
      this.type = "password";
    }
  }
  type = "password";

  show = false;

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
