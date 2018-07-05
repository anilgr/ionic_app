import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
/** Pass untouched request through to the next request handler. */
@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private storage: Storage){

  }
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    console.log("intercepted");
    const authReq = req.clone({
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': "Bearer "+this.storage.get('access_token')
    })
  });
  return next.handle(authReq);
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
