import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

/**
* Helper used to convert http errors to strings.
*/
@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
	/**
	* Function used to intercept the http requests in order to catch errors, if any, and 
	* pass them as strings.
	* @param {HttpRequest} request HttpRequest intercepted.
	* @param {HttpHandler} next Handler that transforms the HttRequest into a stream of httpEvnents.
	* @returns Observable of the type HttpEvent that holds the error. 
	*/
	intercept(request:HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
		//extract the error message from http body in case one takes place
		return next.handle(request).catch(errorResponse => {
			return Observable.throw(errorResponse.error);
		});
	}
}

/**
* Error interceptor structure to be used.
*/
export const ErrorInterceptorProvider = {
	provide: HTTP_INTERCEPTORS,
	useClass: ErrorInterceptor,
	multi: true
};