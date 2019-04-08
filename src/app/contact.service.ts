import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient) { }

  getContacts(offset?: number): Observable<any> {
    const token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJlYUVtcGxveWVlSWQiOiIyOGVkYS1jMWQwMS0xNmVkNC00YzRiYS1mYjg5Ny0wOWMwOC1lNWMxMy0yOTVmOCIsImVhT2ZmaWNlSWQiOiI0NGU4Yi1jODlhNy1lNDBiMi1mN2MyYi1iODVkZS02MzgyYS0xNDdkNi00ZDg3NyIsImVtcGxveWVlRW1haWwiOiJBaWRhLnRlc3RAdGVzdC5zZSIsIm9yaWdpbiI6ImluaG91c2UiLCJyb2xlcyI6WyJjcm0yIGFkbWlucyIsIm1hbmFnZXIiXSwic3ViIjoiaXNhYmVsbGEiLCJleHAiOjE1NTQ3OTcwMjIsImlhdCI6MTU1NDcxMDYyMn0.nZraLZSEHquSv08Etc-eqz8yYogbVj2d4037hgNGy5kHjdU34Vvs0NQBVu_ivR32HmCdnOvwC0LIbfajtLMu1w';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
    return this.httpClient.get('http://localhost:9000/proxy/api/contacts?sortBy=firstName&' +
      'sortOrder=asc&eaEmployeeId=28eda-c1d01-16ed4-4c4ba-fb897-09c08-e5c13-295f8&offset=' + (offset ? offset : 0), httpOptions);
  }
}
