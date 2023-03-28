import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from './create-registration/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = ' http://localhost:3000/enquiry';
  constructor(private http: HttpClient) {}
  postRegistration(registerObj: user) {
    return this.http.post<any>(`${(this, this.baseUrl)}`, registerObj);
  }
  getRegisteredUser() {
    return this.http.get<user[]>(`${(this, this.baseUrl)}`);
  }
  updateRegisterUser(registerObj: user, id: number) {
    return this.http.put<user>(`${(this, this.baseUrl)}/${id}`, registerObj);
  }
  deleteRegistered(id: number) {
    return this.http.delete<user>(`${(this, this.baseUrl)}/${id}`);
  }
  getRegisteredUserId(id: number) {
    return this.http.get<user>(`${(this, this.baseUrl)}/${id}`);
  }
}
