import { Contact } from './contact.model';
import { ContactService } from './contact.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contacts = [];
  loading = false;
  offset = 0;
  total = 0;

  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.loading = true;
    this.contactService.getContacts().subscribe((contacts) => {
      this.total = contacts.total;
      this.contacts.push(...contacts.rows);
      this.loading = false;
    });
  }

  loadMore() {
    this.offset += 10;
    this.loading = true;
    this.contactService.getContacts(this.offset).subscribe((contacts) => {
      this.loading = false;
      this.contacts.push(...contacts.rows);
    });
  }

  selectContact(contact: Contact) {
    this.router.navigate(['details/' + contact.contactId]);
  }

}
