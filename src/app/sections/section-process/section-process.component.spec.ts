import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetService } from '@services/assets/asset.service';

import { SectionProcessComponent } from './section-process.component';

describe('SectionProcessComponent', () => {
  let component: SectionProcessComponent;
  let fixture: ComponentFixture<SectionProcessComponent>;
  let service: AssetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionProcessComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SectionProcessComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AssetService);
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
