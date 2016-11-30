import { CollectionObject } from './collection-object.model';

export interface Wish extends CollectionObject{
    title: string;
    createdOn: Date;
    owner?: string;
}