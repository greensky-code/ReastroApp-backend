import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-night-charge',
  templateUrl: './edit-night-charge.component.html',
  styleUrls: ['./edit-night-charge.component.css']
})
export class EditNightChargeComponent implements OnInit {
  form: FormGroup;
  constructor(private router: Router, private fb: FormBuilder, public service: ApiServiceService, public toastr: ToastrService) { }
 
   ngOnInit() {
     this.form = this.fb.group({
       'category': ['', Validators.compose([Validators.required, Validators.maxLength(256)])],
 
     });
   }

}
