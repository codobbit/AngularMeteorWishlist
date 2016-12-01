import {Component, OnInit} from '@angular/core';
import { Meteor } from 'meteor/meteor';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';


import { Wishlist } from '../../../../both/collections/wishlist.collections';
import template from './wishlist-form.components.html';


@Component({
    selector: 'wishlist-form',
    template
})

export class WishlistFormComponent implements OnInit {
    addForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.addForm = this.formBuilder.group({
            title: ['', Validators.required],
            createdOn: new Date(),
        });

    }
    addWish(): void {
        if (!Meteor.userId()) {
            alert('Please log in to add a party');
            return;
        }

        if (this.addForm.valid) {
            Wishlist.insert(Object.assign({}, this.addForm.value, { owner: Meteor.userId(), reserved: false
            }));
            this.addForm.reset();
        }
    }

}