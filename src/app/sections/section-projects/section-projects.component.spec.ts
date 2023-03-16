import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionProjectsComponent } from '@sections/section-projects/section-projects.component';

describe('SectionProjectsComponent', () => {
  let component: SectionProjectsComponent;
  let fixture: ComponentFixture<SectionProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionProjectsComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SectionProjectsComponent);
    component = fixture.componentInstance;
    component.data = {
      name: 'test',
      title: 'test',
      description: 'test',
      projectCards: [],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
