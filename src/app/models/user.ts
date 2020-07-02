export class User {
    public id?: number;

    public userName?: string;
    public password?: string;

    public firstName?: string;
    public middleName?: string;
    public lastName?: string;
    public emailAddress?: string;
    public phoneNumber?: string;
    public userType?: string;
    public userNameType?: string;
    public isBlocked?: boolean;
    public roles?: Role[];
    public isDeleted?: boolean;

    public setRegistrationData =
        (
            firstName: string,
            middleName: string,
            lastName: string,
            emailAddress: string,
            phoneNumber: string,
            userName: string,
            password: string,
        ) => {
            this.firstName = firstName;
            this.middleName = middleName;
            this.lastName = lastName;
            this.emailAddress = emailAddress;
            this.phoneNumber = phoneNumber;
            this.userName = userName;
            this.password = password;
        }
}

export type Role = {
    entityType: string;
    accessType: string;
}

export type IAccess = {
    access: string;
    name: string;
    hasAccess: boolean;
}

