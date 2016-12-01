import { Meteor } from 'meteor/meteor';
import { Wishlist} from '../../../both/collections/wishlist.collections';

Meteor.publish('wishlist', () => Wishlist.find());