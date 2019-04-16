import { StoreModule } from '@ngrx/store';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ContactDetailsComponent } from './../contact-details/contact-details.component';
import { AppRoutingModule } from './../app-routing.module';
import { ActivatedRoute } from '@angular/router';
import { MomentModule } from 'angular2-moment';
import { PhoneFormatPipe } from './../shared/pipes/phone-format.pipe';
import { IfMissingPipe } from './../shared/pipes/if-missing.pipe';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as fromContacts from './store/contact.reducer';

import { ContactsComponent } from './contacts.component';
import { contactReducer } from './store/contact.reducer';
import { DebugElement } from '@angular/core';

describe('ContactsComponent', () => {
  let component: ContactsComponent;
  let fixture: ComponentFixture<ContactsComponent>;

  const fakeActivatedRoute = {
    snapshot: { data: {}, params: {} }
  } as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactsComponent, ContactDetailsComponent, IfMissingPipe, PhoneFormatPipe],
      imports: [MomentModule, AppRoutingModule, ProgressbarModule.forRoot(), StoreModule.forRoot({ contact: contactReducer })],
      providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display loading after ngOnInit has been runned', () => {

    component.ngOnInit();

    component.contactStore$.subscribe((contactStore: fromContacts.State) => {
      expect(contactStore.loading).toBeTruthy();
    });
  });

  it('should display loading text when loading', () => {
    const contactsDe: DebugElement = fixture.debugElement;
    const contactsEl: HTMLElement = contactsDe.nativeElement;

    component.ngOnInit();

    const h1 = contactsEl.querySelector('#loading-text');
    expect(h1.textContent).toEqual('Loading..');
  });
});
