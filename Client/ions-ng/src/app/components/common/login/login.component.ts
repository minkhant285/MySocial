import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services';
import { Constants, User, FbUser } from 'src/app/models';

@Component({
    selector: 'itlx-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    public loading = false;

    private user: User;
    private fbUserData: FbUser;
    private loginPage: boolean;
    private loggedIn: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) {
    }

    public ngOnInit() {
        this.loginPage = true;
        this.user = {
            id: '',
            email: 'oak@gmail.com',
            password: '123',
            name: '',
            gender: '',
            dob: '',
            role: '',
            country: ''
        }
        this.initLoginForm();
    }

    public onLoginClick() {
        this.authService.login(this.user.email, this.user.password)
            .subscribe(user => {
                if (user) {
                    this.router.navigate(['/_', Constants.Page.HOME]);
                }
            }, err => {
                console.log(err);
            });
    }

    toggleLogin($event) {
        this.loginPage = true;
    }

    public signUp() {
        this.loginPage = false;
    }

    private initLoginForm() {
        this.loginForm = this.formBuilder.group({
            emailControl: ['', [Validators.required, Validators.email]],
            passwordControl: ['', [Validators.required]]
        });
    }
}
