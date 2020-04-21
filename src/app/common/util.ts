import { Observable } from 'rxjs';

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
        .then(body => {
            observer.next(body);
            observer.complete();
        })
        .catch( err => {
            observer.error(err);
        });
        return () => controller.abort();
    });
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