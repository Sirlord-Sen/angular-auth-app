import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { StorageService } from './storage.service';
import { environment } from '../../environments/environment';
import { loginQuery, logoutQuery, signupQuery, updatePhoto } from '../queries';
import updateQuery from '../queries/update.query';
import refreshtokenQuery from '../queries/refreshtoken.query';
// import * as _FormData from 'form-data';
// declare var require: any;
// var FormData = require('form-data');
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  token: any;

  private BASE_URL = environment.api;

  private httpHeaders = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );

  private uploadHeaders = new HttpHeaders().set(
    'Content-Type',
    'multipart/form-data; boundary=--------------------------989868329627697160027863'
  );
  // .set('Content-Disposition', 'form-data; name="operations"; name="map"; name="file"')

  private options = {
    headers: this.httpHeaders,
  };

  constructor(private http: HttpClient, private store: StorageService) {}

  getToken() {
    let token = this.store.getToken();
    this.options.headers = this.options.headers.set(
      'Authorization',
      `Bearer ${token}`
    );
    this.uploadHeaders = this.uploadHeaders.set(
      'Authorization',
      `Bearer ${token}`
    );
    return token;
  }
  getRefreshToken() {
    return this.store.getRefreshToken();
  }

  createUser(payload: { email: string; password: string }) {
    return this.http.post(this.BASE_URL, signupQuery(payload), this.options);
  }

  login(payload: { email: string; password: string }) {
    return this.http.post(this.BASE_URL, loginQuery(payload), this.options);
  }

  _updatePhoto(payload: FormData) {
    this.getToken();
    return fetch(this.BASE_URL, {
      body: payload,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
  }

  updateUser(payload: {
    username?: string;
    fullname?: string;
    bio?: string;
    password?: string;
    phone?: string;
    email?: string;
  }) {
    this.getToken();
    return this.http.post(this.BASE_URL, updateQuery(payload), this.options)
  }

  refreshToken() {
    return this.http.post(
      this.BASE_URL,
      refreshtokenQuery(this.getRefreshToken()),
      this.options
    );
  }

  logout() {
    this.getToken();
    return this.http.post(this.BASE_URL, logoutQuery(), this.options);
  }
}
