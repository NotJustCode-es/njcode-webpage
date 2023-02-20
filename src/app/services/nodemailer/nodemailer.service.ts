import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NodemailerService {
  private readonly sendMailPath = '/api/mail/send/';

  constructor(private httpClient: HttpClient) {}

  sendMail(name: string, email: string, token: string): Observable<String> {
    // const params = new HttpParams().set('name', name).set('email', mail).set('token', token);

    return this.httpClient.post<String>(
      this.sendMailPath,
      { name, email, token },
    );
    // req.subscribe();
  }
}
