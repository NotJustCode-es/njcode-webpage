import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionProyectosComponent } from './section-proyectos.component';

describe('SectionProyectosComponent', () => {
  let component: SectionProyectosComponent;
  let fixture: ComponentFixture<SectionProyectosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionProyectosComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SectionProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
