import { GetContactResponse, Contact } from './../contact.model';
import * as  ContactActions from './contact.actions';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ContactEffects {
    token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJlYUVtcGxveWVlSWQiOiI0YzM1MC1mYzZmOS03NGFmYi1jY2Q0ZS0wYjNhNS0yYWYyZi05MjEzNS1jNGE2MCIsImVhT2ZmaWNlSWQiOiI0NGU4Yi1jODlhNy1lNDBiMi1mN2MyYi1iODVkZS02MzgyYS0xNDdkNi00ZDg3NyIsImVtcGxveWVlRW1haWwiOiJkZXZlbG9wZXJAcXVlZHJvLmNvbSIsIm9yaWdpbiI6ImluaG91c2UiLCJyb2xlcyI6WyJjcm0yIGFkbWlucyIsImFkbWluIl0sInN1YiI6ImlzYWJlbGxhIiwiZXhwIjoxNTU1MDc1MDc5LCJpYXQiOjE1NTQ5ODg2Nzl9.Bo6aQ4cjrtyuOCwoIqiiQtvgR-znbrfk4G4htAkgrKVzzvtvx3RUg7ovHqTfmyt8WJJPQL4B7O1GQ-rJUC_KNg';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.token
        })
    };

    @Effect()
    contactsFetch = this.actions$.pipe(ofType(ContactActions.FETCH_CONTACTS),
        switchMap((action: ContactActions.FetchContacts) => {
            return this.httpClient.get<GetContactResponse>(`http://localhost:9000/proxy/api/contacts?sortBy=firstName&` +
                `sortOrder=asc&eaEmployeeId=28eda-c1d01-16ed4-4c4ba-fb897-09c08-e5c13-295f8&limit=10&offset=${(action.payload ? action.payload : 0)}`, this.httpOptions);
        }),
        map((response: GetContactResponse) => {
            return new ContactActions.SetContacts(response);
        }));

    @Effect()
    contactFetch = this.actions$.pipe(ofType(ContactActions.FETCH_CONTACT),
        switchMap((action: ContactActions.FetchContact) => {
            return this.httpClient.get<Contact>(`http://localhost:9000/proxy/api/contacts/${action.payload}`, this.httpOptions);
        }),
        map((response: Contact) => {
            return new ContactActions.SetContact(response);
        }));

    @Effect()
    contactSave = this.actions$.pipe(ofType(ContactActions.SAVE_CONTACT),
        switchMap((action: ContactActions.SaveContact) => {
            return this.httpClient.patch<Contact>(`http://localhost:9000/proxy/api/contacts/${action.payload.contactId}`, action.payload, this.httpOptions);
        }),
        map((response: Contact) => {
            return new ContactActions.SetContact(response);
        }));

    constructor(private actions$: Actions, private httpClient: HttpClient) { }

}