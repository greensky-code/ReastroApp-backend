import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm:FormGroup
  links: string;
  language = "en";
  languages: string;
  uuid: any;
  u_id: any;
  show2: boolean=false;
  show1: boolean = false;
  type :any= "password";

  show :boolean = false;
  type2: string="password";
  type1: string="password";
  arry = [{ name: "English", language: "en" }, { name: "Thai", language: "th" }]
  constructor(private service:ApiServiceService, privatetostr:ToastrService,private fb:FormBuilder,private tostr:ToastrService,private touter:Router,private spinner:NgxSpinnerService,private router:Router, private translate: TranslateService, ) { 
    this.language = localStorage.getItem('language')
    let pathname = window.location.pathname;    
    if (!pathname.includes('page-notfound')) {
      let lang = localStorage.getItem('language');
      pathname = lang ? pathname + "/" + lang : pathname;
      localStorage.setItem('lastUrl', pathname);
    }
    this.arry
    console.log('arry', this.arry)
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

    this.resetPasswordForm=this.fb.group({
      'newPassword'       : ['',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i)]],
      'confirmPassword'   : ['',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/i)]]
    })
    this.passwordLink() 
    this.verifyEmail()
  }
  
  // ///////////Hide/Show Password Method
  toggleShow1() {
    
    this.show = !this.show;
    if (this.show) {
      this.type = "text";
    }
    else {
      this.type = "password";
    }
    }
    toggleShow2() {
      this.show2 = !this.show2;
      if (this.show2) {
        this.type2 = "text";
      }
      else {
        this.type2 = "password";
      }
    }
  





    // /////////////////Password Link Verify Api ////////////
    passwordLink(){
        
      this.spinner.show()
      let data = window.location.href.split('uuid=')
      let data1=data[1].split('&time=')
      this.links=data1[0]+'/'+data1[1]
     
       if(this.links){
      this.service.getApi('api/link-verification/'+this.links,0).subscribe(res => {
       // this.spinnerService.hide();
       if(res.status == 200) {
        this.spinner.hide()
         let uuid=res
         this.u_id=uuid.body.uuid
         
         
         this.tostr.success('Link verified Successfully.');
       //Amitttttt
       } 
      //  else if(res.status==403){
      //   this.spinner.hide()
      //   this.service.toastErr('Link is Expired.');
      //  }
    
        
         },error=>{
          this.spinner.hide()
          // this.service.toastErr('Link is Expired.');
          if(error.status == 500){
            this.spinner.hide()
            this.service.toastErr("Internal server error.")
          }else if(error.status == 400){
            this.u_id="Notu_id"
            this.spinner.hide()
            this.service.toastErr("Link is Expired")
          }else if(error.status == 403 || error.status ==401){
            this.spinner.hide()
            this.service.toastErr(error.message)
          }
          else if(error.status == 404){
            this.spinner.hide()
            this.service.toastErr(error.message)
          }
         })
       }
     
       
    //  }

  // ///////////Reset Api ///////////////

 
  
}

verifyEmail(){
  // this.spinner.show()
   let data = window.location.href.split('uuid=')
   console.log('datadata',data)
   if(data[1]){
   let data1=data[1].split('&time=')
  this.links=data1[0]+'/'+data1[1]+'/'
  console.log('data1',data1)    
    if(this.links){
   this.service.getApi('api/verify-link/'+this.links,0).subscribe(res => {
    // this.spinnerService.hide();
    if(res.status == 200) {
      this.spinner.hide()

    this.service.showSuccess('Link verified Successfully.');
    //Amitttttt
    } 
      },error=>{
        this.spinner.hide()
        if(error.status == 400){
          this.spinner.hide()
          this.service.toastErr(error.error.message)
        }else if(error.status == 403){
          this.service.toastErr("Your new session is active from another device.")
          this.spinner.hide()
        }
      })
    }
  }
  }
resetPassword(){
  console.log('linksssss==>>',this.links)
  this.spinner.show()
  let object={
    'password'      : this.resetPasswordForm.value.confirmPassword
  }
    this.service.postApi(`api/reset-password/${this.links}`,object,0).subscribe(res=>{
      console.log('ressss',res)
      if(res.status==200){
        this.spinner.hide()
        this.service.showSuccess(res.body.message)
        this.router.navigate(['login'])
        // if(res.body.status==403)
      }else if(res.status == 403){
        this.spinner.hide()
        // this.service.showSuccess()
        this.router.navigate(['login'])
      }else {
        this.spinner.hide()
        this.service.toastErr(res.message)
      }

    },err=>{
      if(err.status == 500){
        this.spinner.hide()
        this.service.toastErr("Internal server error.")
      }else if(err.status == 400){
        this.spinner.hide()
        this.service.toastErr(err.message)
      }else if(err.status == 403 || err.status ==401){
        this.spinner.hide()
        this.service.toastErr("You are not authorized to perform this action.")
        this.router.navigate(['login'])
      }   else if(err.status == 404){
        this.spinner.hide()
        // this.service.toastErr("")
      } 
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

 



