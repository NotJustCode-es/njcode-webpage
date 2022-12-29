import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicSection } from '@core/models/dynamic-section';
import { ContentfulService } from '@core/services/contentful.service';
import { Entry } from 'contentful';
import { map, Observable } from 'rxjs';

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
    private router: Router,
    private contentfulService: ContentfulService,
  ) { }

  ngOnInit(): void {
    this.getSections();
  }

  private getSections(): void {
    this.sections$ = this.contentfulService.getPage(this.router.url)
      .pipe(
        map(response => this.mapSectionsAndData(response.items[0].fields?.sections ?? [])),
      );
  }

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
