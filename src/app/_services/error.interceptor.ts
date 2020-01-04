import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError( error => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 401) {
                        throwError('UnAuthorized');
                    }
                    const applicationError = error.headers.get('Application-Error');
                    if (applicationError) {
                        return throwError(applicationError);
                    }

                    const serverErrors = error.error.errors;
                    let modelStateErrors = '';
                    if (serverErrors && typeof serverErrors === 'object') {
                           for (const key in serverErrors) {
                               if (serverErrors[key]) {
                                   modelStateErrors += serverErrors[key] + '\n';
                               }
                           }
                    }
                    return throwError(modelStateErrors || serverErrors || 'Server Error');
                }
            })
        );
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};

