import { User, Role } from './user';

export class AuthUser 
extends User
{
    constructor(
        public id?: number,

        public userName?: string,
        public password?: string,

        public firstName?: string,
        public middleName?: string,
        public lastName?: string,
        public emailAddress?: string,
        public phoneNumber?: string,
        public userType?: string,
        public userNameType?: string,
        public isBlocked?: boolean,
        private _token?: string,
        public expiryDate?: string,
        public roles?: Role[],
        public isDeleted?: boolean
    ) {
        super(id, userName, password, firstName, middleName, lastName, emailAddress, phoneNumber, userType, userNameType, isBlocked, roles);
    }

    public get token() {
        if(tokenExpiresInSec(this) > 0) {
            return this._token;
        }
        return null;
    }
}

export function tokenExpiresInSec (authUser: AuthUser) : number{
    var startDate = new Date();
    var endDate = !authUser.expiryDate? startDate : new Date(authUser.expiryDate);
    console.log("StartDate " + startDate.toString());
    console.log("ExpiryDate " + authUser.expiryDate.toString());
    console.log("EndDate " + endDate.toString());
    var seconds = (endDate.getTime() - startDate.getTime()) / 1000;
    
    return seconds;
}

