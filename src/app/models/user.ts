export class User {
    constructor(
        public id?: number,

        public userName?: string,
        public password?: string,

        public firstName?: string,
        public middleName?: string,
        public lastName?: string,
        public emailAddress?: string,
        public phoneNumber?: string,
        public userTypeId?: number,
        public userType?: string,
        public userNameType?: string,
        public isBlocked?: boolean,
        private _token?: string,
        private _expiryDate?: Date,
        public roles?: Role[],
    ) { }

    get token() {
        if(!this._expiryDate || new Date() > this._expiryDate) {
            return null;
        }
        return this._token;
    }
    fromJSON(json) {
        for (var propName in json)
        debugger;
            this[propName] = json[propName];
        return this;
    }
}

export class Role {
    constructor(
        public entityType: string,
        public accessType: string
    ) { }
}
