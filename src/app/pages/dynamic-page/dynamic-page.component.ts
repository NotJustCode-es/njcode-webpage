import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicSection } from '@core/models/dynamic-section';
import { TitleService } from '@core/services/title.service';
import { ContentfulService } from '@core/services/contentful.service';
import { Entry } from 'contentful';
import { map, Observable, tap } from 'rxjs';

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
    private contentfulService: ContentfulService,
    private titleService: TitleService,
  ) { }

  ngOnInit(): void {
    this.getSections();
  }

  private getSections(): void {
    this.sections$ = this.contentfulService.getPage(this.router.url)
      .pipe(
        // tap(response => console.log(`Title is: ${response.items[0].fields?.title}`)),
        tap(response => this.titleService.setTitle(response.items[0].fields?.title)),
        map(response => this.mapSectionsAndData(response.items[0].fields?.sections ?? [])),
      );
  }

  /*  private getTitle(): void {
    this.title$ = this.contentfulService.getPage(this.router.url)
      .pipe(
        this.title$ => pluck
        response => this.setTitle(response.items[0].fields?.Title?),
      );
  }

  private setTitle(title: string): string {
    return title.map((titleResponse: { string: any; }) => {
      const { string } = titleResponse;
      return {
        id: sys.contentType.sys.id,
        data: fields,
      };
    });
  }
*/
  private mapSectionsAndData(sections: Entry<Record<string, unknown>>[]): DynamicSection[] {
    return sections.map(section => {
      const { sys, fields } = section;
      return {
        id: sys.contentType.sys.id,
        data: fields,
      };
    });
  }
}
