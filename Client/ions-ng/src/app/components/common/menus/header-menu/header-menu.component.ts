import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '../../../../models';
import { AuthService, InteractionService } from '../../../../services';


@Component({
    selector: 'itlx-header-menu',
    templateUrl: './header-menu.component.html',
    styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {
    public Constants = Constants;

    constructor(
        private router: Router,
        private authService: AuthService,
        private interactionService: InteractionService,
    ) {}

    public ngOnInit() {}   
    
    public onMenuItemClick(page: string) {
        this.router.navigate(['_', page]);
    }

    public onChatMenuClick() {
        this.interactionService.onToggleRightSideMenu();
    }

    public onLogout() {
        this.authService.logout();
        this.router.navigate(['_']);
    }
}
