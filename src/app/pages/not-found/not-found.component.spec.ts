import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from '@environments/environment';
import { getTranslocoTestingModule } from '@shared/testing/transloco-testing.module';

import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        getTranslocoTestingModule(),
        RouterTestingModule,
      ],
      declarations: [
        NotFoundComponent,
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get currectLanguage should return default lang', () => {
    expect(component.currentLanguage).toEqual(environment.i18n.defaultLang);
  });
});
