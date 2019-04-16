import { GetContactResponse } from './../contact.model';
import { Action } from '@ngrx/store';
import { Contact } from '../contact.model';

export const SET_CONTACTS = 'SET_CONTACTS';
export const SET_CONTACT = 'SET_CONTACT';
export const FETCH_CONTACTS = 'FETCH_CONTACTS';
export const FETCH_CONTACT = 'FETCH_CONTACT';
export const SAVE_CONTACT = 'SAVE_CONTACT';
export const CLEAR_CONTACTS = 'CLEAR_CONTACTS';

export class SetContacts implements Action {
    readonly type = SET_CONTACTS;
    constructor(public payload: GetContactResponse) { }
}

export class SetContact implements Action {
    readonly type = SET_CONTACT;
    constructor(public payload: Contact) { }
}

export class FetchContacts implements Action {
    readonly type = FETCH_CONTACTS;
    constructor(public payload: number) { }
}

export class FetchContact implements Action {
    readonly type = FETCH_CONTACT;
    constructor(public payload: number) { }
}

export class SaveContact implements Action {
    readonly type = SAVE_CONTACT;
    constructor(public payload: Contact) { }
}

export class ClearContacts implements Action {
    readonly type = CLEAR_CONTACTS;
}

export type ContactActions =
    FetchContacts |
    FetchContact |
    SetContacts |
    SetContact |
    SaveContact |
    ClearContacts;
