import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
 

  constructor(private cookieService: CookieService,
     private router: Router) {
  }

  saveUserData(data: any) {
    const userData = JSON.stringify(data);    
    this.cookieService.set('userObj', userData,undefined,'/');
  }
  getToken(){
    try {
      let token = JSON.parse(this.cookieService.get('userObj')).tokens.accessToken;
      return token
      
    } catch (error) {
      this.logout()
    }
  }
  getRefreshToken(){
    try {
      let refreshToken = JSON.parse(this.cookieService.get('userObj')).tokens.refreshToken;
      return refreshToken
    } catch (error) {
      this.logout()
      
    }
  }
  getData() {
    try {
      const userData = this.cookieService.get('userObj');
      return JSON.parse(userData);
    } catch (error) {
      this.router.navigate(['/login'])
    }
  }

  loggedIn(): boolean {
    const userData = this.cookieService.check('userObj');
    if (userData) {
      return true;
    } else {
      return false;
    }
  }

  clearAllData() {
    this.cookieService.deleteAll('/');
  }

  logout() {
    this.clearAllData();
    this.router.navigate(['/login']);
  }
}
