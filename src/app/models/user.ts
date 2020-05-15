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
        public userType?: string,
        public userNameType?: string,
        public isBlocked?: boolean,
        public roles?: Role[],
        public isDeleted?: boolean
    ) {}
}

export class Role {
    constructor(
        public entityType: string,
        public accessType: string
    ) { }
}

export interface IAccess {
    access: string;
    name: string;
    hasAccess: boolean;
}

