import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ModalModule } from 'ngx-bootstrap/modal';

import { MomentModule } from 'angular2-moment';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ContactService } from './contacts/contact.service';
import { ContactsComponent } from './contacts/contacts.component';
import { PhoneFormatPipe } from './shared/pipes/phone-format.pipe';
import { IfMissingPipe } from './shared/pipes/if-missing.pipe';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { ContactDetailEditModalComponent } from './contact-details/contact-detail-edit-modal/contact-detail-edit-modal.component';
import { contactReducer } from './contacts/store/contact.reducer';
import { ContactEffects } from './contacts/store/contact.effect';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    PhoneFormatPipe,
    IfMissingPipe,
    ContactDetailsComponent,
    ContactDetailEditModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MomentModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressbarModule.forRoot(),
    ModalModule.forRoot(),
    StoreModule.forRoot({ contact: contactReducer }),
    EffectsModule.forRoot([ContactEffects])
  ],
  entryComponents: [ContactDetailEditModalComponent],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
