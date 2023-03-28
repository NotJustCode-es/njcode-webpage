export class contactStub {
  sendMail(): Promise<void> {
    return new Promise<void>(resolve => {
      resolve();
    });
  }
}
