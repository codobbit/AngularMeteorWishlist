import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, CanActivate} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/map';

import template from './wish-details.component.html';
import {Wish} from "../../../../both/models/wish.model";
import {Wishlist} from "../../../../both/collections/wishlist.collections";
import {InjectUser} from "angular2-meteor-accounts-ui";

@Component({
    selector: 'wish-details',
    template
})

@InjectUser('user')
export class WishDetailsComponent implements OnInit, OnDestroy, CanActivate{
    wishId: string;
    paramsSub: Subscription;
    wish: Wish;
    user: Meteor.User;


    constructor(
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.paramsSub = this.route.params.map(params => params['wishId'])
            .subscribe(wishId => {this.wishId = wishId;
        this.wish = Wishlist.findOne(this.wishId)});  }

    saveWish() {
        if (!Meteor.userId()) {
            alert('Please log in to change this wish');
            return;
        }

        Wishlist.update(this.wish._id, {
            $set: {
                title: this.wish.title
            }
        });
    }

    canActivate() {
        const wish = Wishlist.findOne(this.wishId);
        return (wish && wish.owner == Meteor.userId());
    }


    ngOnDestroy() {
        this.paramsSub.unsubscribe();
    }
}