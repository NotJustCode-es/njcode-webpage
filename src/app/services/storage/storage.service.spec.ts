import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { StorageService } from '@services/storage/storage.service';

describe('StorageService browser side behaviour', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    }).compileComponents();
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call setItem from local storage', () => {
    const localStorageSetSpy = spyOn(localStorage, 'setItem');
    service.setValue('key', 'value');
    expect(localStorageSetSpy).toHaveBeenCalledWith('key', '"value"');
  });

  describe('#getValue', () => {
    it('should call getItem from local storage', () => {
      const localStorageGetSpy = spyOn(localStorage, 'getItem');
      service.getValue('key');
      expect(localStorageGetSpy).toHaveBeenCalledWith('key');
    });

    it('should retrieve correct item from local storage', () => {
      service.setValue('key', 'value');
      const result = service.getValue('key');
      expect(result).toEqual('value');
    });
  });

  it('should call clearValue from local storage', () => {
    const localStorageClearValueSpy = spyOn(localStorage, 'removeItem');
    service.clearValue('key');
    expect(localStorageClearValueSpy).toHaveBeenCalledWith('key');
  });

  it('should call clearAll from local storage', () => {
    const localStorageclearAllSpy = spyOn(localStorage, 'clear');
    service.clearAll();
    expect(localStorageclearAllSpy).toHaveBeenCalled();
  });
});

describe('StorageService server side behaviour', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    }).compileComponents();
    service = TestBed.inject(StorageService);
  });

  it('setValue should return undefined on server side call', () => {
    expect(service.setValue('key', 'value')).toBeUndefined();
  });

  it('getValue should return null on server side call', () => {
    expect(service.getValue('key')).toBeNull();
  });

  it('clearValue should return undefined on server side call', () => {
    expect(service.clearValue('key')).toBeUndefined();
  });

  it('clearAll should return undefined on server side call', () => {
    expect(service.clearAll()).toBeUndefined();
  });
});
