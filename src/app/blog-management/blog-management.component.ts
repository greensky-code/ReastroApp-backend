import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
@Component({
  selector: 'app-blog-management',
  templateUrl: './blog-management.component.html',
  styleUrls: ['./blog-management.component.css']
})
export class BlogManagementComponent implements OnInit {

  page = 1;
  total: any;
  limit: number;
  faqDelete_id: any;
  showOtpComponent = true;
  varificationCode: any;
  searchByName = '';
  topicList: any;
  selectTopic = '';
  selectStatus = '';
  url: string;
  is_active: any;
  status: boolean;
  helpQuestionlist: any=[];
  errorMessage: any;
  disabled=false;
  invalidMessage: any;

  constructor(private service: ApiServiceService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.disabled=false;

 
    this.gethelpQuestion(1)
    this.getTopicList()
  }


  // ------------------------Faq List Api----------------------------//

  gethelpQuestion(page) {
    this.spinner.show()
    this.page = page
    this.service.getApi(`content/blogs?page=${this.page}&is_active=${this.selectStatus}`, 1).subscribe(res => {
      if (res.status == 200) {
        this.helpQuestionlist = res.body.results
        this.spinner.hide()
        this.total = res.body.count
        this.limit = 10
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
      }else if (err.status == 404) {
        this.spinner.hide()
        this.invalidMessage=err.error.detail
        this.service.toastErr(err.error.detail)
      }
    })
  }

  enterValue(){
     
    if(this.searchByName!=''){

      this.disabled=true

    }else if(this.searchByName==''){

      this.disabled=false

    }
  }
  getTopicList() {
    this.spinner.show()

    this.service.getApi(`content/topics-list`, 1).subscribe(res => {

      if (res.status == 200) {
        this.spinner.hide()
        this.topicList = res.body



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

  selectStatuss(value) {
    this.selectStatus = value
    if(this.selectStatus!=''){

      this.disabled=true

    }else if(this.selectStatus==''){

      this.disabled=false

    }
    // this.submit()
  }

  submit() {
    this.spinner.show()
    if (this.selectStatus && this.searchByName) {
      this.url = `content/blogs?is_active=${this.selectStatus}&search=${this.searchByName}`
    } else if (this.searchByName) {
      this.url = `content/blogs?search=${this.searchByName}`
    } else if (this.selectStatus) {
      this.url = `content/blogs?is_active=${this.selectStatus}`
    }

    this.service.getApi(this.url, 1).subscribe(res => {
      if (res.status == 200) {
        this.spinner.hide()
        this.helpQuestionlist = res.body.results
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

  reset() {
    this.searchByName = '';
    this.selectTopic = '';
    this.selectStatus = '';
    this.invalidMessage='';
    this.disabled=false;
    this.gethelpQuestion(1)
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


  // -------------------------Delete Api------------------------------//

  deleteFaq(id) {
    this.faqDelete_id = id
    $('#deleteFaq').modal({ backdrop: 'static', keyboard: false })
  }

  // -----------------------------Un-publish--------------------------//
  unpublish(id, is_active) {
    this.faqDelete_id = id
    this.is_active = is_active
    if (this.is_active == true) {
      this.status = false
      $('#unpublis').modal({ backdrop: 'static', keyboard: false })
    } else if (this.is_active == false) {
      this.status = true
      $('#unpublis').modal({ backdrop: 'static', keyboard: false })
    }
  }

  publishUnpublish() {
    let object = {
      "id": this.faqDelete_id,
      "status": this.status
    }
    this.service.postApi('content/blog-publish-unpublish', object, 1).subscribe(res => {
      if (res.status == 200) {
        this.spinner.hide()
        this.service.showSuccess(res.body.message)
        this.gethelpQuestion(1)
        // this.router.navigate(['manage-faq'])
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

  deletemodal() {
    $('#deleteFaq').modal('hide')
    $('#unpublis').modal('hide')
    $('#googleauth').modal({ backdrop: 'static', keyboard: false })
  }

  deleteFunction() {
    this.spinner.show()
    this.service.delete('content/blogs/', this.faqDelete_id, 1).subscribe(res => {
      if (res.status == 204) {
        this.gethelpQuestion(1)
        this.spinner.hide()
        this.service.showSuccess(res.body.message)

        // this.gethelpQuestion(1)
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

  verify() {
    let data = {
      "code": this.varificationCode
    }
    this.service.postApi('api/google-auth-step-verification', data, 1).subscribe((res) => {
      if (res.status == 200) {
        this.onConfigChange()
        // this.deleteFunction()
        if (this.is_active == true || this.is_active == false) {
          $('#googleauth').modal('hide')
          this.publishUnpublish()
        } else {
          $('#googleauth').modal('hide')
          this.deleteFunction()
        }
        $('#googleauth').modal('hide')

      }

    }, err => {
      if (err.status == 403 || err.status == 401) {
        this.onConfigChange()
        this.service.logout();
      }
      else if (err.status == 400) {
        this.errorMessage=err.error.message
        this.onConfigChange()
        // this.service.toastErr(err.error.message)
      } else if (err.status == 500) {
        this.service.toastErr('Internal server error.')
      }
    })
  }
  resets(){
    this.errorMessage='';
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
