import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionLegalComponent } from './section-legal.component';

describe('SectionLegalComponent', () => {
  let component: SectionLegalComponent;
  let fixture: ComponentFixture<SectionLegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionLegalComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SectionLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
