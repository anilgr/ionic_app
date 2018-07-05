import {
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import {
  DummyInterceptor
} from './dummy-interceptor';

export const httpInterceptorProviders = [{
  provide: HTTP_INTERCEPTORS,
  useClass: DummyInterceptor,
  multi: true
}]
