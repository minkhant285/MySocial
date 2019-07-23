import { Component, OnInit, OnDestroy } from '@angular/core';
import { InteractionService, AuthService } from '../../../services';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'itlx-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
    public isLoggedIn = false;
    private ngUnsubscribe = new Subject<void>();

    constructor(
        private interactionService: InteractionService,
        private authService: AuthService,
    ) {
    }

    public ngOnInit() {
        this.authService.getUser()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(user => {
                this.isLoggedIn = user ? true : false;
            });
    }

    public toggleSideMenu() {
        this.interactionService.onToggleSideMenu();
    }

    public ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
