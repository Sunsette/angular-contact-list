import { ContactService } from './contact.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  contacts = [];
  loading = false;
  offset = 0;
  total = 0;

  constructor(private contactService: ContactService) {
  }

  ngOnInit() {
    this.loading = true;
    this.contactService.getContacts().subscribe((contacts) => {
      this.total = contacts.total;
      contacts.rows.forEach((contact) => this.contacts.push(contact));
      this.loading = false;
    });
  }

  loadMore() {
    this.offset = this.offset + 10;
    this.loading = true;
    this.contactService.getContacts(this.offset).subscribe((contacts) => {
      //ADDED TIMEOUT TO SHOW THE LOADING TEMP FOR A BIT 
      setTimeout(()=> {
        this.loading = false;
      }, 2000);
      contacts.rows.forEach((contact) => this.contacts.push(contact));
    });
  }
}
