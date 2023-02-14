import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionProjectsComponent } from './section-projects.component';

describe('SectionProyectosComponent', () => {
  let component: SectionProjectsComponent;
  let fixture: ComponentFixture<SectionProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionProjectsComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SectionProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
