import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NodemailerService {
  private readonly sendMailPath = '/api/mail/send/';

  constructor(private httpClient: HttpClient) {}

  sendMail(name: string, email: string, message: string): Observable<unknown> {
    return this.httpClient.post(
      this.sendMailPath,
      { name, email, message },
    );
  }
}