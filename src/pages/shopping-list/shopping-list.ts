import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ShoppingListService} from "../../services/shopping-list";
import {Ingredient} from "../../models/ingredient";
import {PopoverController} from "ionic-angular";
import {SlOptionsPage} from "./sl-options/sl-options";
import {AuthService} from "../../services/auth";

@Component({
    selector: 'page-shopping-list',
    templateUrl: 'shopping-list.html',
})

export class ShoppingListPage {

    items: Ingredient[];

    constructor(private slService: ShoppingListService, private popover: PopoverController, private authService: AuthService) {
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
        const popover = this.popover.create(SlOptionsPage);
        popover.present({ev: event});
        popover.onDidDismiss(data => {
            if (data.action == 'load') {

            } else {
                this.authService.getActiveUser().getToken()
                    .then(
                        (token: string) => {
                            this.slService.storeList(token)
                                .subscribe(
                                    () => console.log('Success'),
                                    error => {
                                        console.log(error);
                                    }
                            )

                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        })

    }

    private loadItems () {
        this.items = this.slService.getItems();
    }
}
