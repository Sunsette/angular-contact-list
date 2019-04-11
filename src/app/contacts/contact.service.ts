import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Contact, GetContactResponse} from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJlYUVtcGxveWVlSWQiOiI3ZGE5ZS05ZDJkOS00NTljNi05MDY2MS01ZDRlZS1lNTI4OC0yM2VkOC00NWI2MCIsImVhT2ZmaWNlSWQiOiI0NGU4Yi1jODlhNy1lNDBiMi1mN2MyYi1iODVkZS02MzgyYS0xNDdkNi00ZDg3NyIsImVtcGxveWVlRW1haWwiOiJhbGV4QHF1ZWRyby5jb20iLCJvcmlnaW4iOiJpbmhvdXNlIiwicm9sZXMiOlsiY3JtMiBhZG1pbnMiLCJhZG1pbiJdLCJzdWIiOiJmb2FkIiwiZXhwIjoxNTU1MDY4OTEzLCJpYXQiOjE1NTQ5ODI1MTN9.hKpGGkg0wlat16zOY2YT22AZCCXmpDBYSEvOsDe0vQaSI__16hNuYenYLKl1Iji6Dx1m69chRD0hS2kZVvKGaQ';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    })
  };

  constructor(private httpClient: HttpClient) {
  }

  getContacts(offset?: number): Observable<GetContactResponse> {
    return this.httpClient.get<GetContactResponse>(`http://localhost:9000/proxy/api/contacts?sortBy=insertDate&sortOrder=desc` +
      `offset=${(offset ? offset : 0)}`, this.httpOptions);
  }

  getContactById(id: string): Observable<Contact> {
    return this.httpClient.get<Contact>(`http://localhost:9000/proxy/api/contacts/${id}`, this.httpOptions);
  }

  updateContact(contact: Contact): Observable<Contact> {
    return this.httpClient.patch<Contact>(`http://localhost:9000/proxy/api/contacts/${contact.contactId}`, contact, this.httpOptions);
  }
}
