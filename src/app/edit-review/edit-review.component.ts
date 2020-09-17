import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.css']
})
export class EditReviewComponent implements OnInit {
  form: FormGroup;
  constructor(private router: Router, private fb: FormBuilder, public service: ApiServiceService, public toastr: ToastrService) { }
 
   ngOnInit() {
     this.form = this.fb.group({
       'category': ['', Validators.compose([Validators.required, Validators.maxLength(256)])],
 
     });
   }

}
