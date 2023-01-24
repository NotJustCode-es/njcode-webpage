import { Injector, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DynamicLoadDirective } from '@core/directives/dynamic-load/dynamic-load.directive';

describe('DynamicLoadDirective', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ViewContainerRef,
      ],
    })
      .compileComponents();
  });

  it('should create an instance', () => {
    const directive = new DynamicLoadDirective(
      TestBed.inject(ViewContainerRef),
      TestBed.inject(Injector),
    );
    expect(directive).toBeTruthy();
  });
});
