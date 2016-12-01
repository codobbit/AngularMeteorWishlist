import { Wishlist } from '../../../both/collections/wishlist.collections';
import { Wish } from '../../../both/models/wish.model';

export function loadWishlist() {
    if (Wishlist.find().cursor.count() === 0) {
        const wishlist: Wish[] = [{
            title: 'iPhone SE 64GB',
            createdOn: new Date(),
        }, {
            title: 'The Picture of Dorian Grey by Oscar Wilde',
            createdOn: new Date(),
        }, {
            title: 'Necronomicon by H.P. Lovecraft',
            createdOn: new Date(),
        }];

        wishlist.forEach((wish: Wish) => Wishlist.insert(wish));
    }
}