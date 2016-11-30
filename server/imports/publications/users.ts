import { Meteor } from 'meteor/meteor';

import { Wishlist } from '../../../both/collections/wishlist.collections';

Meteor.publish('unsubscribed', function (userId: string) {
    const thisuser = Wishlist.findOne(userId);

    if (!userId) {
        throw new Meteor.Error('404', 'No such user!');
    }

    return Meteor.users.find({
        _id: {
            $ne: this.userId
        }});
});