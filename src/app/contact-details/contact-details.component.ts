import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Contact } from './../contacts/contact.model';
import { ContactDetailEditModalComponent } from './contact-detail-edit-modal/contact-detail-edit-modal.component';
import { ContactService } from './../contacts/contact.service';
import * as  ContactActions from './../contacts/store/contact.actions';
import * as fromContacts from './../contacts/store/contact.reducer';


@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {

  selectedContact$: Observable<Contact>;
  bsModalRef: BsModalRef;
  percentageFinished = 0;
  showSuccess = false;
  details: string[] = ['firstName', 'familyName', 'msisdn', 'street', 'zip', 'city', 'email'];

  constructor(
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private store: Store<fromContacts.AppState>) { }

  ngOnInit() {
    this.loadContact();
  }

  loadContact() {
    this.selectedContact$ = this.store.select('contact').pipe(map((contact: fromContacts.State) => contact.selectedContact));
    this.store.dispatch(new ContactActions.FetchContact(this.route.snapshot.params.id));
    this.selectedContact$.subscribe((contact: Contact) => {
      if (contact) {
        this.handleContact(contact);
      }

    });
  }

  handleContact(contact: Contact) {
    let percentage = 0;
    this.details.forEach((prop) => {
      percentage += contact[prop] || contact[prop].length > 0 ? (100 / this.details.length) : 0;
    });
    this.percentageFinished = percentage;
  }

  edit() {
    const initialState = {
      selectedContact$: this.selectedContact$
    };
    this.bsModalRef = this.modalService.show(ContactDetailEditModalComponent, { initialState });
    this.bsModalRef.content.saveInfo
      .subscribe((contact: Contact) => {
        this.store.dispatch(new ContactActions.SaveContact(contact));
      });
  }

}
