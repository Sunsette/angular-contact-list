import { Observable, of } from 'rxjs';
import { Contact } from './../../contacts/contact.model';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailEditModalComponent } from './contact-detail-edit-modal.component';

describe('ContactDetailEditModalComponent', () => {
  let component: ContactDetailEditModalComponent;
  let fixture: ComponentFixture<ContactDetailEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactDetailEditModalComponent ],
      imports: [ReactiveFormsModule],
      providers: [BsModalRef]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDetailEditModalComponent);
    component = fixture.componentInstance;
    const contact: Contact = {firstName: '', email: ''};
    component.selectedContact$ = of(contact);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
