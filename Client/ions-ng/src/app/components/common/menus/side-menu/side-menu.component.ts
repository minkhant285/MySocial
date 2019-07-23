import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { InteractionService, AuthService } from '../../../../services';
import { Constants } from '../../../../models';

@Component({
    selector: 'itlx-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
    @ViewChild('sidenav') sidenav;
    @ViewChild('rightSidenav') rightSidenav;

    public Constants = Constants;

    private mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;
    private ngUnsubscribe = new Subject<void>();

    constructor(
        private media: MediaMatcher,
        private cdr: ChangeDetectorRef,
        private interactionService: InteractionService,
        private authService: AuthService,
        private router: Router,
    ) {
        this.mobileQuery = this.media.matchMedia('(max-width: 2000px)');
        this._mobileQueryListener = () => this.cdr.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit() {
        this.toggleSidenav();
        this.toggleRightSidenav();
        
        this.interactionService.sideMenuToggle()
        .pipe(
            takeUntil(this.ngUnsubscribe)
        )
        .subscribe(() => this.toggleSidenav());

        this.interactionService.rightSideMenuToggle()
        .pipe(
            takeUntil(this.ngUnsubscribe)
        )
        .subscribe(() => this.toggleRightSidenav());
    }

    public toggleSidenav() {
        this.sidenav.toggle();
    }

    public toggleRightSidenav() {
        this.rightSidenav.toggle();
    }

    public onLogout() {
        this.toggleSidenav();
        this.authService.logout();
        this.router.navigate(['_']);
    }

    public ngOnDestroy() {
        this.mobileQuery.removeListener(this._mobileQueryListener);
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
