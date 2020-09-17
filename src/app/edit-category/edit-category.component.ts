import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';

declare var $:any;
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  form: FormGroup;
  showOtpComponent=true;
  varificationCode: any;
  cusinsValue: any;
  errorMessage: any;
  public formEventData = [
    {
      category:''
    }
  ];
  constructor(private router: Router, private fb: FormBuilder, public service: ApiServiceService, public toastr: ToastrService) { }

  ngOnInit() {
    this.form = this.fb.group({
      'category': ['', Validators.compose([Validators.required, Validators.maxLength(256)])],
      'eventArr': this.fb.array([])

    });
    this.checkEventCategory()
  }

  // check event data categry data 

  checkEventCategory(){
    if (this.formEventData) {
      this.formEventData.forEach(categry => {
          this.addCategory(categry);
      });
      } else{
        this.addCategory()
      }
  }
 

  // Add multiple event FormArray
  addCategory(category ? : any) {
    let fg = this.fb.group({
        'category': [category ? category.category : '',Validators.required]
    });
    (<FormArray>this.form.get('eventArr')).push(fg);    
   }

  // Delete event from any index
    deleteEvent(index: number) {
    (<FormArray>this.form.get('eventArr')).removeAt(index);
  }



  // ------------------------restrict special character---------------//

  omit_special_char(event) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }




   // ----------------Router Link---------------------------------//
generate(value){
  this.cusinsValue=value
  if(this.cusinsValue=='cusins'){
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



back(){
  this.router.navigate(['category-management'])
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
