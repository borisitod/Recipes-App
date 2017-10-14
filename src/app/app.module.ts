import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {EditRecipePage} from "../pages/edit-recipe/edit-recipe";
import {RecipePage} from "../pages/recipe/recipe";
import {RecipesPage} from "../pages/recipes/recipes";
import {TabsPage} from "../pages/tabs/tabs";
import {ShoppingListPage} from "../pages/shopping-list/shopping-list";
import {ShoppingListService} from "../services/shopping-list";
import {RecipesService} from "../services/recipes";
import {SignupPage} from "../pages/signup/signup";
import {SigninPage} from "../pages/signin/signin";
import {AuthService} from "../services/auth";

import {HttpModule} from "@angular/http";
import {DatabaseOptionsPage} from "../pages/database-options/database-options";

@NgModule({
    declarations: [
        MyApp,
        EditRecipePage,
        RecipePage,
        RecipesPage,
        TabsPage,
        ShoppingListPage,
        SignupPage,
        SigninPage,
        DatabaseOptionsPage
    ],
    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        EditRecipePage,
        RecipePage,
        RecipesPage,
        TabsPage,
        ShoppingListPage,
        SignupPage,
        SigninPage,
        DatabaseOptionsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        ShoppingListService,
        RecipesService,
        AuthService,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
