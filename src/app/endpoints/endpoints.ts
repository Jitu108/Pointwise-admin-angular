import { RESTMethod } from './../common/util';

export const Endpoints = {

    //#region category
    category: {

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
        },
        //#endregion
    
        //#region update
        update: {
            //  `/api/categories/${id}`
            endpoint: `/api/categories/`,
            method: RESTMethod.Put,
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
    },
    //#endregion

    //#region source
    source: {
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
    },
    //#endregion

    //#region tag
    tag: {
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
            method: RESTMethod.Put
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
    },
    //#endregion

    //#region auth
    auth: {
        authenticate: {
            endpoint: `/api/auth/authenticate`,
            method: RESTMethod.Post,
            headers: {
                'content-type': 'application/json'
            }
        }
    },
    //#endregion

    //#region auth
    staticdata: {
        entities: {
            endpoint: `/api/staticdata/entities`,
            method: RESTMethod.Get
        },
        accesstypes: {
            endpoint: `/api/staticdata/accesstypes`,
            method: RESTMethod.Get
        },
    },
    //#endregion

    //#region user
    user: {
        //#region get
        get: {
            endpoint: '/api/users',
            method: RESTMethod.Get
        },
        //#endregion

        //#region getbyid
        getbyid: {
            endpoint: `api/users/`,
            method: RESTMethod.Get
        },
        //#endregion

        //#region create
        create: {
            endpoint: `api/users`,
            method: RESTMethod.Post
        },
        //#endregion

        //#region update
        update: {
            endpoint: `/api/users/`,
            method: RESTMethod.Put
        },
        //#endregion

        //#region softdelete
        softdelete: {
            endpoint: `/api/users/softdelete/`,
            method: RESTMethod.Delete
        },
        //#endregion

        //#region undosoftdelete
        undosoftdelete: {
            endpoint: `/api/users/undosoftdelete/`,
            method: RESTMethod.Patch
        },
        //#endregion

        //#region softdelete
        block: {
            endpoint: `/api/users/block/`,
            method: RESTMethod.Patch
        },
        //#endregion

        //#region undosoftdelete
        unblock: {
            endpoint: `/api/users/unblock/`,
            method: RESTMethod.Patch
        },
        //#endregion
    },
    //#endregion

    //#region article
    article: {
        //#region get
        get: {
            endpoint: '/api/articles',
            method: RESTMethod.Get
        },
        //#endregion

        //#region getbyid
        getbyid: {
            endpoint: `api/articles/`,
            method: RESTMethod.Get
        },
        //#endregion

        //#region create
        create: {
            endpoint: `api/articles`,
            method: RESTMethod.Post
        },
        //#endregion

        //#region update
        update: {
            endpoint: `/api/articles/`,
            method: RESTMethod.Put
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
    }
    //#endregion
}