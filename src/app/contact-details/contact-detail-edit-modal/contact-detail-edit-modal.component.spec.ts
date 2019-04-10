import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailEditModalComponent } from './contact-detail-edit-modal.component';

describe('ContactDetailEditModalComponent', () => {
  let component: ContactDetailEditModalComponent;
  let fixture: ComponentFixture<ContactDetailEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactDetailEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDetailEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
