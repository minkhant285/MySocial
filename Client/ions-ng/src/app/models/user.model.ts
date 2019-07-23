export class User {
    public id: string;
    public email: string;
    public name: string;
    public password: string;
    public gender: string;
    public dob: string;
    public role: string;

    constructor() {
        this.id = '';
        this.email = '';
        this.name = '';
        this.password = '';
        this.gender = '';
        this.dob = '';
        this.role = '';
    }
}

export class FbUser {
    public name: string;
    public email: string;
    public photoUrl: string;
}
