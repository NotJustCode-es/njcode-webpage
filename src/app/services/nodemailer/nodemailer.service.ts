import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NodemailerService {
  private readonly sendMailPath = '/api/mail/send/';

  constructor(private httpClient: HttpClient) {}

  sendMail(name: string, email: string, message: string, token: string): Observable<String> {
    const httpOptions = {
      headers: new HttpHeaders({
        recaptcha: token,
      }),
    };
    return this.httpClient.post<String>(
      this.sendMailPath,
      {
        name, email, message,
      },
      httpOptions,
    );
  }
}
