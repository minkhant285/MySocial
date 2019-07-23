import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Constants } from '../../../models';

@Component({
    selector: 'ions-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    public page = Constants.Page.HOME;
    public Constants = Constants;

    constructor(
        private route: ActivatedRoute,
    ) {}

    public ngOnInit() {
        this.route.params.subscribe(params => {
            this.page = params['page'];
        });
    }
}
