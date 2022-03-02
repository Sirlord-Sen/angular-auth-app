import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, finalize, retry, map ,shareReplay ,repeat} from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';
import { ToastService } from './toast.service';
import { ApiService } from './api.service';
import { UserData } from '../types/type';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  request! :any
  constructor(
    private store: StorageService,
    private toast: ToastService,
    private api: ApiService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.request = request
    return next.handle(request).pipe(
      map((e: HttpEvent<any>) => {
        if (e instanceof HttpResponse && typeof e.body !== 'string') {
          if (e.body.errors) {
            if (e.body.errors[0].message === 'TokenExpiredError: jwt expired') {
             this.applyRefreshToken(next.handle);
            }
          }
        }else{
          
        }
        return e;
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = error;
        console.log(error);
        if (request.responseType !== 'text') {
          this.toast.showToast(
            'There was an error, please try check your internet connection.',
            'error-toast'
          );
        }
        return throwError(errorMessage);
      })
    );
  }

   applyRefreshToken(request:any) {
     let req
    this.api.refreshToken().subscribe((res:any):any => {
      if (res.data) {
        let userData:UserData = this.store.getData()
        userData.tokens.accessToken = res.data.refreshToken.tokens.accessToken
        userData.tokens.expiredAt = res.data.refreshToken.tokens.expiredAt
        userData.tokens.tokenType = res.data.refreshToken.tokens.tokenType
        userData.tokens.refreshToken = res.data.refreshToken.tokens.refreshToken
        this.store.saveUserData(userData)
        request(this.request)
      }
    });
  }
}
