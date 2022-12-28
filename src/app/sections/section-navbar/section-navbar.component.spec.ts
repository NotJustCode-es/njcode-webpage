import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionNavbarComponent } from './section-navbar.component';

describe('SectionNavbarComponent', () => {
  let component: SectionNavbarComponent;
  let fixture: ComponentFixture<SectionNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SectionNavbarComponent,
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
