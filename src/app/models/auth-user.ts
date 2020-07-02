import { User } from './user';

export class AuthUser
    extends User {
    private _token?: string;
    public expiryDate?: string;

    public get token() {
        if (tokenExpiresInSec(this) > 0) {
            return this._token;
        }
        return null;
    }
}

export const tokenExpiresInSec = (authUser: AuthUser): number => {
    var startDate = new Date();
    var endDate = !authUser.expiryDate ? startDate : new Date(authUser.expiryDate);
    console.log("StartDate " + startDate.toString());
    console.log("ExpiryDate " + authUser.expiryDate.toString());
    console.log("EndDate " + endDate.toString());
    var seconds = (endDate.getTime() - startDate.getTime()) / 1000;

    return seconds;
}