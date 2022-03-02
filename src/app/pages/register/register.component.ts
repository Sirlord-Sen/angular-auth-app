import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  email!: string;
  password!: string;
  constructor(
    public toast: ToastService,
    private api: ApiService,
    private router: Router,
    private store: StorageService,
  ) {}

  ngOnInit(): void {}

  signup() {
    if (!this.email || !this.password)
      return this.toast.showToast(
        'please fill provide your credentials',
        'neutral-toast'
      );

    this.toast.showToast("Loading..","neutral-toast",2000)
    
    this.api
      .createUser({ email: this.email, password: this.password })
      .subscribe((res: any) => {
        if (res.data) {
          this.api
            .login({ email: this.email, password: this.password })
            .subscribe((res: any) => {
              if (res.data) {
                this.router.navigate(['/profile']);
                this.toast.showToast("Your account has been created successfully","success-toast")
                this.store.saveUserData(res.data.login)
              }else{
                this.toast.showToast(res.errors[0].message,'neutral-toast')
              }
            });
        }else{
          this.toast.showToast("Oops, there was an error",'error-toast')
        }
      });
  }
}