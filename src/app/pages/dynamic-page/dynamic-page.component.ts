import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DynamicSection } from '@core/models/dynamic-section';
import { ContentfulService } from '@core/services/contentful.service';
import { I18nService } from '@core/services/i18n.service';
import { TypePageFields } from '@server/models/contentful-content-types/page';
import { EntryCollectionWithLinkResolutionAndWithUnresolvableLinks } from 'contentful';
import {
  map, Observable, switchMap,
} from 'rxjs';

@Component({
  selector: 'app-dynamic-page',
  template: `
    <ng-container *ngIf="sections$ | async as sections">
      <ng-template *ngFor="let section of sections" [appDynamicLoad]="section">
      </ng-template>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicPageComponent implements OnInit {
  sections$!: Observable<DynamicSection[]>;

  constructor(
    private i18nService: I18nService,
    private contentfulService: ContentfulService,
  ) { }

  ngOnInit(): void {
    this.getSections();
  }

  private getSections(): void {
    this.sections$ = this.i18nService.languageChanges$.pipe(
      switchMap((activeLanguage: string) => this.contentfulService.getPage(
        this.i18nService.urlWithoutLanguage,
        activeLanguage,
      )),
      map(page => this.mapSectionsAndDataFromPage(page)),
    );
  }

  private mapSectionsAndDataFromPage(page: EntryCollectionWithLinkResolutionAndWithUnresolvableLinks<TypePageFields>): DynamicSection[] {
    const sections = page.items[0].fields?.sections ?? [];
    return sections.map(section => {
      const { sys, fields } = section;
      return {
        id: sys.contentType.sys.id,
        data: fields,
      };
    });
  }
}
