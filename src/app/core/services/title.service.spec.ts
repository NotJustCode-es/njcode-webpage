import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { TitleService } from './title.service';

describe('TitleService', () => {
  let title: Title;
  let service: TitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Page title should be upgraded', () => {
    const newTitle = 'newTitle';
    service.setTitle(newTitle);
    title = TestBed.inject(Title);
    expect(title.getTitle()).toBe(newTitle);
  });

  it('When undefined title is given, title should be default title blank ', () => {
    const defaultTitle = '';
    service.setTitle(undefined);
    title = TestBed.inject(Title);
    expect(title.getTitle()).toBe(defaultTitle);
  });
});
