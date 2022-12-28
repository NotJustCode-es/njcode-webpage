import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicSection } from '@core/models/dynamic-section';
import { ContentfulService } from '@core/services/contentful.service';
import { Entry } from 'contentful';
import { map, Observable, tap } from 'rxjs';
import { LoadingService } from '@services/loading.service';

@Component({
  selector: 'app-dynamic-page',
  template: `
    <ng-container *ngIf="sections$ | async as sections">
      <ng-template *ngFor="let section of sections" [appDynamicLoad]="section">
      </ng-template>
    </ng-container>
    <div class="page-loader" *ngIf="isLoading$ | async"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicPageComponent implements OnInit {
  sections$!: Observable<DynamicSection[]>;

  isLoading$!: Observable<boolean>;

  constructor(
    private router: Router,
    private contentfulService: ContentfulService,
    private loadingService: LoadingService,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.loadingService.isLoading();
    this.getSections();
  }

  private getSections(): void {
    this.loadingService.setLoading(true);
    this.sections$ = this.contentfulService.getPage(this.router.url)
      .pipe(
        map(response => this.mapSectionsAndData(response.items[0].fields?.sections ?? [])),
        tap(() => this.loadingService.setLoading(false)),
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
