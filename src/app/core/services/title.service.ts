import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})

export class TitleService {
  constructor(private title: Title) {

  }

  setTitle(givenTitle = 'NJCode'): void {
    this.title.setTitle(givenTitle);
  }
}
