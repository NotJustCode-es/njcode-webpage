import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionCompaniesComponent } from './section-companies.component';

describe('SectionEmpresasComponent', () => {
  let component: SectionCompaniesComponent;
  let fixture: ComponentFixture<SectionCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionCompaniesComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SectionCompaniesComponent);
    component = fixture.componentInstance;
    component.data = {
      name: 'test',
      title: 'test',
      companies: [],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
