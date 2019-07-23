import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent, MainComponent } from './components';

const MAINMENU_ROUTES: Routes = [
    { path: '', redirectTo: '/_', pathMatch: 'full'},
    { path: '_', component: LandingComponent },
    { path: '_/:page', component: MainComponent } 
]

@NgModule({
    imports: [ RouterModule.forRoot(MAINMENU_ROUTES, { enableTracing: false }) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }
