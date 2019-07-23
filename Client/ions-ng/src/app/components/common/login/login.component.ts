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
    private loggedIn: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService,
        private fbAuthService: socialAuthService
    ) {
    }

    public ngOnInit() {
        this.user = {
            id: '',
            email: 'oak@gmail.com',
            password: '123',
            name: '',
            gender: '',
            dob: '',
            role: '',
        }
        this.fbAuthService.authState.subscribe((user) => {
            this.fbUser = user;
            this.loggedIn = (user != null);
        });
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

    public signInWithFB() {
        this.fbAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
            .then(() => {
                this.fbUserData = {
                    name: this.fbUser.name,
                    email: this.fbUser.email,
                    photoUrl: this.fbUser.photoUrl
                }
                this.authService.signupWithFB(this.fbUserData)
                    .subscribe(result => { }
                        , err => {
                            return err;
                        }
                    );
            });
    }

    public signOut(): void {
        this.fbAuthService.signOut();
        this.loggedIn = false;
        console.log(this.fbUser.email);
    }

    private initLoginForm() {
        this.loginForm = this.formBuilder.group({
            emailControl: ['', [Validators.required, Validators.email]],
            passwordControl: ['', [Validators.required]]
        });
    }
}
