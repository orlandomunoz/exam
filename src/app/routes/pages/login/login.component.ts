import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Server } from 'net';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  valForm: FormGroup;
  error: string;
  loading: boolean = false;

  constructor(public settings: SettingsService, fb: FormBuilder, private router: Router, private authService: AuthService) {

    this.valForm = fb.group({
      'username': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.required]
    });

  }

  submitForm($ev, value: any) {
    $ev.preventDefault();
    if (this.valForm.invalid) {
      return;
    }
    this.loading = true;
    for (let c in this.valForm.controls) {
      this.valForm.controls[c].markAsTouched();
    }
    this.authService.login(value.username, value.password)
      .subscribe(
        data => {
          this.router.navigate(['']);
        },
        error => {
          this.error = 'Invalid username or password, try again.';
          this.loading = false;
        }
      );
  }

  ngOnInit() {

  }

}
