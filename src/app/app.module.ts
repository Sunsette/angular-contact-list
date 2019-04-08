import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MomentModule } from 'angular2-moment';

import { ContactService } from './contacts/contact.service';
import { ContactsComponent } from './contacts/contacts.component';
import { PhoneFormatPipe } from './shared/pipes/phone-format.pipe';
import { IfMissingPipe } from './shared/pipes/if-missing.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    PhoneFormatPipe,
    IfMissingPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MomentModule
  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }
