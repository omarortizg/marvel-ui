import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const requestParams = {
            url: `https://gateway.marvel.com/v1/public/${request.url}`,
            setParams: {
                ts: '1',
                apikey: '526b6db1bdc8de6ca966fc9e6c38f8de',
                hash: 'e721fa3fd6111941d664ab68d23ea2e6'
            }
        };
        request = request.clone(requestParams);

        return next.handle(request)
            .pipe(
                map((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        const modEvent = event.clone({ body: event.body.data });
                        return modEvent;
                    }

                    return event;
                })
            );
    }
}
