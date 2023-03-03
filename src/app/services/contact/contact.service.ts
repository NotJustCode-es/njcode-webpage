import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly sendMailPath = '/api/contact/send/';

  constructor(private httpClient: HttpClient) {}

  sendMail(name: string, email: string, message: string, token: string): Observable<unknown> {
    const httpOptions = {
      headers: new HttpHeaders({
        recaptcha: token,
      }),
    };
    return this.httpClient.post(
      this.sendMailPath,
      { name, email, message },
      httpOptions,
    );
  }
}
