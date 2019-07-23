import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'itlx-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
    public searchForm: FormGroup;
    public options: string[] = ['Sanchaung', 'Pearl Condo', 'Nyonya', 'Doctors'];

    constructor(
        private formBuilder: FormBuilder,
    ) {}

    public ngOnInit() {
        this.initSearchForm();
    }
    
    private initSearchForm() {
        this.searchForm = this.formBuilder.group({
            searchControl: [''],
        });
    }
}
