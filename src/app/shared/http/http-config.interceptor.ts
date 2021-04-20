import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { LoadingService } from '../services/loading.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    private totalRequests = 0;

    constructor(private loading: LoadingService) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.beforeRequest();

        const requestParams = {
            url: `https://gateway.marvel.com/v1/public/${request.url}`,
            setParams: {
                ts: '1',
                apikey: environment.apikey,
                hash: environment.hash
            }
        };
        request = request.clone(requestParams);

        return next.handle(request)
            .pipe(
                map((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        const modEvent = event.clone({ body: event.body.data.results });
                        return modEvent;
                    }

                    return event;
                }),
                finalize(() => {
                    this.afterRequest();
                })
            );
    }

    private beforeRequest(): void {
        this.totalRequests++;
        if (this.totalRequests > 0) {
            this.loading.isLoading(true);
        }
    }

    private afterRequest(): void {
        this.totalRequests--;
        if (this.totalRequests === 0) {
            this.loading.isLoading(false);
        }
    }
}
