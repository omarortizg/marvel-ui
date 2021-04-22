import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { finalize, map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { LoadingService } from '../services/loading.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    private totalRequests = 0;
    private readonly cache = new Map<string, Observable<HttpEvent<any>>>();

    constructor(private loading: LoadingService) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const key = request.urlWithParams;
        if (request.method === 'GET') {
            const cached = this.cache.get(key);
            if (cached !== undefined) {
                return cached;
            }
        }

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

        const res = next.handle(request)
            .pipe(
                map((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        const modEvent = event.clone({ body: event.body.data.results });
                        return modEvent;
                    }

                    return event;
                }),
                shareReplay(1),
                finalize(() => {
                    this.afterRequest();
                })
            );

        this.cache.set(key, res);

        return res;
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
