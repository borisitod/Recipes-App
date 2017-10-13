import {Component, ViewChild} from '@angular/core';
import {AlertController, LoadingController, MenuController, NavController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TabsPage} from "../pages/tabs/tabs";
import {SigninPage} from "../pages/signin/signin";
import {SignupPage} from "../pages/signup/signup";
import firebase from 'firebase';
import {AuthService} from "../services/auth";


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = TabsPage;
    signinPage = SigninPage;
    signupPage = SignupPage;
    isAuthenticated = false;
    @ViewChild('nav') nav: NavController;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController, private authService: AuthService,
                private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
        firebase.initializeApp({
            apiKey: "AIzaSyCyCplWnFwPJfIncSTtHwAGcFC1l3P7dFs",
            authDomain: "ionic-recipesbook.firebaseapp.com"
        })
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.isAuthenticated = true;
                this.rootPage = TabsPage;
            } else {
                this.isAuthenticated = false;
                this.rootPage = SigninPage;
            }
        });
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }

    onLoad(page: any) {
        this.nav.setRoot(page);
        this.menuCtrl.close();
    }

    onLogout() {
        const loading = this.loadingCtrl.create({
            content: 'Logging you out...'
        });
        loading.present();
        this.authService.logout()
            .then(data => {
                loading.dismiss();
                this.menuCtrl.close();
                this.nav.setRoot(SigninPage);
            })
            .catch(error => {
                loading.dismiss();
                const alert = this.alertCtrl.create({
                    title: 'Signup failed',
                    message: error.message,
                    buttons: ['Ok']
                });
                alert.present();
            })

    }
}

