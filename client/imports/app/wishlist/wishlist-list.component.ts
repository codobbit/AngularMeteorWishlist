import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CanActivate } from '@angular/router';

import { Wishlist } from '../../../../both/collections/wishlist.collections';
import { Wish } from '../../../../both/models/wish.model';

import template from './wishlist-list.component.html';
import {InjectUser} from "angular2-meteor-accounts-ui";
import {zone} from "meteor-rxjs";

@Component({
    selector: 'wishlist-list',
    template
})
@InjectUser('user')
export class WishlistListComponent implements CanActivate{
    wishlist: Observable<Wish[]>;
    user: Meteor.User;


    constructor() {
        if (Meteor.userId()) {
            var  userid=Meteor.userId();
            this.wishlist = Wishlist.find({"owner": userid}).zone();
        }else {
            this.wishlist = Wishlist.find({});
            console.log("No user");

        }
    }

    removeWish(wish: Wish): void {
        Wishlist.remove(wish.createdOn);
    }
    canActivate() {
        const wish = Wishlist.findOne(this.wishId);
        return (wish && wish.owner == Meteor.userId());
    }

}