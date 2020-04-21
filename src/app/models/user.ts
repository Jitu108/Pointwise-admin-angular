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
        public isBlocked?: boolean
    ) { }

    fromJSON(json) {
        for (var propName in json)
        debugger;
            this[propName] = json[propName];
        return this;
    }
}
