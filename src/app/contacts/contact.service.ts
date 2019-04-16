import { FetchContacts, FetchContact, SaveContact } from './store/contact.actions';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact, GetContactResponse } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJlYUVtcGxveWVlSWQiOiI0YzM1MC1mYzZmOS03NGFmYi1jY2Q0ZS0wYjNhNS0yYWYyZi05MjEzNS1jNGE2MCIsImVhT2ZmaWNlSWQiOiI0NGU4Yi1jODlhNy1lNDBiMi1mN2MyYi1iODVkZS02MzgyYS0xNDdkNi00ZDg3NyIsImVtcGxveWVlRW1haWwiOiJkZXZlbG9wZXJAcXVlZHJvLmNvbSIsIm9yaWdpbiI6ImluaG91c2UiLCJyb2xlcyI6WyJjcm0yIGFkbWlucyIsImFkbWluIl0sInN1YiI6ImlzYWJlbGxhIiwiZXhwIjoxNTU1NDg4NjgyLCJpYXQiOjE1NTU0MDIyODJ9.u3cUQpH_56wg2zj-M2Aj9JDMRnpgMqbWENtbi7QGfSXmPK6vITULWRpfNh77ov69Eg0erDlvGzSXUQFFNbBVFQ';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    })
  };

  constructor(private httpClient: HttpClient) { }

  getContacts(action: FetchContacts): Observable<GetContactResponse> {
    return this.httpClient.get<GetContactResponse>(`http://localhost:9000/proxy/api/contacts?sortBy=firstName&` +
      `sortOrder=asc&eaEmployeeId=28eda-c1d01-16ed4-4c4ba-fb897-09c08-e5c13-295f8&limit=10&offset=${(action.payload ? action.payload : 0)}`, this.httpOptions);
  }

  getContact(action: FetchContact): Observable<Contact> {
    return this.httpClient.get<Contact>(`http://localhost:9000/proxy/api/contacts/${action.payload}`, this.httpOptions);
  }

  saveContact(action: SaveContact): Observable<Contact> {
    return this.httpClient.patch<Contact>(`http://localhost:9000/proxy/api/contacts/${action.payload.contactId}`, action.payload, this.httpOptions);
  }
}
