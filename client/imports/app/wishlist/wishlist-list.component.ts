import {Component, OnInit, OnDestroy} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CanActivate } from '@angular/router';

import { Wishlist } from '../../../../both/collections/wishlist.collections';
import { Wish } from '../../../../both/models/wish.model';

import template from './wishlist-list.component.html';
import {InjectUser} from "angular2-meteor-accounts-ui";

@Component({
    selector: 'wishlist-list',
    template
})
@InjectUser('user')
export class WishlistListComponent implements CanActivate, OnInit{
    wishlist: Observable<Wish[]>;
    user: Meteor.User;
    // wishlistSubscription: Subscription;


    constructor() {
        if (Meteor.userId()) {
            var  userid=Meteor.userId();

        }else {
            this.wishlist = Wishlist.find({});
        }
    }
    ngOnInit() {
        this.wishlist = this.wishlist = Wishlist.find({"owner": Meteor.userId()}).zone();
        // this.wishlistSubscription = MeteorObservable.subscribe('parties').subscribe();
    }

    removeWish(wish: Wish): void {
        Wishlist.remove(wish._id);
    }
    canActivate() {
        const wish = Wishlist.findOne(this.wishId);
        return (wish && wish.owner == Meteor.userId());
    }

}