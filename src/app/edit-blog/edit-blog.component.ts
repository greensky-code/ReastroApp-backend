import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $:any;
@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {

  blogForm:FormGroup
  fileName1: any;

  registrsImage: any;
  formData: FormData;
  data: any;
  uploadForm: any;
  selectedFile: any;
  isClicked: boolean = false;
  checkFacbook: any;
  checktwitter: any;
  blog_id: any;
  blogRetriw: any;
  language='en';
  imagedata: FormData;
  valueTwitter=false;
  valueFacebook=false;
  blogValue: string;
  varificationCode: any;
  showOtpComponent=true;
  errorMessage: any;


  
  constructor(private service: ApiServiceService, private router: Router, private tostr: ToastrService, private fb: FormBuilder,  private spinner: NgxSpinnerService,private activateRouter:ActivatedRoute) { 
    this.getAllApis()
  }

  ngOnInit() {
  
    

      
  }

  getAllApis(){
    this.activateRouter.params.subscribe(res=>{
      this.blog_id=res.id
      this.language=res.language
      this.valueTwitter=JSON.parse(res.tw)
      this.valueFacebook=JSON.parse(res.fb)
   
    })
    this.blogForm = this.fb.group({
      blogTitle: ['', Validators.compose([Validators.required, Validators.maxLength(256)])],
      image: ['', Validators.required],
      bogDetails: ['', Validators.required],
      author: ['', Validators.required],
      tag: ['', Validators.required],
      facebook: [''],
      twiter: ['']
    });
    if(this.language=='th'){
      this.getBlogTranslate()
    }else if(this.language!='th') {
      this.getBlog()
    }
  }


  getBlog(){
    this.spinner.show()
   this.service.getApi(`content/blogs/${this.blog_id}`,1).subscribe(res=>{
      if(res.status == 200){
        this.spinner.hide()
        this.blogRetriw=res.body
        
        this.blogForm.patchValue({
          "blogTitle" : this.blogRetriw.title,
          "image" : this.blogRetriw.image,
          "bogDetails" : this.blogRetriw.description,
          "author" : this.blogRetriw.author_by,
          "tag" : this.blogRetriw.tags,
          // "facebook" : this.blogRetriw.facebook,
          // "twiter" : this.blogRetriw.twitter,
        })

      }
   },err=>{
    if(err.status == 500 ){
      this.spinner.hide()
      this.service.toastErr('Internal server error.')
    }else if(err.status == 403 || err.status == 401){
      this.spinner.hide()
      this.service.logout()
      this.service.toastErr(err.error.message)
    }else if(err.status == 400 ){
      this.spinner.hide()
      this.service.toastErr(err.error.message)
    }else if(err.status == 404){
      this.spinner.hide()
      this.service.toastErr(err.error.message)
      
    }
  })
  }


  getBlogTranslate(){
    this.spinner.show()
    this.service.getApi(`content/blog-translate/${this.blog_id}`,1).subscribe(res=>{
      if(res.status == 200){
        this.spinner.hide()
        this.blogRetriw=res.body
     
        this.blogForm.patchValue({
          "blogTitle" : this.blogRetriw.title,
          "image" : this.blogRetriw.image,
          "bogDetails" : this.blogRetriw.description,
          "author" : this.blogRetriw.author_by,
          "tag" : this.blogRetriw.tags,
          // "facebook" : this.blogRetriw.facebook,
          // "twiter" : this.blogRetriw.twitter,
        })
      }
   },err=>{
    if(err.status == 500 ){
      this.spinner.hide()
      this.service.toastErr('Internal server error.')
    }else if(err.status == 403 || err.status == 401){
      this.spinner.hide()
      this.service.logout()
      this.service.toastErr(err.message)
    }else if(err.status == 400 ){
      this.spinner.hide()
      this.service.toastErr(err.message)
    }else if(err.status == 404){
      this.spinner.hide()
      this.service.toastErr(err.message)
      
    }
  }) 
  }



  changeTitle(value){

    this.isClicked = !this.isClicked 
    if(value == 'facebook'){
      this.checkFacbook=this.isClicked
    }if(value == 'twitter'){
      this.checktwitter=this.isClicked
    }

  }
  selects(value){
  }
  

  updateBlog(){
    if(this.language == 'th'){
      this.updateTranslate()
    }else{
      this.updBlog()
    }
  }

    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      this.blogForm.patchValue({
        'image' : this.selectedFile.name
      })
    
    }

    updBlog(){
    this.spinner.show()
    const payload = new FormData();
    // payload.append("blog",this.blog_id);
    payload.append("language","en");
    payload.append("tags",this.blogForm.value.tag);
    payload.append("title",this.blogForm.value.blogTitle);
    payload.append("description",this.blogForm.value.bogDetails);
    payload.append("facebook",this.blogForm.value.facebook);
    payload.append("author_by",this.blogForm.value.author);
    payload.append("twitter",this.blogForm.value.twiter);
    if(this.selectedFile){
      payload.append("image",this.selectedFile,this.selectedFile.name); 
    }
    // 
    this.service.putApi(`content/blogs/${this.blog_id}`,payload,2).subscribe(res=>{
      if(res.status == 200){
        this.spinner.hide()
        this.service.showSuccess("Blog updated successfully.")
        this.router.navigate(['blog-management']) 
      }
      },err=>{
        if(err.status == 500 ){
          this.spinner.hide()
          this.service.toastErr('Internal server error.')
        }else if(err.status == 403 || err.status == 401){
          this.spinner.hide()
          this.service.logout()
          this.service.toastErr(err.error.message)
        }else if(err.status == 400 ){
          this.spinner.hide()
          this.service.toastErr(err.error.message)
        }
        this.spinner.hide()
      })  
       }

       updateTranslate(){
        const payload = new FormData();
        payload.append("blog",this.blog_id);
        payload.append("language",this.language);
        payload.append("tags",this.blogForm.value.tag);
        payload.append("title",this.blogForm.value.blogTitle);
        payload.append("description",this.blogForm.value.bogDetails);
        // payload.append("facebook",this.faceb?this.faceb:this.blogForm.value.facebook);
        payload.append("author_by",this.blogForm.value.author);
        // payload.append("twitter",this.blogForm.value.twiter); 
        if(this.selectedFile){
          payload.append("image",this.selectedFile,this.selectedFile.name); 
        }
        // 
        this.service.postApi(`content/blog-translate`,payload,2).subscribe(res=>{
          if(res.status == 200){
            this.spinner.hide()
            this.service.showSuccess(res.body.message)
            this.router.navigate(['blog-management']) 
          }
        },err=>{
          if(err.status == 500 ){
            this.spinner.hide()
            this.service.toastErr('Internal server error.')
          }else if(err.status == 403 || err.status == 401){
            this.spinner.hide()
            this.service.logout()
            this.service.toastErr(err.message)
          }else if(err.status == 400 ){
            this.spinner.hide()
            this.service.toastErr(err.message)
          }
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
  // modal(){
  //   $('#comanModal').modal('hide')
  //   $('#googleauth').modal({ backdrop: 'static', keyboard: false })
  // }
  
  verify(){
    this.spinner.show()
    let data = {
      "code": this.varificationCode
    }
    this.service.postApi('api/google-auth-step-verification',data,1).subscribe((res)=>{
      if(res.status == 200){
        this.spinner.hide()

        if(this.blogValue == 'blog'){
          this.onConfigChange()
          this.updateBlog()
          }
        // this.addcusine()
       $('#googleauth').modal('hide')
    
  
      }
     
    } ,err=>{
     if(err.status == 403 || err.status == 401){
      this.spinner.hide()
       this.onConfigChange()
       this.service.logout();
     }else if (err.status == 404){
      this.spinner.hide()
       this.onConfigChange()
       this.service.toastErr(err.error.message)
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
