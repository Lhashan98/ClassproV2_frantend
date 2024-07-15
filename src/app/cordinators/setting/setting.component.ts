import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SettingService } from 'src/app/service/setting.service';
import { Store } from '@ngxs/store';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  changePasswordForm: FormGroup;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private router: Router,
    private cookieService: CookieService,
    private settingService: SettingService
  ) {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }
  


  onSubmit() {
    if (this.changePasswordForm.invalid) {
      return;
    }

    const { currentPassword, newPassword, confirmPassword } = this.changePasswordForm.value;
    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }
    
    try {
      const uname=this.cookieService.get('userName');
      this.settingService.changePassword(currentPassword, newPassword,uname).subscribe(
        
        (response) => {
          console.log('Password changed successfully', response);
          alert('Password changed successfully');
        },
        (error: any) => { // Explicitly type the error parameter
          console.error('Failed to change password', error);
          alert('Failed to change password');
        }
      );
    } catch (error: any) { // Explicitly type the error parameter
      alert(error.message);
    }
  }

  logout() {
    this.cookieService.delete('department');
    this.router.navigate(['/login']);
  }
}
