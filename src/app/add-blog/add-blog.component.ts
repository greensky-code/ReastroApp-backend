import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any;
@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {

  blogForm: FormGroup
  fileName1: any;

  registrsImage: any;
  formData: FormData;
  data: any;
  uploadForm: any;
  selectedFile: any;
  isClicked: boolean = false;
  checkFacbook: any;
  checktwitter: any;

  marked = false;
  marked1=false;
  theCheckbox1 = false;
  theCheckbox2=false;
  truvalue: any;
  truvalue1: boolean;
  blogValue: any;
  varificationCode: any;
  showOtpComponent=true;
  errorMessage: any;

  constructor(private service: ApiServiceService, private router: Router, private tostr: ToastrService, private fb: FormBuilder, private spinner: NgxSpinnerService) { }

  ngOnInit() {

    const rememberLoginControl = new FormControl();
    this.blogForm = this.fb.group({
      blogTitle: ['', Validators.compose([Validators.required])],
      image: ['', Validators.required],
      bogDetails: ['', Validators.required],
      author: ['', Validators.required],
      tag: ['', Validators.required],
      facebook: ['',],
      twiter: ['',],
    });


  }



  toggleVisibility(e,value){
   
    if(value == 'facebook'){
      this.marked= e.target.checked;
      this.truvalue=this.marked
    }
    if(value == 'twitter'){
      this.marked1= e.target.checked;
      this.truvalue1=this.marked1
    }
  }


  upload(e) {
    let data = new FormData();
    //Append files to form data
    let files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      data.append('image', files[i], files[i].name);
    }
  }



  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.blogForm.get('image').setValue(file);

    }
  }

  addBlog() {
    this.spinner.show()
    const payload = new FormData();
    payload.append("language", "en");
    payload.append("tags", this.blogForm.value.tag);
    payload.append("title", this.blogForm.value.blogTitle);
    payload.append("description", this.blogForm.value.bogDetails);
    payload.append("facebook",this.truvalue?'true':'false');
    payload.append("twitter", this.truvalue1?'true':'false');
    payload.append("image", this.selectedFile, this.selectedFile.name);
    this.service.postApi('content/blogs', payload,2).subscribe(res => {
      if(res.status == 201){
        this.spinner.hide()
        this.service.showSuccess('Blog added successfully.')
        this.router.navigate(['blog-management'])
      }
    }, err => {
      if (err.status == 403 || err.status == 401) {
        this.service.logout();
        this.spinner.hide()
      }
      else if (err.status == 400) {
        this.spinner.hide()
        this.tostr.error(err.error.admin_offer)
      }else if(err.status == 500){
        this.spinner.hide()
        this.tostr.error('Internal server error.')
      }


    })

  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    this.blogForm.patchValue({
      'image': this.selectedFile.name
    })

  }



       // ----------------Router Link---------------------------------//
generate(value){
  this.blogValue=value
  if(this.blogValue=='blog'){
    $('#googleauth').modal({ backdrop: 'static', keyboard: false })

  }

}

// google auth
onOtpChange(value){
  this.varificationCode=value
 }

 onConfigChange() {
  this.showOtpComponent = false;
  this.varificationCode = null;
  setTimeout(() => {
    this.showOtpComponent = true;
  }, 0);
}


verify(){
  this.spinner.show()
  let data = {
    "code": this.varificationCode
  }
  this.service.postApi('api/google-auth-step-verification',data,1).subscribe((res)=>{
    if(res.status == 200){
      this.spinner.hide()
      this.onConfigChange()
      this.addBlog()
     $('#googleauth').modal('hide')
  

    }
   
  } ,err=>{
   if(err.status == 403 || err.status == 401){
     this.spinner.hide()
     this.onConfigChange()
     this.service.logout();
   }
   else if (err.status == 400){
     this.spinner.hide()
    this.onConfigChange()
    this.errorMessage=err.error.message
   }
 })
}

reset(){
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



