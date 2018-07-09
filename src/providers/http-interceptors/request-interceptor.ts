import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpClient
} from '@angular/common/http';
import { AuthProvider } from '../auth/auth';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
/** Pass untouched request through to the next request handler. */
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  private baseUrl: string = "http://localhost:8081";
  constructor(private auth: AuthProvider, private storage: Storage, private http: HttpClient) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    console.log("intercepted");
    if (req.url == "http://localhost:8081/refresh_token") {
      return next.handle(req);
    }
    const authReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + this.auth.getAccessToken(),
      }
    });

    return next.handle(authReq)

  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
