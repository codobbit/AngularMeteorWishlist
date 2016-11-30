import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, CanActivate} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/map';

import {Wish} from "../../../../both/models/wish.model";
import {Wishlist} from "../../../../both/collections/wishlist.collections";
import {InjectUser} from "angular2-meteor-accounts-ui";
import {User} from "../../../../both/models/user.model";
import {Users} from "../../../../both/collections/users.collection";
import {Observable} from "rxjs";

import template from './user-details.component.html';
import {MeteorObservable} from "meteor-rxjs";

@Component({
    selector: 'wish-details',
    template
})

@InjectUser('user')
export class SelectedUserWishlistComponent{
    userId: string;
    userWishlist: Observable<Wish[]>;

    constructor() {

        if (Meteor.userId()) {
            this.userWishlist = Wishlist.find({"owner": this.userId}).zone();
            console.log(this.userWishlist);
        } else {
            this.userWishlist = Wishlist.find({});
            console.log("No user");
            console.log(this.userWishlist);
        }
    }

}