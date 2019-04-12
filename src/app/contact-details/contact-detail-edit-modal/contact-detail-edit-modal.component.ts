import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';

import { Observable } from 'rxjs';

import { Contact } from './../../contacts/contact.model';

@Component({
  selector: 'app-contact-detail-edit-modal',
  templateUrl: './contact-detail-edit-modal.component.html',
  styleUrls: ['./contact-detail-edit-modal.component.scss']
})
export class ContactDetailEditModalComponent implements OnInit {

  @Output() saveInfo: EventEmitter<Contact> = new EventEmitter();
  detailForm: FormGroup;
  selectedContact$: Observable<Contact>;
  id: string;

  constructor(public bsModalRef: BsModalRef) { }

  get email() {
    return this.detailForm.get('email');
  }

  get address() {
    return this.detailForm.get('address') as FormGroup;
  }

  ngOnInit() {
    this.setupForm();
    this.setFormValidators();
  }

  setupForm() {
    this.selectedContact$.subscribe((contact) => {
      this.id = contact.contactId;
      this.detailForm = new FormGroup({
        firstName: new FormControl(contact.firstName, Validators.required),
        familyName: new FormControl(contact.familyName, Validators.required),
        msisdn: new FormControl({ value: contact.msisdn, disabled: true }),
        address: new FormGroup({
          street: new FormControl(contact.street),
          zip: new FormControl(contact.zip),
          city: new FormControl(contact.city)
        }),
        email: new FormControl(contact.email, [Validators.email, Validators.required])
      });
    });
  }

  setFormValidators() {
    this.handleAddressChanges();
    this.handleEmailChanges();
    this.selectedContact$.subscribe((contact: Contact) => {
      this.setAddressValidators(contact);
      this.setEmailValidators(contact.email);
    });
  }

  handleAddressChanges() {
    this.address.valueChanges.subscribe(address => this.setAddressValidators(address));
  }

  setAddressValidators(address) {
    this.email.setValidators(this.isAdressSet(address) ? null : this.getEmailValidators());
    this.email.updateValueAndValidity({ emitEvent: false });
  }

  handleEmailChanges() {
    this.email.valueChanges.subscribe(email => this.setEmailValidators(email));
  }

  setEmailValidators(email) {
    Object.values(this.address.controls).forEach((formControl: FormControl) => {
      formControl.setValidators(email.length > 0 ? null : Validators.required);
      formControl.updateValueAndValidity({ emitEvent: false });
    });
  }

  getEmailValidators() {
    return [Validators.email, Validators.required];
  }

  isAdressSet(obj): boolean {
    return obj.street.length > 0 && obj.zip.length > 0 && obj.city.length > 0;
  }

  onSave() {
    const contact: any = this.getDirtyValues(this.detailForm);
    contact.contactId = this.id;
    this.saveInfo.emit(contact.address ? this.flatenAddress(contact) : contact);
    this.bsModalRef.hide();
  }

  flatenAddress(obj) {
    const addressObj = { ...obj.address };
    delete obj.address;
    return { ...obj, ...addressObj };
  }

  getDirtyValues(form: any) {
    const dirtyValues = {};
    Object.keys(form.controls)
      .forEach(key => {
        const currentControl = form.controls[key];

        if (currentControl.dirty) {
          if (currentControl.controls) {
            dirtyValues[key] = this.getDirtyValues(currentControl);
          } else {
            dirtyValues[key] = currentControl.value;

          }
        }
      });

    return dirtyValues;
  }


}
