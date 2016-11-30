import { Route } from '@angular/router';
import { Meteor } from 'meteor/meteor';

import { WishlistListComponent } from './wishlist/wishlist-list.component';
import { WishDetailsComponent } from './wishlist/wish-details.component';
import { UserlistComponent } from './users/userlist.component';
import {SelectedUserWishlistComponent} from "./users/user-details.component";

export const routes: Route[] = [
    { path: '', component: WishlistListComponent },
    { path: 'wish/:wishId', component: WishDetailsComponent, canActivate: ['canActivateForLoggedIn'] },
    { path: 'users', component: UserlistComponent, canActivate: ['canActivateForLoggedIn']  },
    { path: 'users/:userId', component: SelectedUserWishlistComponent, canActivate: ['canActivateForLoggedIn']  },
];

export const ROUTES_PROVIDERS = [{
    provide: 'canActivateForLoggedIn',
    useValue: () => !! Meteor.userId()
}];