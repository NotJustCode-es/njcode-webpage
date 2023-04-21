import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  getValue<T>(key: string): T | null {
    if (!this.checkBrowser()) {
      return null;
    }
    const item = localStorage.getItem(key);
    if (!item) {
      return null;
    }

    try {
      return JSON.parse(item);
    } catch (e) {
      return null;
    }
  }

  setValue<T>(key: string, value: T): void {
    if (!this.checkBrowser()) {
      return;
    }
    localStorage.setItem(key, JSON.stringify(value));
  }

  clearValue(key: string): void {
    if (!this.checkBrowser()) {
      return;
    }
    localStorage.removeItem(key);
  }

  clearAll(): void {
    if (!this.checkBrowser()) {
      return;
    }
    localStorage.clear();
  }

  private checkBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
