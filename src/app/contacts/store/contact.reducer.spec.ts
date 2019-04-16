import * as ContactActions from './contact.actions';

import {
  contactReducer,
  initialState,
} from './contact.reducer';


describe('ContactReducer', () => {
  const fakeContactList = [{ email: 'test.email' }, { email: 'test.email' }, { email: 'test.email' }];
  const fakeContact = { contactId: '1', firstName: 'Jack', familyName: 'Sparrow' };

  it(`should handle ${ContactActions.FETCH_CONTACTS}`, () => {
    const action = new ContactActions.FetchContacts(0);
    const nextState = contactReducer(undefined, action);
    expect(nextState.loading).toBeTruthy();
  });
  it(`should handle ${ContactActions.FETCH_CONTACT}`, () => {
    const action = new ContactActions.FetchContact(0);
    const nextState = contactReducer(undefined, action);
    expect(nextState.loadingSingle).toBeTruthy();
  });
  it(`should handle ${ContactActions.SET_CONTACTS}`, () => {
    const action = new ContactActions
      .SetContacts({ rows: fakeContactList, limit: 10, total: 10, offset: 0 });
    const nextState = contactReducer(undefined, action);
    expect(nextState.list.length).toEqual(fakeContactList.length);
  });
  it(`should handle ${ContactActions.SET_CONTACT}`, () => {
    const action = new ContactActions
      .SetContact(fakeContact);
    const nextState = contactReducer(undefined, action);
    expect(nextState.selectedContact).toEqual(fakeContact);
  });

  it(`should handle ${ContactActions.SAVE_CONTACT}`, () => {
    const action = new ContactActions
      .SaveContact(fakeContact);
    const nextState = contactReducer(undefined, action);
    expect(nextState.loadingSingle).toBeTruthy();
  });
  it(`should handle ${ContactActions.CLEAR_CONTACTS}`, () => {
    const action1 = new ContactActions
      .SetContacts({ rows: fakeContactList, limit: 10, total: 10, offset: 0 });
    const nextState1 = contactReducer(undefined, action1);
    const action2 = new ContactActions
      .ClearContacts();
    const nextState = contactReducer(nextState1, action2);
    expect(nextState.list.length).toEqual(0);
  });
});
