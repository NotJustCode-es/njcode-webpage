export class DocumentStub {
  testLocation!: Location;

  get location(): Location {
    return this.testLocation;
  }

  querySelectorAll(): unknown[] {
    return [];
  }
}
