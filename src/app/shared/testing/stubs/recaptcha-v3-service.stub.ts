import { Observable, of } from 'rxjs';

export class ReCaptchaV3ServiceStub {
  execute(action: string): Observable<string> {
    return of(action);
  }
}
