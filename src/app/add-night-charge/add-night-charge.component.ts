import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-night-charge',
  templateUrl: './add-night-charge.component.html',
  styleUrls: ['./add-night-charge.component.css']
})
export class AddNightChargeComponent implements OnInit {
 form: FormGroup;
 constructor(private router: Router, private fb: FormBuilder, public service: ApiServiceService, public toastr: ToastrService) { }

  ngOnInit() {
    this.form = this.fb.group({
      'category': ['', Validators.compose([Validators.required, Validators.maxLength(256)])],

    });
  }

}
