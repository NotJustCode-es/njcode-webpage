import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicSection } from '@core/models/dynamic-section';
import { RoutesEnum } from '@core/models/routes.enum';
import { ContentfulService } from '@core/services/contentful.service';
import { I18nService } from '@core/services/i18n.service';
import { TypePageFields } from '@server/models/contentful-content-types/page';
import { EntryCollectionWithLinkResolutionAndWithUnresolvableLinks } from 'contentful';
import {
  EMPTY,
  map,
  Observable, tap,
} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MetadataService } from '@services/metadata.service';

@Component({
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
    private router: Router,
    private i18nService: I18nService,
    private contentfulService: ContentfulService,
    private metaService: MetadataService,
  ) { }

  ngOnInit(): void {
    this.getSections();
  }

  private getSections(): void {
    this.sections$ = this.contentfulService.getPage(
      this.i18nService.urlWithoutLanguage,
      this.i18nService.activeLanguage,
    ).pipe(
      tap(page => this.metaService.setMetadata(page.items[0].fields?.metadata?.fields!)),
      map(page => this.mapSectionsAndDataFromPage(page)),
      catchError(() => {
        this.router.navigate([RoutesEnum.NotFound]);
        return EMPTY;
      }),
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
