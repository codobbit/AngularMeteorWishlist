import {Component, OnInit, OnDestroy} from '@angular/core';
import { Template } from 'meteor/templating';


import 'rxjs/add/operator/map';

import {Wish} from "../../../../both/models/wish.model";
import {Wishlist} from "../../../../both/collections/wishlist.collections";
import {InjectUser} from "angular2-meteor-accounts-ui";
import {User} from "../../../../both/models/user.model";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';



import template from './user-details.component.html';
import {ActivatedRoute, CanActivate} from "@angular/router";
import {Users} from "../../../../both/collections/users.collection";

@Component({
    selector: 'wish-details',
    template
})

// @InjectUser('user')
export class SelectedUserWishlistComponent implements CanActivate, OnDestroy{
    userId: string;
    paramsSub: Subscription;
    user: User;
    userWishlist: Observable<Wish[]>;
    selectedWish: Wish;

    constructor(private route: ActivatedRoute) {
        this.paramsSub = this.route.params.map(params => params['userId'])
            .subscribe(userId => {this.userId = userId;
                this.user = Users.findOne(this.userId)});

        if (Meteor.userId()) {
            this.userWishlist = Wishlist.find({"owner": this.userId}).zone();
        } else {
            this.userWishlist = Wishlist.find({});
        }
    }

    // ngOnInit() {
    //     this.paramsSub = this.route.params.map(params => params['userId'])
    //         .subscribe(userId => {this.userId = userId;
    //             this.user = Users.findOne(this.userId)});
    // console.log(this.userId);
    // }


    isReserved = function (wish: Wish){
        if (!wish.reserved) return false;
        else return true;
    }

    reserveWish(wish: Wish){
        console.log(wish._id);
        Wishlist.update(wish._id, {
            $set: {
                reserved: true
            }
        });
    }
    ngOnDestroy() {
        this.paramsSub.unsubscribe();
    }


}