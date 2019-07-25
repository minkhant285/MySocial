import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserValidatorService as ValidatorService, AuthService, LocationService } from '../../../services';
import { User } from 'src/app/models';

@Component({
    selector: 'mySocial-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    public user: User;

    @Output()
    public signupClick = new EventEmitter();

    @Output()
    public toggleAuthClick = new EventEmitter<boolean>();

    public signupForm: FormGroup;
    public countryList = [];
    public cityList = [];

    constructor(
        private formBuilder: FormBuilder,
        private validatorService: ValidatorService,
        private authService: AuthService,
        private locationService: LocationService
    ) {
    }

    public ngOnInit() {
        this.user = {
            id: '',
            email: '',
            name: '',
            gender: '',
            dob: '',
            role: '',
            password: ''
        };
        this.initSignupForm();
    }

    public onSignupClick() {
        this.authService.signup(this.user)
            .subscribe(user => {
                if (user) {
                    this.signupClick.emit();
                }
            }, err => {
                console.log('Error');
            });
    }

    public goToLogin() {
        this.toggleAuthClick.emit(true);
    }

    public onCountrySelected() {
        this.cityList = this.locationService.getCityList(this.user.country);
    }

    private initSignupForm() {
        this.countryList = this.locationService.getCountryList();
        this.cityList = this.locationService.getCityList(this.countryList[0]);

        this.signupForm = this.formBuilder.group({
            emailControl: ['', [Validators.required, Validators.email]],
            passwordControl: ['', [Validators.required, this.validatorService.validatePasswordStrength]],
            passwordControl2: ['', [Validators.required, (control: FormControl) => {
                return this.validatorService.validatePasswordMatch(control, this.user.password);
            }]],
            fullNameControl: ['', [Validators.required]],
            dobControl: ['', [Validators.required, this.validatorService.validateDOB]],
            addressControl: ['', [Validators.required]],
            phoneControl: ['', [Validators.required, this.validatorService.validatePhone]],
        });

        this.signupForm.controls.passwordControl.valueChanges
            .subscribe(() => {
                this.signupForm.controls.passwordControl2.updateValueAndValidity();
            });
    }

}
