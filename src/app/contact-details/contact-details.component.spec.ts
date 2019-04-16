import { StoreModule } from '@ngrx/store';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { PhoneFormatPipe } from './../shared/pipes/phone-format.pipe';
import { IfMissingPipe } from './../shared/pipes/if-missing.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailsComponent } from './contact-details.component';
import { contactReducer } from '../contacts/store/contact.reducer';
import { of } from 'rxjs';

describe('ContactDetailsComponent', () => {
  let component: ContactDetailsComponent;
  let fixture: ComponentFixture<ContactDetailsComponent>;

  const fakeActivatedRoute = {
    snapshot: { data: {}, params: {} }
  } as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactDetailsComponent, IfMissingPipe, PhoneFormatPipe ],
      imports: [ProgressbarModule.forRoot(), ModalModule.forRoot(), StoreModule.forRoot({ contact: contactReducer })] ,
      providers: [ {provide: ActivatedRoute, useValue: fakeActivatedRoute} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
