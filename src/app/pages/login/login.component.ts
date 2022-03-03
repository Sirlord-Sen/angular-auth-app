import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email!: string;
  password!: string;
  constructor(
    public api: ApiService, 
    public router: Router,
    public toast :ToastService,
    public store :StorageService,
    ) {}

  ngOnInit(): void {}

  login() {
    
    if (!this.email || !this.password) return this.toast.showToast('please fill provide your credentials','neutral-toast')
    
    this.api
      .login({ email: this.email, password: this.password })
      .subscribe((res: any) => {
        if (res.data) {
          this.router.navigate(['/profile']);
          this.store.saveUserData(res.data.login)
        }else{
          this.toast.showToast(res.errors[0].message,'neutral-toast')
        }
      });
  }
}
