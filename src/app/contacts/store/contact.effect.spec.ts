import { HttpClientModule } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Observable, of, ReplaySubject } from 'rxjs';
import { inject, TestBed } from '@angular/core/testing';
import { ContactService } from './../contact.service';
import * as ContactActions from './contact.actions';
import { provideMockActions } from '@ngrx/effects/testing';

import {
    contactReducer,
    initialState,
} from './contact.reducer';
import { ContactEffects } from './contact.effect';
import { first } from 'rxjs/operators';


describe('ContactEffect', () => {
    const fakeContactList = [{ email: 'test.email' }, { email: 'test.email' }, { email: 'test.email' }];
    const fakeContact = { contactId: '1', firstName: 'Jack', familyName: 'Sparrow' };
    let effects: ContactEffects;
    let contactService: ContactService;
    let actions$: ReplaySubject<Action>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ContactEffects,
                ContactService,
                provideMockActions(() => actions$)
            ],
            imports: [HttpClientModule]
        });

        actions$ = new ReplaySubject(1);
    }
    );

    beforeEach(inject([ContactEffects, ContactService], (e, a) => {
        effects = e;
        contactService = a;
    }));

    it(`should return ${ContactActions.SET_CONTACTS} action when ${ContactActions.FETCH_CONTACTS}
  has been dispatched `, () => {
            const response = {
                limit: 1,
                offset: 0,
                total: 1,
                rows: fakeContactList,
            };
            spyOn(contactService, 'getContacts').and.returnValue(of(response));
            actions$.next(new ContactActions.FetchContacts(0));

            effects.contactsFetch.pipe(first()).subscribe((result) => {
                expect(result).toEqual(new ContactActions.SetContacts(response));
            });

        });

    it(`should return ${ContactActions.SET_CONTACT} action when ${ContactActions.FETCH_CONTACT}
        has been dispatched `, () => {
            spyOn(contactService, 'getContact').and.returnValue(of(fakeContact));
            actions$.next(new ContactActions.FetchContact(0));

            effects.contactFetch.pipe(first()).subscribe((result) => {
                expect(result).toEqual(new ContactActions.SetContact(fakeContact));
            });

        });

    it(`should return ${ContactActions.SET_CONTACT} action when ${ContactActions.FETCH_CONTACT}
        has been dispatched `, () => {
            spyOn(contactService, 'saveContact').and.returnValue(of(fakeContact));
            actions$.next(new ContactActions.SaveContact(fakeContact));

            effects.contactSave.pipe(first()).subscribe((result) => {
                expect(result).toEqual(new ContactActions.SetContact(fakeContact));
            });

        });


});
