import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ShoppingListService} from "../../services/shopping-list";
import {Ingredient} from "../../models/ingredient";
import {PopoverController} from "ionic-angular";
import {SlOptionsPage} from "./sl-options/sl-options";

@Component({
    selector: 'page-shopping-list',
    templateUrl: 'shopping-list.html',
})

export class ShoppingListPage {

    items: Ingredient[];

    constructor(private slService: ShoppingListService, private popover: PopoverController) {
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
    }

    private loadItems () {
        this.items = this.slService.getItems();
    }
}
