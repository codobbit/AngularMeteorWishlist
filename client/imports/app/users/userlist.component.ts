import {Component} from "@angular/core";
import template from './userlist.component.html';
import {CanActivate} from '@angular/router';
import {Users} from '../../../../both/collections/users.collection';
import {User} from '../../../../both/models/user.model';
import {Observable} from "rxjs";


@Component({
    selector: 'userlist',
    template
})

export class UserlistComponent implements CanActivate {
    users: Observable<User>;


    constructor() {
        this.users = Users.find({
            _id: {
                $ne: Meteor.userId()
            }
        }).zone();
        // var displayusers = [];
        // this.users.forEach(function(user) {
        //     user.emails.forEach(function() {
        //         displayusers.push({
        //             id: user._id,
        //             email: user.emails[0].address
        //         });
        //     });
        // });
    }

    canActivate() {
        const user = this.users.findOne(Meteor.userId());
        return user;
    }


}
