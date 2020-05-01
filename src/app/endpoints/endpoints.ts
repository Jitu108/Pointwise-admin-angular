import { RESTMethod } from './../common/util';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Endpoints {

    //#region category
    static category: any = {

        //#region getall
        get: {
            endpoint: '/api/categories/all',
            method: RESTMethod.Get
        },
        //#endregion

        //#region getall
        getbyid: {
            endpoint: '/api/categories/',
            method: RESTMethod.Get
        },
        //#endregion
    
        //#region create
        create: {
            endpoint: `api/categories`,
            method: RESTMethod.Post,
            headers: {
                'content-type': 'application/json'
            }
        },
        //#endregion
    
        //#region update
        update: {
            //  `/api/categories/${id}`
            endpoint: `/api/categories/`,
            method: RESTMethod.Put,
            headers: {
                'content-type': 'application/json'
            }
        },
        //#endregion
    
        //#region softdelete
        softdelete: {
            //  `/api/categories/softdelete/${id}`
            endpoint: `/api/categories/softdelete/`,
            method: RESTMethod.Delete
        },
        //#endregion
    
        //#region undosoftdelete
        undosoftdelete: {
            //  `/api/categories/UndoSoftDelete/${id}`
            endpoint: `/api/categories/UndoSoftDelete/`,
            method: RESTMethod.Patch
        },
        //#endregion
    
        //#region delete
        delete: {
            //  `/api/categories/${id}`
            endpoint: `/api/categories/`,
            method: RESTMethod.Delete
        }
        //#endregion
    };

    //#endregion

    //#region source
    static source: any = {
        //#region getall
        get: {
            endpoint: '/api/sources/all',
            method: RESTMethod.Get
        },
        //#endregion

        //#region getall
        getbyid: {
            endpoint: '/api/sources/',
            method: RESTMethod.Get
        },
        //#endregion

        //#region create
        create: {
            endpoint: `api/sources`,
            method: RESTMethod.Post,
            headers: {
                'content-type': 'application/json'
            }
        },
        //#endregion

        //#region update
        update: {
            endpoint: `/api/sources/`,
            method: RESTMethod.Put,
            headers: {
                'content-type': 'application/json'
            }
        },
        //#endregion

        //#region softdelete
        softdelete: {
            endpoint: `/api/sources/softdelete/`,
            method: RESTMethod.Delete
        },
        //#endregion

        //#region undosoftdelete
        undosoftdelete: {
            endpoint: `/api/sources/undosoftdelete/`,
            method: RESTMethod.Patch
        },
        //#endregion

        //#region delete
        delete: {
            endpoint: `/api/sources/`,
            method: RESTMethod.Delete
        }
        //#endregion
    };
    //#endregion

    //#region tag
    static tag: any = {
        //#region getall
        get: {
            endpoint: '/api/tags/all',
            method: RESTMethod.Get
        },
        //#endregion

        //#region getall
        getbyid: {
            endpoint: '/api/tags/',
            method: RESTMethod.Get
        },
        //#endregion

        //#region create
        create: {
            endpoint: `api/tags`,
            method: RESTMethod.Post,
            headers: {
                'content-type': 'application/json'
            }
        },
        //#endregion

        //#region update
        update: {
            endpoint: `/api/tags/`,
            method: RESTMethod.Put,
            headers: {
                'content-type': 'application/json'
            }
        },
        //#endregion

        //#region softdelete
        softdelete: {
            endpoint: `/api/tags/softdelete/`,
            method: RESTMethod.Delete
        },
        //#endregion

        //#region undosoftdelete
        undosoftdelete: {
            endpoint: `/api/tags/undosoftdelete/`,
            method: RESTMethod.Patch
        },
        //#endregion

        //#region delete
        delete: {
            endpoint: `/api/tags/`,
            method: RESTMethod.Delete
        }
        //#endregion
    };
    //#endregion

    //#region auth
    static auth: any = {
        authenticate: {
            endpoint: `/api/auth/authenticate`,
            method: RESTMethod.Post,
            headers: {
                'content-type': 'application/json'
            }
        }
    };
    //#endregion

    //#region user
    static user: any = {
        getbyid: {
            endpoint: `api/users/`,
            method: RESTMethod.Get,
        },

        //#region create
        create: {
            endpoint: `api/users`,
            method: RESTMethod.Post,
            headers: {
                'content-type': 'application/json'
            }
        },
        //#endregion

        //#region update
        update: {
            endpoint: `/api/users/`,
            method: RESTMethod.Put,
            headers: {
                'content-type': 'application/json'
            }
        },
        //#endregion
    }
    //#endregion
    //#region article
    static article: any = {
        //#region get
        get: {
            endpoint: '/api/articles',
            method: RESTMethod.Get
        },
        //#endregion

        //#region getbyid
        getbyid: {
            endpoint: `api/articles/`,
            method: RESTMethod.Get,
        },
        //#endregion

        //#region create
        create: {
            endpoint: `api/articles`,
            method: RESTMethod.Post,
            headers: {
                'content-type': 'application/json'
            }
        },
        //#endregion

        //#region update
        update: {
            endpoint: `/api/articles/`,
            method: RESTMethod.Put,
            headers: {
                'content-type': 'application/json'
            }
        },
        //#endregion

        //#region softdelete
        softdelete: {
            endpoint: `/api/articles/softdelete/`,
            method: RESTMethod.Delete
        },
        //#endregion

        //#region undosoftdelete
        undosoftdelete: {
            endpoint: `/api/articles/undosoftdelete/`,
            method: RESTMethod.Patch
        },
        //#endregion

        //#region delete
        delete: {
            endpoint: `/api/articles/`,
            method: RESTMethod.Delete
        }
        //#endregion
    };
    //#endregion
}

// class endpointmethod {
//     endpoint: string;
//     method: RESTMethod;
//     headers?: any;
// }