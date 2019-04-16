import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Contact } from './contact.model';
import * as ContactActions from './store/contact.actions';
import * as fromContacts from './store/contact.reducer';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit, OnDestroy {

  contactStore$: Observable<fromContacts.State>;
  contacts = [];
  loading = false;
  offset = 0;
  total = 0;


  constructor(
    private router: Router,
    private store: Store<fromContacts.AppState>) {
  }

  ngOnInit() {
    this.contactStore$ = this.store.select('contact');
    this.store.dispatch(new ContactActions.FetchContacts(this.offset));

  }

  ngOnDestroy() {
    this.store.dispatch(new ContactActions.ClearContacts());
  }

  loadMore() {
    this.offset += 10;
    this.store.dispatch(new ContactActions.FetchContacts(this.offset));
  }

  selectContact(contact: Contact) {
    this.router.navigate(['contacts/' + contact.contactId]);
  }

}
