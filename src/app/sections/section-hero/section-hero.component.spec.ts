import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionHeroComponent } from '@sections/section-hero/section-hero.component';

describe('SectionHeroComponent', () => {
  let component: SectionHeroComponent;
  let fixture: ComponentFixture<SectionHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionHeroComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SectionHeroComponent);
    component = fixture.componentInstance;
    component.data = {
      name: 'name',
      title: 'title',
      description: 'description',
      body: 'body',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
