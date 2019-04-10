import { Contact } from './../../contacts/contact.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-detail-edit-modal',
  templateUrl: './contact-detail-edit-modal.component.html',
  styleUrls: ['./contact-detail-edit-modal.component.scss']
})
export class ContactDetailEditModalComponent implements OnInit {

  @Output() saveInfo: EventEmitter<Contact> = new EventEmitter();
  detailForm: FormGroup;
  contact: Contact;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.setupForm();
    this.setFormValidators();
  }

  setupForm() {
    this.detailForm = new FormGroup({
      firstName: new FormControl(this.contact.firstName, Validators.required),
      familyName: new FormControl(this.contact.familyName, Validators.required),
      msisdn: new FormControl({ value: this.contact.msisdn, disabled: true }),
      address: new FormGroup({
        street: new FormControl(this.contact.street),
        zip: new FormControl(this.contact.zip),
        city: new FormControl(this.contact.city)
      }),
      email: new FormControl(this.contact.email, [Validators.email, Validators.required])
    });
  }

  setFormValidators() {
    const emailInput = this.detailForm.get('email');
    const streetInput = this.detailForm.get('address.street');
    const zipInput = this.detailForm.get('address.zip');
    const cityInput = this.detailForm.get('address.city');

    this.detailForm.get('address').valueChanges.subscribe(address => {
      if (address.street.length > 0 && address.zip.length > 0 && address.city.length > 0) {
        emailInput.setValidators(null);
      } else {
        emailInput.setValidators([Validators.email, Validators.required]);
      }
      emailInput.updateValueAndValidity({ emitEvent: false });
    });

    this.detailForm.get('email').valueChanges.subscribe(email => {
      if (email.length > 0) {
        streetInput.setValidators(null);
        zipInput.setValidators(null);
        cityInput.setValidators(null);

      } else {
        streetInput.setValidators(Validators.required);
        zipInput.setValidators(Validators.required);
        cityInput.setValidators(Validators.required);
      }
      streetInput.updateValueAndValidity({ emitEvent: false });
      zipInput.updateValueAndValidity({ emitEvent: false });
      cityInput.updateValueAndValidity({ emitEvent: false });
    });
  }

  onSave() {
    const { street, zip, city } = this.detailForm.value.address;
    delete this.detailForm.value.address;
    this.saveInfo.emit(Object.assign({}, this.detailForm.value, { contactId: this.contact.contactId, street, zip, city }));
    this.bsModalRef.hide();
  }


}
