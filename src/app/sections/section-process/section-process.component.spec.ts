import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetsService } from '@services/assets/assets.service';

import { SectionProcessComponent } from './section-process.component';

describe('SectionProcessComponent', () => {
  let component: SectionProcessComponent;
  let fixture: ComponentFixture<SectionProcessComponent>;
  let service: AssetsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionProcessComponent],
      imports: [HttpClientTestingModule],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SectionProcessComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AssetsService);
    component.data = {
      name: 'test',
      question: 'test',
      answer: 'test',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getIconSolidPath', () => {
    const icon = 'check';
    const spySubscribable = spyOn(service, 'getIconSolidPath');
    component.getIconPath(icon);
    expect(spySubscribable).toHaveBeenCalled();
  });
});
