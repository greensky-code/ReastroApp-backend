import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit {

  cusine_id: any;
  topicform: FormGroup;
  cusinedata: any;
  language='en';
  cusine_ids: any;
  topicList: any;
  topic: any;
  topicShare: any[];
  topicArray = [];
  topic_id: any;
  topicRetriwe: any;
  topicShares: any[];
  topicTranclateRe: any;
  faqTranclateRe: any;
  isDisabled: boolean;
  thai_id: any;
  errorMessage: string;
  newsValue: any;
  varificationCode: any;
  showOtpComponent = true;
  constructor(private service: ApiServiceService, private router: Router, private tostr: ToastrService, private fb: FormBuilder, private activateRouter: ActivatedRoute, private spinner: NgxSpinnerService) { 
    this.getAllApis()
  }

  ngOnInit() {
  
  }

  getAllApis(){
    this.activateRouter.params.subscribe(res => {
      this.topic_id = res.id
      this.thai_id = res.thai_id
      this.language = res.language
      console.log('language', this.language)
      this.topicform = this.fb.group({
        title: ['', Validators.compose([Validators.required, Validators.maxLength(256)])],
        newsDetails: ['', Validators.required],
        // userType          : ['',Validators.required] 

      });

      this.isDisabled = true;
    if (this.language == 'th') {
      this.getfaqTranslate()
      this.getShare()
      // this.getTopicTranclate()
      this.getTopicRe()
    } else  {
      this.getShare()
      this.getTopicRes()
    }
    })

   
    
  }

  // ----------------------Get Retriwe id--------------//
  getTopicRe() {
    this.spinner.show()

    this.service.getApi(`content/news/${this.topic_id}`, 1).subscribe(res => {

      if (res.status == 200) {
        this.spinner.hide()
        this.topicRetriwe = res.body
        this.topicArray = res.body.share
        console.log('getTopicRe()dfdsfdsfdsf==>>', this.topicArray)

      }
    }, err => {
      if (err.status == 500) {
        this.spinner.hide()
        this.service.toastErr('Internal server error.')
      } else if (err.status == 403 || err.status == 401) {
        this.spinner.hide()
        this.service.logout()
        this.service.toastErr(err.message)
      } else if (err.status == 400) {
        this.spinner.hide()
        this.service.toastErr(err.message)
      }
    })
  }




  getTopicRes() {
    this.spinner.show()

    this.service.getApi(`content/news/${this.topic_id}`, 1).subscribe(res => {

      if (res.status == 200) {
        this.spinner.hide()
        this.topicRetriwe = res.body
        this.topicArray = res.body.share
        console.log('xcxzcxzcxzcxczcx', this.topicArray)

        this.topicform.patchValue({
          'title': this.topicRetriwe.title,
          'newsDetails': this.topicRetriwe.description,
        })
        console.log('topicRetriwe==>>', this.topicRetriwe)

      }
    }, err => {
      if (err.status == 500) {
        this.spinner.hide()
        this.service.toastErr('Internal server error.')
      } else if (err.status == 403 || err.status == 401) {
        this.spinner.hide()
        this.service.logout()
        this.service.toastErr(err.message)
      } else if (err.status == 400) {
        this.spinner.hide()
        this.service.toastErr(err.message)
      }
    })
  }
  // ----------------------Get topic Api-----------------//




  // --------------------selectTopic --------------------//
  selectTopic(val) {
    // this.topicform.value.userType;
    // let ind=this.topicArray.findIndex(x=>x==Number(val));
    // if(ind>-1){
    //   this.topicArray.splice(ind,1);
    // }
    // else{
    //   this.topic=val
    //   this.topicArray.push(Number(this.topic))  
    // }
    // // this.topic=val
    // // this.topicArray.push(Number(this.topic))
    // console.log('topicArray==>>',this.topicArray)

    let ind = this.topicArray.findIndex(x => x == Number(val));
    if (ind > -1) {
      this.topicArray.splice(ind, 1);
    } else {
      this.topic = val
      this.topicArray.push(Number(this.topic))
    }
    console.log('topicArray==>>', this.topicArray)
  }

  // -----------------------Get api share with-----------//

  getShare() {
    this.spinner.show()

    this.service.getApi(`content/share-with`, 1).subscribe(res => {

      if (res.status == 200) {
        this.spinner.hide()
        this.topicShare = res.body
        console.log('Shareesrsdrserrer==>>', this.topicShare)

      }
    }, err => {
      if (err.status == 500) {
        this.spinner.hide()
        this.service.toastErr('Internal server error.')
      } else if (err.status == 403 || err.status == 401) {
        this.spinner.hide()
        this.service.logout()
        this.service.toastErr(err.message)
      } else if (err.status == 400) {
        this.spinner.hide()
        this.service.toastErr(err.message)
      }
    })
  }


  // -----------------------Get api share with-----------//

  getShares() {
    this.spinner.show()

    this.service.getApi(`content/share-with`, 1).subscribe(res => {

      if (res.status == 200) {
        this.spinner.hide()
        this.topicShare = res.body
        console.log('topicSharetopicShare==>>', this.topicShare)

      }
    }, err => {
      if (err.status == 500) {
        this.spinner.hide()
        this.service.toastErr('Internal server error.')
      } else if (err.status == 403 || err.status == 401) {
        this.spinner.hide()
        this.service.logout()
        this.service.toastErr(err.message)
      } else if (err.status == 400) {
        this.spinner.hide()
        this.service.toastErr(err.message)
      }
    })
  }


  // -----------------------Add Faq----------------------//

  updateFaq() {
    this.spinner.show()
    let object = {


      "language": "en",
      "title": this.topicform.value.title,
      "description": this.topicform.value.newsDetails,
      "share": this.topicArray,
    }
    console.log('object==>>', object)
    this.service.putApi(`content/news/${this.topic_id}`, object, 1).subscribe(res => {
      if (res.status == 200) {
        this.spinner.hide()
        this.service.showSuccess(res.body.message)
        this.router.navigate(['manage-news'])
      }
    }, err => {
      if (err.status == 500) {
        this.spinner.hide()
        this.service.toastErr('Internal server error.')
      } else if (err.status == 403 || err.status == 401) {
        this.spinner.hide()
        this.service.logout()
        this.service.toastErr(err.message)
      } else if (err.status == 400) {
        this.spinner.hide()
        this.service.toastErr(err.message)
      }
    })
  }



  // --------------------Get Topic Trancelate-----------------//

  getfaqTranslate() {
    this.spinner.show()

    this.service.getApi(`content/news/${this.topic_id}/${this.language}`, 1).subscribe(res => {

      if (res.status == 200) {
        this.spinner.hide()
        this.faqTranclateRe = res.body
        this.topicShare=res.body.share_with
        console.log('topicShare1',this.topicShare)
        
        this.topicform.patchValue({
          'title': this.faqTranclateRe.title,
          'newsDetails': this.faqTranclateRe.description
          // 'answer'        :   this.faqTranclateRe.answer
        })
        // this.getTopicRe()
        console.log('faqTranclateRe==>>', this.faqTranclateRe)

      }
    }, err => {
      if (err.status == 500) {
        this.spinner.hide()
        this.service.toastErr('Internal server error.')
      } else if (err.status == 403 || err.status == 401) {
        this.spinner.hide()
        this.service.logout()
        this.service.toastErr(err.message)
      } else if (err.status == 400) {
        this.spinner.hide()
        this.service.toastErr(err.message)
      }
    })
  }


  // --------------------Get topic Translate------------------//




  // -------------------Update translate Faq Api-----------------------//

  updateTranslateApi() {
    let object = {
      "news": this.faqTranclateRe.news,
      "title": this.topicform.value.title,
      "description": this.topicform.value.newsDetails,
      // "share": this.topicArray,
      "language": this.language
    }
    console.log('topictopic==>>', object)
    this.service.postApi('content/news-translate', object, 1).subscribe(res => {
      if (res.status == 200) {
        this.spinner.hide()
        this.service.showSuccess(res.body.message)
        this.router.navigate(['manage-news'])
      }
    }, err => {
      if (err.status == 500) {
        this.spinner.hide()
        this.service.toastErr('Internal server error.')
      } else if (err.status == 403 || err.status == 401) {
        this.spinner.hide()
        this.service.logout()
        this.service.toastErr(err.message)
      } else if (err.status == 400) {
        this.spinner.hide()
        this.service.toastErr(err.message)
      }
    })
  }

  update() {
    if (this.language == 'th') {
      console.log('hegrhjewgrhjewrhjwegwehjr')
      this.updateTranslateApi()
    } else {
      this.updateFaq()
    }
  }

  // ----------------Router Link---------------------------------//
  generate(value) {
    this.newsValue = value
    if (this.newsValue == 'news') {
      $('#googleauth').modal({ backdrop: 'static', keyboard: false })

    }

  }

  // google auth
  onOtpChange(value) {
    this.varificationCode = value
  }

  onConfigChange() {
    this.showOtpComponent = false;
    this.varificationCode = null;
    setTimeout(() => {
      this.showOtpComponent = true;
    }, 0);
  }
  // modal() {
  //   $('#comanModal').modal('hide')
  //   $('#googleauth').modal({ backdrop: 'static', keyboard: false })
  // }

  verify() {
    this.spinner.show()
    let data = {
      "code": this.varificationCode
    }
    this.service.postApi('api/google-auth-step-verification', data, 1).subscribe((res) => {
      if (res.status == 200) {
        this.spinner.hide()

        if (this.newsValue == 'news') {
          this.onConfigChange()
          this.update()
        }
        // this.addcusine()
        $('#googleauth').modal('hide')


      }

    }, err => {
      if (err.status == 403 || err.status == 401) {
        this.spinner.hide()
        this.onConfigChange()
        this.service.logout();
      } else if (err.status == 404) {
        this.spinner.hide()
        this.onConfigChange()
        this.service.toastErr(err.error.message)
      }
      else if (err.status == 400) {
        this.spinner.hide()
        this.onConfigChange()
        this.errorMessage = err.error.message
      }
    })
  }
  reset() {
    this.errorMessage = '';
    this.onConfigChange()
  }

  // only number Allowed
  numberOnly(event): boolean {

    const charCode = (event.which) ? event.which : event.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57)) {

      return false;

    }

    return true;

  }

}
