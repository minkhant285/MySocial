import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class InteractionService {
    private toggleSideMenu$ = new BehaviorSubject<void>(undefined);
    private toggleRightSideMenu$ = new BehaviorSubject<void>(undefined);

    public sideMenuToggle(): Observable<void> {
        return this.toggleSideMenu$.asObservable();
    }

    public onToggleSideMenu() {
        this.toggleSideMenu$.next();
    }

    public rightSideMenuToggle(): Observable<void> {
        return this.toggleRightSideMenu$.asObservable();
    }

    public onToggleRightSideMenu() {
        this.toggleRightSideMenu$.next();
    }
}
