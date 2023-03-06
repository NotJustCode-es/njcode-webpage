import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionClientsComponent } from '@sections/section-clients/section-clients.component';
import { AssetsService } from '@services/assets/assets.service';

describe('SectionClientsComponent', () => {
  let component: SectionClientsComponent;
  let service: AssetsService;
  let fixture: ComponentFixture<SectionClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionClientsComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SectionClientsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AssetsService);
    component.data = {
      icon: 'test',
      name: 'test',
      title: 'test',
      clientCards: [],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getIconSolidPath', () => {
    const spySubscribable = spyOn(service, 'getIconSolidPath');
    component.getIconPath(component.data.icon);
    expect(spySubscribable).toHaveBeenCalled();
  });
});
