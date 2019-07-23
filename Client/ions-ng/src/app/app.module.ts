import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule } from "@angular/common/http";
import {
    SocialLoginModule,
    AuthServiceConfig,
    FacebookLoginProvider
} from "angularx-social-login";
import { AppRoutingModule } from "./app.routing.module";
import { AgmCoreModule } from "@agm/core";

import { AppComponent } from "./app.component";
import {
    HeaderComponent,
    SearchBarComponent,
    LoginComponent,
    HeaderMenuComponent,
    SideMenuComponent,
    LandingComponent,
    MainComponent,
    UserComponent,
    IonsPeopleListComponent,
    ChatComponent,
    ProfileComponent,
    TimelineComponent,
    MapComponent,
    MapdialogComponent,
    UserinfoComponent,
    HomeinfoComponent,
    PostComponent,
    CreatePostComponent,
    PostsComponent,
    CommentDialog
} from "./components";

import { GraphQLConfigModule } from './graphql';

import {
    MatGridListModule,
    MatRadioModule,
    MatButtonModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatStepperModule,
    MatTableModule,
    MatTooltipModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatPaginatorModule,
    MatDialogModule,
    MatDividerModule,
    MatSortModule,
    MatMenuModule,
    MatExpansionModule,
    MatAutocompleteModule,
} from "@angular/material";

import {
    HttpService,
    InteractionService,
    AuthService,
    ConfigService,
    MapApiService,
    UserValidatorService,
    LocationService,
    UserApiService,
    HomeApiService
} from "./services";

let config = new AuthServiceConfig([
    {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("853617288343751")
    }
]);

export function provideConfig() {
    return config;
}
@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SearchBarComponent,
        LoginComponent,
        HeaderMenuComponent,
        SideMenuComponent,
        LandingComponent,
        MainComponent,
        UserComponent,
        ChatComponent,
        ProfileComponent,
        TimelineComponent,
        IonsPeopleListComponent,
        MapComponent,
        MapdialogComponent,
        UserinfoComponent,
        HomeinfoComponent,
        CreatePostComponent,
        PostComponent,
        PostsComponent,
        CommentDialog,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        MatGridListModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        MatRadioModule,
        MatButtonModule,
        MatChipsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatStepperModule,
        MatTableModule,
        MatTabsModule,
        MatTooltipModule,
        MatIconModule,
        MatCheckboxModule,
        MatSelectModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatCardModule,
        MatPaginatorModule,
        MatDialogModule,
        MatDividerModule,
        MatSortModule,
        MatMenuModule,
        MatExpansionModule,
        MatAutocompleteModule,
        SocialLoginModule,
        GraphQLConfigModule,
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyDFTKbcSXEN22pUx3zfaabEOGyy7oOZtmI"
        }),
    ],
    providers: [
        HttpService,
        InteractionService,
        AuthService,
        ConfigService,
        MapApiService,
        UserApiService,
        HomeApiService,
        UserValidatorService,
        LocationService,
        {
            provide: AuthServiceConfig,
            useFactory: provideConfig
        }
    ],
    bootstrap: [AppComponent],
    entryComponents: [MapdialogComponent, CommentDialog]
})
export class AppModule { }
