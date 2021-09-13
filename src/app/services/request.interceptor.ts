import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {calcPossibleSecurityContexts} from "@angular/compiler/src/template_parser/binding_parser";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const params = request.params.append("token",localStorage.getItem("token"))
    request = request.clone({
      params: params,
    });
    return next.handle(request);
  }
}
