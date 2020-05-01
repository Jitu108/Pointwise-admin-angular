import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// export function createHttpObservable(url: string) {
//     return Observable.create(observer => {
        
//         const controller = new AbortController();
//         const signal = controller.signal;

//         fetch(url, { signal })
//         .then(response => {

//             if(response.ok) {
//                 return response.json();
//             }
//             else {
//                 observer.error('Request failed with status code: ' + response.status);
//             }
//         })
//         .then(body => {
//             observer.next(body);
//             observer.complete();
//         })
//         .catch( err => {
//             observer.error(err);
//         });
//         return () => controller.abort();
//     });
// }

export enum RESTMethod {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
    Delete = 'DELETE',
    Patch = 'PATCH'
  }

export function createHttpObservable(url: string, method?: RESTMethod, body?: any, headers?: any) {
    return Observable.create(observer => {
        
        const controller = new AbortController();
        const signal = controller.signal;

        fetch(url, 
            { 
                method: method,
                body: JSON.stringify(body),
                headers: headers,
                signal 
            })
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            else {
                observer.error('Request failed with status code: ' + response.status);
            }
        })
        .then(body1 => {
            observer.next(body1);
            observer.complete();
        })
        .catch( err => {
            observer.error(err);
        });
        return () => controller.abort();
    });
}

export function httpGet<T>(http: HttpClient, url: string): Observable<T>{
    return http.get<T>(url)
        .pipe(
            catchError(errorResponse => {
                return throwError(errorResponse.error);
            })
            // , tap(responseData => {
            //     console.log(responseData);
            // })
        );
}

export function httpPost<T>(http: HttpClient, url: string, body: any, header?: any): Observable<T> {
    if(header === undefined || header === null) {
        header = {'content-type': 'application/json'};
    }
    return http.post<T>(url, body, {headers: header})
    .pipe(
        catchError(errorRessponse => {
            return throwError(errorRessponse.error);
        })
        // , tap(responseData => {
        // })
    );
}

export function httpPut<T>(http: HttpClient, url: string, body: any, header?: any): Observable<T> {
    if(header === undefined || header === null) {
        header = {'content-type': 'application/json'};
    }

    return http.put<T>(url, body, { headers: header })
    .pipe(
        catchError(errorRessponse => {
            return throwError(errorRessponse.error);
        })
        // , tap(responseData => {
        // })
    );
}


export function httpPatch<T>(http: HttpClient, url: string, body: any): Observable<T> {

    return http.patch<T>(url, body)
    .pipe(
        catchError(errorRessponse => {
            return throwError(errorRessponse.error);
        })
        // , tap(responseData => {
        // })
    );
}

export function httpDelete<T>(http: HttpClient, url: string): Observable<T> {

    return http.delete<T>(url)
    .pipe(
        catchError(errorRessponse => {
            return throwError(errorRessponse.error);
        })
        // , tap(responseData => {
        // })
    );
}

export function isNumeric(value: string | number): boolean
{
   return ((value != null) &&
           (value !== '') &&
           !isNaN(Number(value.toString())));
}

export function getLocalTime(date:Date): Date {
    var offset = new Date().getTimezoneOffset();
    date.setMinutes(date.getMinutes() + offset);
    console.log(offset);
    return date;
}