import { Meteor } from 'meteor/meteor';
import { MongoObservable } from 'meteor-rxjs';
import {Wish} from '../models/wish.model'

export const Wishlist = new MongoObservable.Collection<Wish>('wishlist');

function loggedIn() {
 return !!Meteor.user();
}

Wishlist.allow({
 insert: loggedIn,
 update: loggedIn,
 remove: loggedIn
});