import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact, GetContactResponse } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJlYUVtcGxveWVlSWQiOiI0YzM1MC1mYzZmOS03NGFmYi1jY2Q0ZS0wYjNhNS0yYWYyZi05MjEzNS1jNGE2MCIsImVhT2ZmaWNlSWQiOiI0NGU4Yi1jODlhNy1lNDBiMi1mN2MyYi1iODVkZS02MzgyYS0xNDdkNi00ZDg3NyIsImVtcGxveWVlRW1haWwiOiJkZXZlbG9wZXJAcXVlZHJvLmNvbSIsIm9yaWdpbiI6ImluaG91c2UiLCJvcmlnaW5hdGluZ0VtcGxveWVlSWQiOiIyOGVkYS1jMWQwMS0xNmVkNC00YzRiYS1mYjg5Ny0wOWMwOC1lNWMxMy0yOTVmOCIsIm9yaWdpbmF0aW5nT2ZmaWNlSWQiOiI0NGU4Yi1jODlhNy1lNDBiMi1mN2MyYi1iODVkZS02MzgyYS0xNDdkNi00ZDg3NyIsInJvbGVzIjpbImNybTIgYWRtaW5zIiwiYWRtaW4iXSwic3ViIjoiaXNhYmVsbGEiLCJleHAiOjE1NTQ4OTIxODUsImlhdCI6MTU1NDgwNTc4NX0.WgH-I0UcjcZSmPKTLMqEEUu15a5GVodrMoClh3RIPg4EP-fm-PrQ22tqbN-arZgL8rjK3iLQM7cq6joGPyS2QA';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    })
  };

  constructor(private httpClient: HttpClient) { }

  getContacts(offset?: number): Observable<GetContactResponse> {
    return this.httpClient.get<GetContactResponse>(`http://localhost:9000/proxy/api/contacts?sortBy=firstName&` +
      `sortOrder=asc&eaEmployeeId=28eda-c1d01-16ed4-4c4ba-fb897-09c08-e5c13-295f8&offset=${(offset ? offset : 0)}`, this.httpOptions);
  }

  getContactById(id: string): Observable<Contact> {
    return this.httpClient.get<Contact>(`http://localhost:9000/proxy/api/contacts/${id}`, this.httpOptions);
  }

  updateContact(contact: Contact): Observable<Contact> {
    return this.httpClient.patch<Contact>(`http://localhost:9000/proxy/api/contacts/${contact.contactId}`, contact, this.httpOptions);
  }
}
