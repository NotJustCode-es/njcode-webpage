import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionProcessComponent } from './section-process.component';

describe('SectionProcessComponent', () => {
  let component: SectionProcessComponent;
  let fixture: ComponentFixture<SectionProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionProcessComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SectionProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
