import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionContactFormComponent } from './section-contact-form.component';

describe('SectionContactFormComponent', () => {
  let component: SectionContactFormComponent;
  let fixture: ComponentFixture<SectionContactFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionContactFormComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SectionContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
