import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionClientsComponent } from './section-clients.component';

describe('SectionClientsComponent', () => {
  let component: SectionClientsComponent;
  let fixture: ComponentFixture<SectionClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionClientsComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SectionClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
