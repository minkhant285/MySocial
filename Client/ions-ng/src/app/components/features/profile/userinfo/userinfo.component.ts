import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { User } from 'src/app/models';
import { UserValidatorService, UserApiService } from 'src/app/services';

@Component({
    selector: 'ions-profile-userinfo',
    templateUrl: './userinfo.component.html',
    styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit {

    public user: User;
    public userInfoForm: FormGroup;
    public countryList = [];
    public cityList = [];
    genders = ["Male", "Female"];
    constructor(
        private formBuilder: FormBuilder,
        private UserValidatorService: UserValidatorService,
        private userApiService: UserApiService,
    ) {
    }

    public ngOnInit() {
        this.user = {
            id: '',
            email: '',
            name: '',
            password: '',
            gender: '',
            dob: '',
            role: '',
        }
        this.inituserInfoForm();
    }
    public updateUser() {
        this.userApiService.updateUser(this.user)
            .subscribe(user => {
                if (user) {
                }
            }, err => {
                console.log('Error');
                alert("Fail");
            });
    }

    private inituserInfoForm() {
        this.userInfoForm = this.formBuilder.group({
            emailControl: ['', [Validators.required, Validators.email]],
            passwordControl: ['', [Validators.required, this.UserValidatorService.validatePasswordStrength]],
            passwordControl2: ['', [Validators.required, (control: FormControl) => {
                return this.UserValidatorService.validatePasswordMatch(control, this.user.password);
            }]],
            fullNameControl: ['', [Validators.required]],
            dobControl: ['', [Validators.required, this.UserValidatorService.validateDOB]],
            phoneControl: ['', [Validators.required, this.UserValidatorService.validatePhone]],
        });

        this.userInfoForm.controls.passwordControl.valueChanges
            .subscribe(() => {
                this.userInfoForm.controls.passwordControl2.updateValueAndValidity();
            });
    }
}
