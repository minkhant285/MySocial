import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services';
import { Constants, User, FbUser } from 'src/app/models';
import { AuthService as socialAuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
    selector: 'itlx-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    public loading = false;

    private user: User;
    private fbUser: SocialUser;
    private fbUserData: FbUser;
    private loginPage: boolean;
    private loggedIn: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
        // private fbAuthService: socialAuthService
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
        }
        // this.fbAuthService.authState.subscribe((user) => {
        //     this.fbUser = user;
        //     this.loggedIn = (user != null);
        // });
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

    // public signOut(): void {
    //     this.fbAuthService.signOut();
    //     this.loggedIn = false;
    //     console.log(this.fbUser.email);
    // }

    private initLoginForm() {
        this.loginForm = this.formBuilder.group({
            emailControl: ['', [Validators.required, Validators.email]],
            passwordControl: ['', [Validators.required]]
        });
    }
}
