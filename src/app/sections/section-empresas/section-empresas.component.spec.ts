import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionEmpresasComponent } from './section-empresas.component';

describe('SectionEmpresasComponent', () => {
  let component: SectionEmpresasComponent;
  let fixture: ComponentFixture<SectionEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionEmpresasComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SectionEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
