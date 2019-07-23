export class User {
    public id: string;
    public email: string;
    public password: string;
    public phone: string;
    public name: string;
    public role: string;
}

export class Admin extends User {
    accessLevel: string;
}

export class HomeUser extends User {
    gender: string;
    dob: string;
    ic: string;
    education: string;
    jobTitle: string;
}
