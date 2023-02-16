import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionFooterComponent } from '@sections/section-footer/section-footer.component';

describe('SectionFooterComponent', () => {
  let component: SectionFooterComponent;
  let fixture: ComponentFixture<SectionFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionFooterComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionFooterComponent);
    component = fixture.componentInstance;
    component.data = {
      subtitle: 'test',
      name: 'test',
      rights: 'test',
      phoneNumbers: ['test'],
      phoneTitle: 'test',
      address: 'test',
      addressTitle: 'test',
      socialmedia: [],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getSocialMediaClass should return correctly formatted string', () => {
    expect(component.getSocialMediaClass('test')).toEqual('uil uil-test');
  });
});
