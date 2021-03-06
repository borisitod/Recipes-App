import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ShoppingListService} from "../../services/shopping-list";
import {Ingredient} from "../../models/ingredient";
import {AlertController, LoadingController, PopoverController} from "ionic-angular";
import {DatabaseOptionsPage} from "../database-options/database-options";
import {AuthService} from "../../services/auth";

@Component({
    selector: 'page-shopping-list',
    templateUrl: 'shopping-list.html',
})

export class ShoppingListPage {

    items: Ingredient[];

    constructor(private slService: ShoppingListService,
                private popover: PopoverController,
                private authService: AuthService,
                private loadingCtrl: LoadingController,
                private alertCtrl: AlertController
                ) {
    }

    ionViewWillEnter() {
        this.loadItems();
    }

    onAddItem(form: NgForm) {
        this.slService.addItem(form.value.ingredientName, form.value.amount);
        form.reset();
        this.loadItems();
    }

    onCheckItem(index: number) {
        this.slService.removeItem(index);
        this.loadItems();
    }

    onShowOptions(event: MouseEvent) {
        const loading = this.loadingCtrl.create({
            content: 'Please wait...',
        })
        const popover = this.popover.create(DatabaseOptionsPage);
        popover.present({ev: event});
        popover.onDidDismiss(data => {
            if (!data) {
                return;
            }
            if (data.action == 'load') {
                loading.present();
                this.authService.getActiveUser().getToken()
                    .then(
                        (token: string) => {
                            this.slService.fetchList(token)
                                .subscribe(
                                    (list: Ingredient[]) => {
                                        loading.dismiss();
                                        if (list) {
                                            this.items = list;
                                        } else {
                                            this.items = [];
                                        }
                                    },
                                    error => {
                                        loading.dismiss();
                                        this.handleError(error.json().error);
                                    }
                                )

                        })

            } else if (data.action == 'store') {
                loading.present();
                this.authService.getActiveUser().getToken()
                    .then(
                        (token: string) => {
                            this.slService.storeList(token)
                                .subscribe(
                                    () => {
                                        loading.dismiss();
                                    },
                                    error => {
                                        loading.dismiss();
                                        this.handleError(error.json().error);
                                    }
                            )

                    })
            }
        })

    }

    private loadItems () {
        this.items = this.slService.getItems();
    }

    private handleError(errorMsg: string) {
        const alert = this.alertCtrl.create({
            title: 'An error occurred!',
            message: errorMsg,
            buttons: ['ok']
        })
        alert.present();
    }
}
