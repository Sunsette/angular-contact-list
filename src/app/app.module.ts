import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MomentModule } from 'angular2-moment';

import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ContactService } from './contacts/contact.service';
import { ContactsComponent } from './contacts/contacts.component';
import { PhoneFormatPipe } from './shared/pipes/phone-format.pipe';
import { IfMissingPipe } from './shared/pipes/if-missing.pipe';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { ContactDetailEditModalComponent } from './contact-details/contact-detail-edit-modal/contact-detail-edit-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RequiredIfDirective} from './contact-details/required-if.directive';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    PhoneFormatPipe,
    IfMissingPipe,
    ContactDetailsComponent,
    ContactDetailEditModalComponent,
    RequiredIfDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MomentModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressbarModule.forRoot(),
    ModalModule.forRoot()
  ],
  entryComponents: [ContactDetailEditModalComponent],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
