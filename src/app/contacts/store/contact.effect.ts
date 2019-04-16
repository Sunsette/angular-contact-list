import { ContactService } from './../contact.service';
import { GetContactResponse, Contact } from './../contact.model';
import * as  ContactActions from './contact.actions';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, switchMap, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ContactEffects {
    token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJlYUVtcGxveWVlSWQiOiI0YzM1MC1mYzZmOS03NGFmYi1jY2Q0ZS0wYjNhNS0yYWYyZi05MjEzNS1jNGE2MCIsImVhT2ZmaWNlSWQiOiI0NGU4Yi1jODlhNy1lNDBiMi1mN2MyYi1iODVkZS02MzgyYS0xNDdkNi00ZDg3NyIsImVtcGxveWVlRW1haWwiOiJkZXZlbG9wZXJAcXVlZHJvLmNvbSIsIm9yaWdpbiI6ImluaG91c2UiLCJyb2xlcyI6WyJjcm0yIGFkbWlucyIsImFkbWluIl0sInN1YiI6ImlzYWJlbGxhIiwiZXhwIjoxNTU1NDg4NjgyLCJpYXQiOjE1NTU0MDIyODJ9.u3cUQpH_56wg2zj-M2Aj9JDMRnpgMqbWENtbi7QGfSXmPK6vITULWRpfNh77ov69Eg0erDlvGzSXUQFFNbBVFQ';
    host = 'http://localhost:9000/proxy/api';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.token
        })
    };

    @Effect()
    contactsFetch = this.actions$.pipe(ofType(ContactActions.FETCH_CONTACTS),
        switchMap((action: ContactActions.FetchContacts) => this.contactService.getContacts(action)),
        map((response: GetContactResponse) => {
            return new ContactActions.SetContacts(response);
        }));

    @Effect()
    contactFetch = this.actions$.pipe(ofType(ContactActions.FETCH_CONTACT),
        switchMap((action: ContactActions.FetchContact) => this.contactService.getContact(action)),
        map((response: Contact) => {
            return new ContactActions.SetContact(response);
        }));

    @Effect()
    contactSave = this.actions$.pipe(ofType(ContactActions.SAVE_CONTACT),
        switchMap((action: ContactActions.SaveContact) => this.contactService.saveContact(action)),
        map((response: Contact) => {
            return new ContactActions.SetContact(response);
        }));

    constructor(private actions$: Actions, private httpClient: HttpClient, private contactService: ContactService) { }

}