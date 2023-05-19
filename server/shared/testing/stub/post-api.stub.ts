import { mediumSnapshot } from '@server/shared/testing/snapshots/medium.snapshot.xml';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';

export class postApiStub {
  private mockResponse: Partial<AxiosResponse<string>> = {
    data: mediumSnapshot(),
    status: 200,
    statusText: 'OK',
  };

  get(): string {
    return (of(this.mockResponse) as unknown) as string;
  }
}
