import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ShoppingListService} from "../../services/shopping-list";
import {Ingredient} from "../../models/ingredient";

@Component({
    selector: 'page-shopping-list',
    templateUrl: 'shopping-list.html',
})

export class ShoppingListPage {

    items: Ingredient[];

    constructor(private slService: ShoppingListService) {
    }

    ionViewWillEnter() {
        this.loadItems();
    }

    onAddItem(form: NgForm) {
        this.slService.addItem(form.value.ingredientName, form.value.amount);
        form.reset();
        this.loadItems();
    }

    private loadItems () {
        this.items = this.slService.getItems();
    }
}
