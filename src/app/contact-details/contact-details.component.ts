import { Contact } from './../contacts/contact.model';
import { ContactDetailEditModalComponent } from './contact-detail-edit-modal/contact-detail-edit-modal.component';
import { ContactService } from './../contacts/contact.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { flatMap } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  contact: Contact = {};
  bsModalRef: BsModalRef;
  percentageFinished = 0;
  showSuccess = false;
  details: string[] = ['firstName', 'familyName', 'msisdn', 'street', 'zip', 'city', 'email'];

  constructor(private route: ActivatedRoute, private contactService: ContactService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.loadContact();
  }

  loadContact() {
    this.route.params.pipe(flatMap(((params: Params) => {
      return this.contactService.getContactById(params.id);
    }))).subscribe((contact: Contact) => this.handleContact(contact));
  }

  handleContact(contact: Contact) {
    this.contact = contact;
    let percentage = 0;
    this.details.forEach((prop) => {
      percentage += contact[prop] || contact[prop].length > 0 ? (100 / this.details.length) : 0;
    });
    this.percentageFinished = percentage;
  }

  edit() {
    const initialState = {
      contact: this.contact
    };
    this.bsModalRef = this.modalService.show(ContactDetailEditModalComponent, { initialState });
    this.bsModalRef.content.saveInfo.pipe(flatMap((savedContactDetails: Contact) => {
      return this.contactService.updateContact(savedContactDetails);
    }))
      .subscribe((savedContact: Contact) => {
        this.showSuccess = true;
        this.handleContact(savedContact);
      });
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}
