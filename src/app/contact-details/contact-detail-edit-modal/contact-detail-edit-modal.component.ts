import {Contact} from './../../contacts/contact.model';
import {Component, OnInit, Output, EventEmitter} from '@angular/core';

import {BsModalRef} from 'ngx-bootstrap/modal';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact-detail-edit-modal',
  templateUrl: './contact-detail-edit-modal.component.html',
  styleUrls: ['./contact-detail-edit-modal.component.scss']
})
export class ContactDetailEditModalComponent implements OnInit {

  @Output() saveInfo: EventEmitter<Contact> = new EventEmitter();
  detailForm: FormGroup;
  contact: Contact;

  constructor(public bsModalRef: BsModalRef) {
  }

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
    this.detailForm = new FormGroup({
      firstName: new FormControl(this.contact.firstName, Validators.required),
      familyName: new FormControl(this.contact.familyName, Validators.required),
      msisdn: new FormControl({value: this.contact.msisdn, disabled: true}),
      address: new FormGroup({
        street: new FormControl(this.contact.street),
        zip: new FormControl(this.contact.zip),
        city: new FormControl(this.contact.city)
      }),
      email: new FormControl(this.contact.email, this.getEmailValidators())
    });
  }

  setFormValidators() {
    this.handleAddressChanges();
    this.setAddressValidators(this.contact);
    this.handleEmailChanges();
    this.setEmailValidators(this.contact.email);
  }

  handleAddressChanges() {
    this.address.valueChanges.subscribe(address => this.setAddressValidators(address));
  }

  setAddressValidators(address) {
    this.email.setValidators(this.isAdressSet(address) ? null : this.getEmailValidators());
    this.email.updateValueAndValidity({emitEvent: false});
  }

  handleEmailChanges() {
    this.email.valueChanges.subscribe(email => this.setEmailValidators(email));
  }

  setEmailValidators(email) {
    Object.values(this.address.controls).forEach((formControl: FormControl) => {
      formControl.setValidators(email.length > 0 ? null : Validators.required);
      formControl.updateValueAndValidity({emitEvent: false});
    });
  }

  getEmailValidators() {
    return [Validators.email, Validators.required];
  }

  isAdressSet(obj): boolean {
    return obj.street.length > 0 && obj.zip.length > 0 && obj.city.length > 0;
  }

  onSave() {
    const {street, zip, city} = this.detailForm.value.address;
    delete this.detailForm.value.address;
    this.saveInfo.emit(Object.assign({}, this.detailForm.value, {contactId: this.contact.contactId, street, zip, city}));
    this.bsModalRef.hide();
  }
}
