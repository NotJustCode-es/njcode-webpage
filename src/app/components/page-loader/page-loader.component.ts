import {
  ChangeDetectionStrategy, Component, OnInit,
} from '@angular/core';
import { LoadingService } from '@services/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page-loader',
  templateUrl: './page-loader.component.html',
  styleUrls: ['./page-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLoaderComponent implements OnInit {
  isLoading$!: Observable<boolean>;

  constructor(private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.isLoading$ = this.loadingService.isLoading();
  }
}
